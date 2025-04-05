const { json } = require('express');
const { response } = require('../app');
const userModel = require('../models/user.model');//this is used to import the user model from the user.model.js file
const userService = require('../services/user.service');// this is used to import the user service from the user.service.js file
const { validationResult } = require('express-validator');//this is used to import the validationResult function from the express-validator package
const blackListTokenModel = require('../models/blacklistToken.model');//this is used to import the blacklistedToken model from the blacklistedToken.model.js file 


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);//this is used to get the validation errors from the request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        //console.log(req.body);//this is used to log the request body to the console for debugging purposes

        const { fullname, email, password } = req.body;//this is used to get the data from the request body

        const isUserAlrady = await userModel.findOne({ email: email });//this is used to check if the user already exists in the database
        if (isUserAlrady) {
            return res.status(400).json({ message: "User already exists" });
        }//this is used to check if the user already exists in the database


        const hashedPassword = await userModel.hashPassword(password);//this is used to hash the password entered by the user before storing it in the database

        const user = await userService.createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password: hashedPassword
            });//this is used to create a new user in the database using the user service

            const token = user.generateAuthToken();//this is used to generate a token for the user using the generateAuthToken method from the user model
            res.status(201).json({ token, user});//this is used to send a response back to the client with the token and user data




}//this is used to export the registerUser function so that it can be used in other files

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');//this is used to find the user in the database using the email address and select the password field
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token)// this is used to set a cookie with the token in the response

        res.status(200).json({ token, user });//this is used to send a response back to the client with the token and user data
}//this is used to generate a token for the user using the generateAuthToken method from the user model


module.exports.getUserProfile = async (req, res, next) => {
        res.status(200).json({ user: req.user });//this is used to send a response back to the client with the user data
    }//this is used to export the getUserProfile function so that it can be used in other files

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');// this is used to clear the cookie with the token in the response
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];//this is used to get the token from the cookie or the authorization header in the request 

    await blackListTokenModel.create({ token });//this is used to create a new blacklisted token in the database using the blacklisted token model


    res.status(200).json({ message: 'Logged out successfully' });//this is used to send a response back to the client with the message Logged out successfully  
}//this is used to export the logoutUser function so that it can be used in other files 

   
