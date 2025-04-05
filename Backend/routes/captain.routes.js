const captaincontroller = require('../controllers/captain.controller');//this is used to import the user controller
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// router.get("/test", (req, res) => {
//         res.send("Captain routes are working!");
//     });


router.post('/register', [
        body('email').isEmail().withMessage('Please enter a valid email address'),//this is used to validate the email address
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),//this is used to validate the first name
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),//this is used to validate the password
        body('vehicle.color').isIn(['red', 'blue', 'green']).withMessage(' Please select a valid color'),//this is used to validate the color
        body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),//this is used to validate the plate number
        body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be at least 1'),//this is used to validate the capacity
        body('vehicle.vehicleType').isIn(['car', 'bike','auto']).withMessage('Please select a valid vehicle type'),//this is used to validate the vehicle type        
],
        captaincontroller.registerCaptain//this is used to call the registerUser function from the user controller
)


 

module.exports = router;