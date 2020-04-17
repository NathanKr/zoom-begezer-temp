#!/bin/sh
# run one level above zoom-begezer-tempe 
# assume only one process run by pm2 otherwise use process name
pm2 stop 0
pm2 delete 0 
pm2 save --force
rm -r zoom-begezer-temp
git clone https://github.com/NathanKr/zoom-begezer-temp.git
cd zoom-begezer-temp
cd server
npm i
cd client 
npm i
npm run build
cd ~
pm2 start zoom-begezer-temp/server/index.js
pm2 save

