FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD python ./setup.py bdist_wheel
CMD pip instal ./dist/*
CMD export FLASK_APP=mo
CMD pip install waitress
CMD waitress-serve --port='8080' --call 'flaskr:create_app'

EXPOSE 80:8080