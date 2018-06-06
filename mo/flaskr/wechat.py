import threading

import requests

from . import env
from . import itchat
from .core import app
from .extensions import db
from .models import WechatInfo, WechatRecord, ServiceLog, WechatRobot
import datetime
from .extensions import msg_q, reply_q
from .chatbot import ChatService


class wechat_login(threading.Thread):
    def __init__(self, name, service_id):
        threading.Thread.__init__(self)
        self.name = name + service_id
        self.service_id = service_id
        self.pic_dir = env.QR_SAVE_DIR_PRE_FIX + service_id + '.png'
        self.wechat_instance = itchat.new_instance()
        self.wechat_info = None

    def run(self):
        print("开始线程：" + self.name)
        self.wechat_instance.login(picDir=self.pic_dir, loginCallback=self.login_callback,
                                   exitCallback=self.logout_callback)

        @self.wechat_instance.msg_register(itchat.content.TEXT)
        def tuling_reply(msg):
            msg_q.put(msg['Text'])
            chatbot_reply = reply_q.get()
            print('chatbot_reply:' + chatbot_reply)
            default_msg = 'I received: ' + msg['Text']
            tuling_msg = tuling_response(msg['Text'])
            reply = tuling_msg or default_msg
            record_chat(msg, reply)
            return reply

        def record_chat(msg, reply):
            with app.app_context():
                wechat_record_instance = WechatRecord(self.wechat_instance.loginInfo['User'].Uin,
                                                      self.service_id, msg, reply)
                db.session.add(wechat_record_instance)
                db.session.commit()

        self.wechat_instance.run()
        print("退出线程：" + self.name)

    def login_callback(self):
        with app.app_context():
            uin = self.wechat_instance.loginInfo['User'].Uin
            wechat_info_instance = WechatInfo.query.filter_by(wechat_id=uin).first()
            if wechat_info_instance:
                wechat_info_instance.login_status = 1
                wechat_info_instance.service_id = self.service_id
                wechat_info_instance.gmt_modified = datetime.datetime.now()
            else:
                wechat_info_instance = WechatInfo(self.wechat_instance.loginInfo, self.service_id)
                db.session.add(wechat_info_instance)

            service_log_instance = ServiceLog(wechat_info_instance.wechat_id, wechat_info_instance.service_id)
            db.session.add(service_log_instance)

            wechat_robot_instance = WechatRobot.query.filter_by(wechat_id=uin).first()
            if wechat_robot_instance:
                chatbot_instance = ChatService(model_addr=wechat_robot_instance.model_addr)
                chatbot_instance.start()

            db.session.commit()
            self.wechat_info = wechat_info_instance

    def logout_callback(self):
        with app.app_context():
            uin = self.wechat_instance.loginInfo['User'].Uin
            wechat_instance = WechatInfo.query.filter_by(wechat_id=uin).first()
            wechat_instance.login_status = 0
            service_log_instance = ServiceLog.query.filter_by(service_id=self.service_id).first()
            service_log_instance.end_time = datetime.datetime.now()
            db.session.commit()


KEY = 'ccbb518fdcd64e66aee3a53dd7eda235'
API_URL = 'http://www.tuling123.com/openapi/api'


def tuling_response(msg):
    data = {
        'key': KEY,
        'info': msg,
        'userid': 'wechat-robot',
    }
    try:
        r = requests.post(API_URL, data=data).json()
        return r.get('text')
    except:
        return
