import threading

from . import env
from . import itchat
from .core import app
from .models import WechatInfo
from .extensions import db
import requests


class wechat_login(threading.Thread):
    wechat_instance = itchat.new_instance()

    def __init__(self, name, wechat_id):
        threading.Thread.__init__(self)
        self.name = name + wechat_id
        self.wechat_id = wechat_id
        self.pic_dir = env.QR_SAVE_DIR_PRE_FIX + wechat_id + '.png'

    def run(self):
        print("开始线程：" + self.name)
        self.wechat_instance.login(picDir=self.pic_dir, loginCallback=self.login_callback,
                                   exitCallback=self.logout_callback)
        self.wechat_instance.run()
        print("退出线程：" + self.name)

    @wechat_instance.msg_register(itchat.content.TEXT)
    def tuling_reply(msg):
        default_reply = 'I received: ' + msg['Text']
        reply = tuling_response(msg['Text'])
        return reply or default_reply

    def login_callback(self):
        with app.app_context():
            wechat_instance = WechatInfo.query.filter_by(wechat_id=self.wechat_id).first()
            wechat_instance.login_status = 1
            db.session.commit()

    def logout_callback(self):
        with app.app_context():
            wechat_instance = WechatInfo.query.filter_by(wechat_id=self.wechat_id).first()
            wechat_instance.login_status = 0
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
