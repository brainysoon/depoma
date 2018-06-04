from .extensions import db
import datetime
from . import env


class WechatInfo(db.Model):
    __tablename__ = 'wechat_info'
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    wechat_id = db.Column(db.String(128), unique=True, nullable=False)
    service_id = db.Column(db.String(64), unique=True, nullable=False)
    nick_name = db.Column(db.String(64), nullable=False)
    signature = db.Column(db.String(128), nullable=False)
    sex = db.Column(db.Integer, nullable=False)
    avatar_url = db.Column(db.String(256), nullable=False)
    login_status = db.Column(db.Integer, nullable=False)
    gmt_modified = db.Column(db.DateTime, nullable=False)
    gmt_create = db.Column(db.DateTime, nullable=False)
    state = db.Column(db.Integer, nullable=False)

    def __init__(self, login_info, service_id):
        self.service_id = service_id
        user = login_info['User']
        self.wechat_id = user.Uin
        self.nick_name = user.NickName
        self.signature = user.Signature
        self.sex = user.Sex
        self.avatar_url = 'https://wx2.qq.com' + user.HeadImgUrl
        self.login_status = 1
        self.gmt_create = datetime.datetime.now()
        self.gmt_modified = datetime.datetime.now()
        self.state = 1

    def __repr__(self):
        return '<wechat_info %r>' % self.user_name

    def to_dict(self):
        return dict(
            id=self.id,
            serviceId=self.service_id,
            wechatId=self.wechat_id,
            nickName=self.nick_name,
            signature=self.signature,
            sex=self.sex,
            avatarUrl=self.avatar_url,
            loginStatus=self.login_status,
            gmtModified=str(self.gmt_modified),
            gmtCreate=str(self.gmt_create),
            state=self.state
        )


class WechatRecord(db.Model):
    __tablename__ = 'wechat_record'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    wechat_id = db.Column(db.String(128), nullable=False)
    robot_id = db.Column(db.String(64), nullable=False)
    to_nick_name = db.Column(db.String(64), nullable=False)
    to_remark_name = db.Column(db.String(64), nullable=False)
    chat_content = db.Column(db.String(64), nullable=False)
    reply_content = db.Column(db.String(64), nullable=False)
    gmt_sent = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer)

    def __init__(self, wechat_id, robot_id, msg, reply):
        self.wechat_id = wechat_id
        self.robot_id = robot_id
        to_user = msg['User']
        self.to_nick_name = to_user.NickName
        self.to_remark_name = to_user.RemarkName
        if not self.to_remark_name:
            self.to_remark_name = ''
        self.chat_content = msg['Content']
        self.reply_content = reply
        self.gmt_sent = datetime.datetime.now()
        self.status = 1

    def __repr__(self):
        return '<wechat_record %r>' % (str(self.id) + self.wechat_id)

    def to_dict(self):
        return dict(
            id=self.id,
            wechatId=self.wechat_id,
            robotId=self.robot_id,
            toNickName=self.to_nick_name,
            toRemarkName=self.to_remark_name,
            chatContent=self.chat_content,
            replyContent=self.reply_content,
            gmtSent=str(self.gmt_sent),
            status=self.status
        )


class WechatSample(db.Model):
    __tablename__ = 'wechat_sample'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    wechat_id = db.Column(db.String(128), nullable=False)
    sample_addr = db.Column(db.String(128), nullable=False)
    gmt_modified = db.Column(db.DateTime, nullable=False)
    gmt_create = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, nullable=False)

    def __init__(self, sample_addr, wechat_id):
        self.wechat_id = wechat_id
        self.sample_addr = sample_addr
        self.gmt_modified = datetime.datetime.now()
        self.gmt_create = datetime.datetime.now()
        self.status = 1

    def __repr__(self):
        return '<wechat_sample %r>' % (str(self.id) + self.wechat_id)

    def to_dict(self):
        return dict(
            id=self.id,
            wechatId=self.wechat_id,
            sampleAddr=self.sample_addr,
            gmtModified=str(self.gmt_modified),
            gmtCreate=str(self.gmt_create),
            status=self.status,
            sampleLink=env.server_resources_prefix() + '/sample/' + self.sample_addr
        )


class WechatRobot(db.Model):
    __tablename__ = 'wechat_robot'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    wechat_id = db.Column(db.String(128), nullable=False)
    robot_name = db.Column(db.String(32), nullable=False)
    robot_model_addr = db.Column(db.String(128), nullable=False)
    gmt_modified = db.Column(db.DateTime, nullable=False)
    gmt_create = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, nullable=False)

    robot_count = 0

    def __init__(self, wechat_id, robot_model_addr):
        self.wechat_id = wechat_id
        self.robot_name = '机器人' + str(WechatRobot.robot_count + 1)
        self.robot_model_addr = robot_model_addr
        self.gmt_modified = datetime.datetime.now()
        self.gmt_create = datetime.datetime.now()
        self.status = 1

    def __repr__(self):
        return '<wechat_robot %r>' % (str(self.id) + self.wechat_id)

    def to_dict(self):
        return dict(
            id=self.id,
            wechatId=self.wechat_id,
            robotName=self.robot_name,
            robotModelAddr=self.robot_model_addr,
            gmtModified=str(self.gmt_modified),
            gmtCreate=str(self.gmt_create),
            status=self.status
        )


class ServiceLog(db.Model):
    __tablename__ = 'service_log'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    wechat_id = db.Column(db.String(128), nullable=False)
    service_id = db.Column(db.String(64), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.Integer, nullable=False)
    __mapper_args__ = {"order_by": start_time.desc()}

    def __init__(self, wechat_id, service_id):
        self.wechat_id = wechat_id
        self.service_id = service_id
        self.start_time = datetime.datetime.now()
        self.status = 1

    def __repr__(self):
        return '<service_log %r>' % (str(self.id) + self.wechat_id + self.service_id)

    def to_dict(self):
        return dict(
            id=self.id,
            wechatId=self.wechat_id,
            serviceId=self.service_id,
            startTime=str(self.start_time),
            endTime=str(self.end_time),
            status=self.status
        )
