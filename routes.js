const express = require('express');
const Router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const swaggerDocument = require('./swagger.json');
const controller = require('./controller/main-controller');

Router.post('/resizeimg', upload.single('image'), controller.resizeImage);

// Return swagger documentation as json
Router.get('/documentation', (_, res) => res.send(swaggerDocument));

module.exports = Router;

