const fs = require('fs'),
    sizeOf = require('image-size'),
    Jimp = require('jimp');


const resizeImage = (req, res) => {
     // ensure image is sent
    if(!req.file){
        return res.status(422).send({ status: "error", message: "No image specified" });

    }



    const { path, mimetype } = req.file;
    const { height, width, resolution } = req.body;

   
   

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
        return resizeFile(req.file, originalWidth, originalHeight, res);
    }else if((!height&&!resolution&&width)||(height&&!resolution&&!width)){
        return res.status(422).send({ status: "error", message: "Invalid Format. height and width must be spacified or resolution" });

    }


    // use width and height if provided in the body
    if (height || width) return resizeFile(req.file, width, height, res);

    


    // use formula to deduce width and height using provided resolution
   

    let ratio = resolution / originalWidth,
        newHeight = originalHeight * ratio,
        newWidth = resolution;

    if (newHeight > resolution) {
        ratio = resolution / originalHeight;
        newHeight = resolution;
        newWidth = originalWidth * ratio;
    }
    resizeFile(req.file, newWidth, newHeight, res);
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

    Jimp.read(path)
        .then(async image => {
            await image
                .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)
                .writeAsync(newPath)
            // send resized image to client
            res.download(newPath, (err) => {
                if (err) console.log("Download_Error ::", err);
                deleteFile(path) // delete uploaded file
                deleteFile(newPath) // delete resized file
            })
        });
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

