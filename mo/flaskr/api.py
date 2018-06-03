import time
import uuid

from flask import (
    Blueprint, jsonify, request
)
from flask_cors import CORS

from . import env
from . import wechat
from .models import WechatInfo, WechatRecord, WechatSample, WechatRobot, ServiceLog
from .extensions import db

api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1/')
CORS(api_v1)


@api_v1.route('/login', methods=['POST'])
def login():
    service_id = str(uuid.uuid1())
    login_thread = wechat.wechat_login('login', service_id)
    login_thread.start()

    pic_link = env.server_resources_prefix() + '/qr/' + service_id + '.png'
    time.sleep(2)
    return jsonify(link=pic_link, serviceId=service_id), 201


@api_v1.route('/login/status/<service_id>', methods=['GET'])
def login_status(service_id):
    wechat_info = WechatInfo.query.filter_by(service_id=service_id).first()
    if wechat_info:
        return jsonify(loginStatus=wechat_info.login_status), 200
    else:
        return jsonify(msg='not login'), 404


@api_v1.route('/chat/records/<wechat_id>', methods=['GET'])
def chat_records(wechat_id):
    wechat_records = WechatRecord.query.filter_by(wechat_id=wechat_id).all()
    records = [record.to_dict() for record in wechat_records]
    return jsonify(records=records), 200


@api_v1.route('/wechat/info/<service_id>', methods=['GET'])
def wechat_info(service_id):
    wechat_info_instance = WechatInfo.query.filter_by(service_id=service_id).first()
    if wechat_info_instance:
        return jsonify(wechatInfo=wechat_info_instance.to_dict()), 200
    else:
        return jsonify(msg='not login'), 404


@api_v1.route('/wechat/sample/add', methods=['POST'])
def add_wechat_sample():
    wechat_id = request.form['wechatId']
    if 'contentFile' not in request.files:
        return jsonify(msg='file not present'), 406

    content_file = request.files['contentFile']
    file_name = str(uuid.uuid1()) + '.txt'
    content_file.save(env.SAMPLE_SAVE_DIR_PRE_FIX + file_name)

    wechat_sample_instance = WechatSample(file_name, wechat_id)
    db.session.add(wechat_sample_instance)
    db.session.commit()
    return jsonify(sample=wechat_sample_instance.to_dict()), 200


@api_v1.route('/wechat/samples/<wechat_id>', methods=['GET'])
def get_wechat_samples(wechat_id):
    wechat_samples = WechatSample.query.filter_by(wechat_id=wechat_id, status=1).all()
    samples = [sample.to_dict() for sample in wechat_samples]
    return jsonify(samples=samples), 200


@api_v1.route('/wechat/sample/delete/<sample_id>', methods=['DELETE'])
def delete_wechat_sample(sample_id):
    wechat_sample_instance = WechatSample.query.filter_by(id=sample_id).first()
    wechat_sample_instance.status = 0
    db.session.commit()
    return jsonify(sample=wechat_sample_instance.to_dict()), 200


@api_v1.route('/wechat/robots/<wechat_id>', methods=['GET'])
def list_wechat_robots(wechat_id):
    wechat_robots = WechatRobot.query.filter_by(wechat_id=wechat_id, status=1).all()
    robots = [robot.to_dict() for robot in wechat_robots]
    return jsonify(robots=robots), 200


@api_v1.route('/service/logs/<wechat_id>', methods=['GET'])
def list_service_logs(wechat_id):
    service_logs = ServiceLog.query.filter_by(wechat_id=wechat_id, status=1).all()
    logs = [log.to_dict() for log in service_logs]
    return jsonify(serviceLogs=logs), 200
