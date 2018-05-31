import threading
import itchat
from . import env


class wechat_login(threading.Thread):
    def __init__(self, thread_id, name, wechat_id):
        threading.Thread.__init__(self)
        self.thread_id = thread_id
        self.name = name
        self.pic_dir = env.QR_SAVE_DIR_PRE_FIX + wechat_id

    def run(self):
        print("开始线程：" + self.name)
        itchat.login(picDir=self.pic_dir)
        print("退出线程：" + self.name)
