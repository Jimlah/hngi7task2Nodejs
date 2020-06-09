const fs = require('fs'),
    sizeOf = require('image-size'),
    {applyFilter} = require('./filter'),
    Jimp = require('jimp');


const resizeImage = (req, res) => {
     // ensure image is sent
    if(!req.file){
        return res.status(400).send({ status: "error", message: "No image specified" });

    }

    const { path, mimetype } = req.file;
    const { height, width, resolution, filter } = req.body;

   
   

    // ensure uploaded file is valid
    const allowedTypes = ["image/jpeg", "image/png", "image/bmp", "image/tiff", "image/gif"];
    if (!allowedTypes.includes(mimetype)) {
        return res.status(422).send({ status: "error", message: "Invalid Image. File must be in JPEG, PNG, BMP, TIFF or GIF format" });
    }

    // if no height or width or resolution return the original img
    const dimensions = sizeOf(path),
    originalHeight = dimensions.height,
    originalWidth = dimensions.width;
    if(!(height||width||resolution)){
        return resizeFile(req.file, originalWidth, originalHeight, filter, res);
    }


    // use width and height if provided in the body
    if (height || width) return resizeFile(req.file, width, height, filter, res);

    


    // use formula to deduce width and height using provided resolution
   

    let ratio = resolution / originalWidth,
        newHeight = originalHeight * ratio,
        newWidth = resolution;

    if (newHeight > resolution) {
        ratio = resolution / originalHeight;
        newHeight = resolution;
        newWidth = originalWidth * ratio;
    }
    resizeFile(req.file, newWidth, newHeight, filter, res);
}

/**
 * 
 * @param {object} req.file | Uploaded image meta data 
 * @param {any} width | Resizable with
 * @param {any} height  | Resizable height
 * @param {any} res  | Response object
 */
function resizeFile({ originalname, path }, width, height, res) {
    // save image file with a unique name
    const newPath = `./uploads/${Date.now()}_${originalname}`;

    if(filter){
        applyFilter(width, height, path, newPath, filter, res);//apply a filter 
        deleteFile(path); // delete uploaded file
    }
    else{
        Jimp.read(path)
        .then(async image => {
            await image
                .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)
                .writeAsync(newPath)
            // send resized image to client
            res.status(201).download(newPath, (err) => {
                if (err) console.log("Download_Error ::", err);
                deleteFile(path) // delete uploaded file
                deleteFile(newPath) // delete resized file
            })
        });
    }
}

/**
 * Delete file from file system
 * @param {String} path | File path
 */
function deleteFile(path) {
    fs.unlink(path, (err) => {
        if (err) return console.log("FILE_CLEANUP_ERROR ::", err);
        console.log("---File deleted---\n")
    })
}

module.exports = {
    resizeImage
}

