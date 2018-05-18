import functools
import itchat
import uuid
from . import env
from flask import (
    Blueprint, flash, g, redirect, request, session, url_for, jsonify
)
from werkzeug.security import generate_password_hash
from flaskr.db import get_db

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


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        pic_dir = env.QR_SAVE_DIR_PRE_FIX + str(uuid.uuid1())
        itchat.login(enableCmdQR=True, picDir=pic_dir)

    return jsonify(pic=pic_dir), 201


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
