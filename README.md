# hngi7task2Nodejs
 A dockerized micro-service for resizing images and serving an appropriately sized one.

## Features
- Image resizing.
- Accepts multiple image formats.
- Fast and Scalable App

## API Endpoints
| Endpoint | Functionality |
| ----------- | ----------- |
| POST /resizeimg | resize Image |

## Prerequisites
- You need to have lastest version of Nodejs installed
  
## Installation / Setup
- Fork the repository 
- Clone the repo to your local machine 
- Run that in your local machine in the project directory 
- Run `npm install` to install all apllication dependencies
- Run server with `npm start` to start server
- In the app.js file we have our server initializtion
- In the routes file we have the address of the api 
- In the controller file the function that api will doing 
## How to start the docker container


Build the docker image
docker build --tag flash-resize .

Run the docker container
docker run -p 3000:3000 -d --name resize-app flash-resize


## docs
-you can send an image with its new width and height \
-you can send an image with its new resolution \
-the new image will be downloaded automatically \
-if no with, height or resolution the image is returned with its original size \
-if no image is sent it return 400 \
-if image not supported is sent it returns 422
