# Depoma
#
# VERSION               1.0.0

FROM python:3

MAINTAINER @brainysoon <brainysoon@gmail.com>

LABEL Description="MO project docker image" Vendor="Depoma" Version="1.0.0"

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD [ "python", "./app.py" ]