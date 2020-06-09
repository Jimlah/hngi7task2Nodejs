
const express = require('express');
const Router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const controller = require('./controller/main-controller');

Router.post('/resizeimg', upload.single('image'), controller.resizeImage);

module.exports = Router;

