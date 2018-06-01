import threading
from flaskr import itchat
from . import env


class wechat_login(threading.Thread):
    def __init__(self, name, wechat_id):
        threading.Thread.__init__(self)
        self.name = name + wechat_id
        self.pic_dir = env.QR_SAVE_DIR_PRE_FIX + wechat_id + '.png'

    def run(self):
        print("开始线程：" + self.name)
        wechat_instance = itchat.new_instance()
        wechat_instance.login(picDir=self.pic_dir)
        print("退出线程：" + self.name)
