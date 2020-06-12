const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./keys') 

const User = require('./model/item');

//Authenticate the user
const authenticate = (req, res) => {
    //get Username and password from request body
    const {username, password} = req.body;
    
    //If required data is not sent
    if(!username || !password){
        return res.status(400).send({"status": "error", "message" : "Please provide Username and Password"})
    }

    //Find user in database
    User.findOne({username}).then(user =>{
        //If a username already exist
        if(!user){
            return res.status(400).json({"status" : "error", "message" : "user does not exist"})
        }
        //Authenticate user        
        bcrypt.compare(password, user.password).then(matches => {
            if(!matches) return res.status(400).json({"status" : "error","message" : "Invalid credentials"})
        
            jwt.sign({ id: user.id}, keys.jwtSecret, (err, token) => {
                if(err) throw err
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username
                    }
                })
            })
        })
    
    }).catch(err => console.log(err))
     
}

const verifyToken = (req, res, next) => {
    //Get Token from request header
    const token = req.header('x-access-token');
    //Check for token
    if(!token) res.status(401).json({"status" : "error", "message" : "access denied"})

    jwt.verify(token, keys.jwtSecret, (err, decoded) =>{
        //If token is not valid
        if(err) res.status(400).json({"status" : "error", "message": "failed to authenticate"});

        //If token is valid
        req.user = decoded;
        next();
    })
     
}

//Register a new User
const register = (req, res) => {
    const {username, password} = req.body;
    
    //If required data is not sent
    if(!username || !password){
        return res.status(400).send({"status": "error", "message" : "Please fill Username and Password"})
    }

    
    User.findOne({username}).then(user =>{
        //If a username already exist
        if(user){
            return res.status(400).json({"status" : "error", "message" : "username already exists, please modify or add numbers"})
        }
        //create user
        const newUser = new User({
            username,
            password
        });
        //save user to database with hashed password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        
                        jwt.sign({ id: user.id}, keys.jwtSecret, (err, token) => {
                            if(err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                }
                            })
                        })
                    })
            })
        })
    }).catch(err => console.log(err));
}
module.exports = {
    authenticate,
    verifyToken,
    register
};