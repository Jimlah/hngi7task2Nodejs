#!/bin/bash
git pull origin
docker stop teamflashnodejs && docker rm teamflashnodejs
#docker rmi teamflashnodejs:latest
docker build --tag teamflashnodejs .
docker run -p 1050:3000 -d --name teamflashnodejs teamflashnodejs:latest
