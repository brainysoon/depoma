import threading
import uuid

from .core import app
from .env import MODEL_SAVE_DIR_PRE_FIX
from .extensions import db
from .ml.extract_data import extract_data
from .ml.service import start_service
from .ml.train import start_train
from .models import WechatRobot
from .extensions import msg_q, reply_q


class Chatbot(threading.Thread):
    def __init__(self, wechat_id, sample_file_path):
        threading.Thread.__init__(self)
        self.sample_file_path = sample_file_path
        self.wecaht_id = wechat_id

    def run(self):
        print("Start training")
        save_path = MODEL_SAVE_DIR_PRE_FIX + str(uuid.uuid1())
        extract_data(self.sample_file_path, save_path)
        start_train(save_path)

        with app.app_context():
            wechat_robot_instance = WechatRobot(self.wecaht_id, save_path)
            db.session.add(wechat_robot_instance)
            db.session.commit()

        print("End of training")


class ChatService(threading.Thread):
    def __init__(self, model_addr):
        threading.Thread.__init__(self)
        self.model_addr = model_addr

    def run(self):
        print("Start chat service...")
        start_service(self.model_addr, msg_q, reply_q)
        print("End chat service...")
