from .extensions import db
import datetime


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
            service_id=self.service_id,
            wechat_id=self.wechat_id,
            nick_name=self.nick_name,
            signature=self.signature,
            sex=self.sex,
            avatar_url=self.avatar_url,
            login_status=self.login_status,
            gmt_modified=self.gmt_modified,
            gmt_create=self.gmt_create,
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
            wechat_id=self.wechat_id,
            robot_id=self.robot_id,
            to_user_name=self.to_nick_name,
            to_remark_name=self.to_remark_name,
            chat_content=self.chat_content,
            reply_content=self.reply_content,
            gmt_sent=str(self.gmt_sent),
            status=self.status
        )
