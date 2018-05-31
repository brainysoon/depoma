import threading
import itchat


class wechat_login(threading.Thread):
    def __init__(self, thread_id, name, pic_dir):
        threading.Thread.__init__(self)
        self.thread_id = thread_id
        self.name = name
        self.pic_dir = pic_dir

    def run(self):
        print("开始线程：" + self.name)
        itchat.login(picDir=self.pic_dir)
        print("退出线程：" + self.name)
