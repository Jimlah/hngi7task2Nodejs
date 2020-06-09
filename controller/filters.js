const Jimp = require('jimp');
const fs = require('fs');

const applyFilter = (width, height, path, newpath, filter, res) => {
    switch (filter) {
        case 'greyscale': 
            greyed(width, height, path, newpath, res);
            break;
        case 'sepia':
            sepia(width, height, path, newpath, res);
            break;
        case 'invert':
            invert(width, height, path, newpath, res);
            break;
        case 'cool':
            cool(width, height, path, newpath, res);
            break;
        case 'pop' :
            pop(width, height, path, newpath, res);
            break;
    }

}

const greyed = (width, height, path, newpath, res) => {  
    Jimp.read(path).then(async image => {
     await image
     .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)//resize
     .greyscale()//add filter
     .writeAsync(newpath);//save

     res.status(201).download(newpath, err => {
         if (err) console.log(`Error : ${err}`);
         deleteFile(newpath);
     })
    })
}

const sepia = (width, height, path, newpath, res) => {
    Jimp.read(path).then(async image => {
     await image
     .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)//resize
     .sepia()//add filter
     .writeAsync(newpath);//save

     res.status(201).download(newpath, err => {
         if (err) console.log(`Error : ${err}`);
         deleteFile(newpath);
     })
    })
}

const invert = (width, height, path, newpath, res) => {
    Jimp.read(path).then(async image => {
     await image
     .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)//resize
     .invert()//add filter
     .writeAsync(newpath);//save

     res.status(201).download(newpath, err => {
         if (err) console.log(`Error : ${err}`);
         deleteFile(newpath);
     })
    })
}

const cool = (width, height, path, newpath, res) => {
    Jimp.read(path).then(async image => {
     await image
     .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)//resize
     .color([
         {apply:'blue', params:[30]},
         {apply:'brighten', params:[10]}
     ])//add filter
     .writeAsync(newpath);//save

     res.status(201).download(newpath, err => {
         if (err) console.log(`Error : ${err}`);
         deleteFile(newpath);
     })
    })
}

const pop = (width, height, path, newpath, res) => {
    Jimp.read(path).then(async image => {
     await image
     .resize(parseInt(width) || Jimp.AUTO, parseInt(height) || Jimp.AUTO)//resize
     .color([
         {apply:'red', params:[15]},
         {apply:'brighten', params:[10]},
         {apply: 'saturate', params:[10]}
     ]) //add filter
     .writeAsync(newpath);//save

     res.status(201).download(newpath, err => {
         if (err) console.log(`Error : ${err}`);
         deleteFile(newpath);
     })
    })
}

function deleteFile(path) {
    fs.unlink(path, (err) => {
        if (err) return console.log("FILE_CLEANUP_ERROR ::", err);
        console.log("---File deleted---\n")
    })
}
module.exports = {applyFilter}