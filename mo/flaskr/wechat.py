import threading

from . import env
from . import itchat
from .core import app
from .models import WechatInfo
from .extensions import db


class wechat_login(threading.Thread):
    def __init__(self, name, wechat_id):
        threading.Thread.__init__(self)
        self.name = name + wechat_id
        self.wechat_id = wechat_id
        self.pic_dir = env.QR_SAVE_DIR_PRE_FIX + wechat_id + '.png'

    def run(self):
        print("开始线程：" + self.name)
        wechat_instance = itchat.new_instance()
        wechat_instance.login(picDir=self.pic_dir, loginCallback=self.login_callback)
        print("退出线程：" + self.name)

    def login_callback(self):
        with app.app_context():
            wechat_instance = WechatInfo.query.filter_by(wechat_id=self.wechat_id).first()
            wechat_instance.login_status = 1
            db.session.commit()