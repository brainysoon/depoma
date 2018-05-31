import functools
import uuid

from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify
)
from werkzeug.security import generate_password_hash

from flaskr.db import get_db
from . import env
from . import wechat

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.execute(
                'SELECT id FROM user WHERE username = ?', (username,)
        ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            db.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return 'register'


@bp.route('/qr', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        uuit = str(uuid.uuid1())

        login_thread = wechat.wechat_login(1, 'test', uuid)
        login_thread.start()

    return jsonify(link=env.server_prefix() + '/auth/login/' + uuid), 201


@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


# like a filter
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
