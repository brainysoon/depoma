from . import api
from .extensions import db
from .core import app


def config_app(test_config=None):
    # create and configure the app
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI='mysql+pymysql://depoma:depoma@stage.icusin.com:3306/depoma?charset=utf8',
        SQLALCHEMY_TRACK_MODIFICATIONS=True
    )

    # config
    config_extensions(app)
    config_blueprint(app)
    config_test(app, test_config)
    configure_logging(app)

    return app


def config_extensions(app):
    db.init_app(app)


def config_blueprint(app):
    app.register_blueprint(api.api_v1)


def config_test(app, test_config):
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)


def configure_logging(app):
    import logging
    from logging import StreamHandler

    class DebugHandler(StreamHandler):
        def emit(x, record):
            StreamHandler.emit(x, record) if app.debug else None

    logger = logging.getLogger('app')
    logger.addHandler(DebugHandler())
    logger.setLevel(logging.DEBUG)

    app.debug_logger = logger
