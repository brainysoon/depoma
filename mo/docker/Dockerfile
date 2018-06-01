FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

RUN pip install mo-1.0.0-py3-none-any.whl

CMD export FLASK_APP=flaskr
CMD flask init-db

CMD waitress-serve --call 'flaskr:config_app'

EXPOSE 8080