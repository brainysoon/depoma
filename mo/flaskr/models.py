from .extensions import db


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
