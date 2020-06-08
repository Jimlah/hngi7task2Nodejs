const express=require('express');
const Router=express.Router();
const controller=require('./controller/main-controller');
const fs=require('fs');
const path=require('path')
const multer=require('multer')

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/images')
    },
    filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    
    
    
    }})



    var checkImage=function(file,cb){


        var ext=path.extname(file.originalname);
        
        if(ext==='.png'||ext==='.jpg'||ext==='.jpeg'){
            cb(null,true)
        }else{
            cb('not an image',false)
        }
        
        
        }



        var upload=multer({
            storage:storage,
            fileFilter:function(req,file,cb){
                checkImage(file,cb)
            }
        })
        










  


Router.post('/add-img',upload.any('img'),controller.add_img)
Router.get('/img',controller.get_img)

Router.get('/',(req,res)=>{
res.send('working !!!')
})

module.exports=Router;