# hngi7task2Nodejs
 A dockerized micro-service for resizing images and serving an appropriately sized one.

## Features
- Image resizing.
- Accepts multiple image formats.
- Accepts multiple image formats.
- Image resizing.
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
API :https://imgresizeak.herokuapp.com/resizeimg \
swagger docs :https://imgresizeak.herokuapp.com/docs
-use post to access the API \
-name the image image 

-you can send the height of the image and the new image will return with the height u chose with the appropriate width \
-you can send the width of the image and the new image will return with the height u chose with the appropriate height \
-you can send both width and height and the image will return with the width and height u have been chosen \
-you can just send the resolution of the image you want and the image will return with that resolution \
-if you send resolution with the width and height the returned image will match your specified width and height \
-if no width, height or resolution is sent the original image you sent is returned \
-if you didn't send an image it responds with 400 with "message": "No image specified" \
-if you send the type of image not supported it responds with code 422 with "message": "Invalid Image. The file must be in JPEG, PNG, BMP, TIFF or GIF format"

