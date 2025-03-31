const { json } = require('express');
const { response } = require('../app');
const userModel = require('../models/user.model');//this is used to import the user model from the user.model.js file
const userService = require('../services/user.service');// this is used to import the user service from the user.service.js file
const { validationResult } = require('express-validator');//this is used to import the validationResult function from the express-validator package



module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);//this is used to get the validation errors from the request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);//this is used to log the request body to the console for debugging purposes

        const { fullname, email, password } = req.body;//this is used to get the data from the request body

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