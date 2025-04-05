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