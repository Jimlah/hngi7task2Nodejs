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
| -------- | ------------- |

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


## Image Api Documentation
API_ENDPOINT : https://imgresizeak.herokuapp.com/resizeimg\
SWAGGER_ENDPOINT : https://imgresizeak.herokuapp.com/docs

Accepted Image Formats  : PNG, BMP, TIFF, BMP or GIF

Acess the Api Via a POST request and name the image **image**
  | Response Status Code | Meanings                                                 |
  | -------------------- | -------------------------------------------------------- |
  | 400                  | No image was specified                                   |
  | 422                  | Image Specified is not supported. Check supported images |

Operation  : 

- You can send the height of the image and the new image will return with the height choosen with the appropriate width.
- You can send the width of the image and the new image will return with the height choosen  with the appropriate height.
- You can send both width and height and the image will return with the width and height choosen.
- You can just send the resolution of the image you want and the image will return with the given resolution.
- If you send resolution with the width and height the returned image will match your specified width and height.

**Note :**

- If no width, height or resolution is sent the original image you sent is returned \
 