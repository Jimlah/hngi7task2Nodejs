const fs = require('fs'),
    sizeOf = require('image-size'),
    Jimp = require('jimp');


const resizeImage = (req, res) => {
     // ensure image is sent
    if(!req.file){
        return res.status(422).send({ status: "error", message: "No image specified" });

    }
    
    const { path, mimetype } = req.file;
    const { height, width } = req.body;
    // ensure uploaded file is valid
    const allowedTypes = ["image/jpeg", "image/png", "image/bmp", "image/tiff", "image/gif"];
    if (!allowedTypes.includes(mimetype)) {
        return res.status(422).send({ status: "error", message: "Invalid Image. File must be in JPEG, PNG, BMP, TIFF or GIF format" });
    }

    // if no height or width return the original image
    const dimensions = sizeOf(path),
    originalHeight = dimensions.height,
    originalWidth = dimensions.width;
    
    //If height or width is not provided, return original image
    if(!(height||width)){
        return resizeFile(req.file, originalWidth, originalHeight, res);
    }
    // If height is provided without width, then use Jimp's algorithm to resize
   else if (height && !width) {
    return resizeFile(req.file, Jimp.AUTO, parseInt(height), res)
   }
   // If width is provided without height, then use Jimp's algorithm to resize
   else if (!height && width) {
    return resizeFile(req.file, parseInt(width), Jimp.AUTO, res)
   }
   //If height and width is provided, then use both to resize
   else{
       return resizeFile(req.file, parseInt(width), parseInt(height), res)
   }
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
                .resize(width, height)
                .writeAsync(newPath)
            // send resized image to client
            res.download(newPath, (err) => {
                if (err) console.log("Download_Error ::", err);
                deleteFile(path) // delete uploaded file
                deleteFile(newPath) // delete resized file
            })
        }).catch(err => {
            console.log(err)
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

