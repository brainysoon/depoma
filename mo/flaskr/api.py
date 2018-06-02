import time
import uuid

from flask import (
    Blueprint, jsonify
)
from flask_cors import CORS

from . import env
from . import wechat
from .models import WechatInfo, WechatRecord

api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1/')
CORS(api_v1)


@api_v1.route('/login', methods=['POST'])
def login():
    service_id = str(uuid.uuid1())
    login_thread = wechat.wechat_login('login', service_id)
    login_thread.start()

    pic_link = env.server_resources_prefix() + '/qr/' + service_id + '.png'
    time.sleep(2)
    return jsonify(link=pic_link, service_id=service_id), 201


@api_v1.route('/login/status/<service_id>', methods=['GET'])
def login_status(service_id):
    wechat_info = WechatInfo.query.filter_by(service_id=service_id).first()
    return jsonify(wechat_info=wechat_info), 200


@api_v1.route('/chat/records/<wechat_id>', methods=['GET'])
def chat_records(wechat_id):
    wechat_records = WechatRecord.query.filter_by(wechat_id=wechat_id).all()
    records = [record.to_dict() for record in wechat_records]
    return jsonify(records=records), 200
