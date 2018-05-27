#!/bin/bash

# pull latest code from git
echo "Pulling latest code from github!"
cd ..
git pull

# build frontend
echo "Building frontend application!"
cd frontend
npm run build

rm -rf /var/www/html/*
cp -r build/* /var/www/html/
cp ../deployment/.htaccess /var/www/html/

echo "deployment of react application done!"

# build backend
echo "Building backend application!"
cd ../backend
rm -rf build
gradle build -x test

systemctl stop wodss-tippspiel
rm /var/wodss-tippspiel/backend-*.jar

cp build/libs/backend-*.jar /var/wodss-tippspiel/
systemctl start wodss-tippspiel

echo "deployment of backend application finished"
