const {UserModel} = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup",async (req,res)=>{
    try {
        const {password} = req.body;
        bcrypt.hash(password, 5, async function(err, hash) {
        req.body.password = hash;
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(200).json({Message:"New user has been registered"});
    });
    } catch (error) {
        console.log(error);
        res.status(400).json({Error:error});
    }   
})

userRouter.post("/login",async (req,res)=>{
    try {
        const user = await UserModel.findOne({email:req.body.email});
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({email:user.email,password:user.password}, process.env.secretKey);
                res.status(200).json({Message:"Login Successfull",token:token})
            }else{
                console.log(err);
                res.status(400).json({Error:"Wrong Credentials"})
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({Error:"Wrong Credentials"})
    }
})

module.exports = {userRouter};