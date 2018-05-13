FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

pip install mo-1.0.0-py3-none-any.whl

CMD export FLASK_APP=mo
CMD flask init-db

waitress-serve --call 'mo:create_app'

EXPOSE 8080