const express=require('express');
const Router=express.Router();
const comtroller=require('./controller/main-controller');

Router.post('/add-img',comtroller.add_img)

Router.get('/img',comtroller.get_img)

Router.get('/',(req,res)=>{
res.send('working !!!')
})

module.exports=Router;