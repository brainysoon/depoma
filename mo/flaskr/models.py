from .extensions import db
import datetime


class WechatInfo(db.Model):
    __tablename__ = 'wechat_info'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    wechat_id = db.Column(db.String(64), unique=True)
    login_status = db.Column(db.Integer)
    state = db.Column(db.Integer)

    def __init__(self, wechat_id):
        self.wechat_id = wechat_id
        self.login_status = 0
        self.state = 1

    def __repr__(self):
        return '<wechat_info %r>' % self.wechat_id


class WechatRecord(db.Model):
    __tablename__ = 'wechat_record'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    wechat_id = db.Column(db.String)
    robot_id = db.Column(db.String)
    chat_content = db.Column(db.String)
    gmt_sent = db.Column(db.DateTime)
    status = db.Column(db.Integer)

    def __init__(self, wechat_id, robot_id, chat_content):
        self.wechat_id = wechat_id
        self.robot_id = robot_id
        self.chat_content = chat_content
        self.gmt_sent = datetime.datetime.now()
        self.status = 1

    def __repr__(self):
        return '<wechat_record %r>' % self.wechat_id
