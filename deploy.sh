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

docker build -t eve .

docker rm -f eve-instance

docker run --name eve-instance -d -p 80:80 eve

echo start building mo
cd mo

stage-icusin-remote