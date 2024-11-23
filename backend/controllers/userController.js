import async_handler from 'express-async-handler';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import genToken from '../utils/genToken.js';

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public


const authUser = async_handler(async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPasswords(password))){
        genToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email:user.email
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid email or password")
    }

})

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = async_handler(async(req, res)=>{
    // console.log(req.body);
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email:email})

    if(userExists){
        res.status(404)
        throw new Error("User already exists")
    }

    const user = await User.create({name, email, password});

    if(user){
        genToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email:user.email
        })
    }
    else{
        res.status(400)
        throw new Error("invalid User Data")
    }
})

// @desc Logout user
// @route POST /api/users/logout
// @access Public

const logoutUser = async_handler(async(req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "You are now logged out!"});



})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private - need valid JWT token

const getUserProfile = async_handler(async(req, res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }


    res.status(200).json(user);
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUser = async_handler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password;
        }

        const updUser = await user.save();

        res.status(200).json({
            _id: updUser._id,
            name: updUser.name,
            email: updUser.email
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser
}



