#!/bin/bash

chmod  400 ./stage_icusin_ubuntu

ssh -T -i ./stage_icusin_ubuntu -o StrictHostKeyChecking=no root@stage.icusin.com << stage-icusin-remote

cd /home
if [ ! -d "depoma" ];then
    git clone git@github.com:brainysoon/depoma.git
fi

cd depoma
git pull origin master

echo start building eve
cd eve

npm install
npm run build
cp dist/bundle.js docker/bundle.js

cd docker
docker build -t eve .
docker rm -f eve-instance
docker run --name eve-instance -d -p 80:80 eve

echo start building mo
cd mo

python3 setup.py bdist_wheel
cp mo-1.0.0-py3-none-any.whl docker/mo-1.0.0-py3-none-any.whl

cd docker

cd docker
docker build -t mo .
docker rm -f mo-instance
docker run --name mo-instance -d -p 8080:8080 mo

stage-icusin-remote