const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');




module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);//this is used to get the validation errors from the request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullname, email, password, vehicle} = req.body;//this is used to get the data from the request body
    
    const isCaptainAlreadyExist = await captainModel.findOne({ email: email });//this is used to check if the user already exists in the database
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exist" });
        }



    const hashedPassword = await captainModel.hashPassword(password);//this is used to hash the password entered by the user before storing it in the database

    const captain = await captainService.createCaptain({
       firstname : fullname.firstname,
         lastname : fullname.lastname,
        email,
        password: hashedPassword,
        color : vehicle.color,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType

        });//this is used to create a new user in the database using the user service


        const token = captain.generateAuthToken();//this is used to generate a token for the user using the generateAuthToken method from the user model

        res.status(201).json({ token, captain});//this is used to send a response back to the client with the token and user data


}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);//this is used to get the validation errors from the request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;//this is used to get the data from the request body 
    
    const captain = await captainModel.findOne({ email }).select('+password');//this is used to find the user in the database using the email address entered by the user and select the password field as well
    //the select('+password') is used to include the password field in the result, as it is excluded by default for security reasons
    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);//this is used to compare the password entered by the user with the hashed password stored in the database
    //the comparePassword method is used to compare the password entered by the user with the hashed password stored in the database
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();//this is used to generate a token for the user using the generateAuthToken method from the user model

    res.cookie('token', token);//this is used to set a cookie with the token in the response 

    res.status(200).json({ token, captain });//this is used to send a response back to the client with the token and user data 
    
    }


    module.exports.getCaptainProfile = async (req, res, next) => {
        
        res.status(200).json({ captain:  req.captain });//this is used to send a response back to the client with the user data
    }

    module.exports.logoutCaptain = async (req, res, next) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];//this is used to get the token from the request cookies or headers

        await blacklistTokenModel.create({ token });//this is used to create a new blacklisted token in the database using the blacklistedTokenModel
        //the create method is used to create a new blacklisted token in the database using the blacklistedTokenModel

        res.clearCookie('token');//this is used to clear the cookie with the name token in the response

        res.status(200).json({ message: 'Logged out successfully' });//this is used to send a response back to the client with the message Logged out successfully
    }