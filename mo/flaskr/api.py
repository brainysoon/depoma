import time
import uuid

from flask import (
    Blueprint, request, jsonify
)
from flask_cors import CORS

from . import env
from . import models
from . import wechat
from .extensions import db

api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1/')
CORS(api_v1)


@api_v1.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        wechat_id = str(uuid.uuid1())

        login_thread = wechat.wechat_login('test', wechat_id)
        login_thread.start()

        pic_link = env.server_resources_prefix() + '/qr/' + wechat_id + '.png'
        time.sleep(2)

        wechat_instance = models.WechatInfo(wechat_id)
        db.session.add(wechat_instance)
        db.session.commit()

    return jsonify(link=pic_link), 201
