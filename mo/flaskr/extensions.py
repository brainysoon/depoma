# -*- coding: utf-8 -*-

from flask_sqlalchemy import SQLAlchemy
from queue import Queue

# mysql db
db = SQLAlchemy()

# msg queue
msg_q = Queue()
reply_q = Queue()
