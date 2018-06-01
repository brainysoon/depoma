from flaskr import config_app

if __name__ == '__main__':
    app = config_app()
    app.run(host='0.0.0.0', port=8080, debug=True)
