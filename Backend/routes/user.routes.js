const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const usercontroller = require('../controllers/user.controller');//this is used to import the user controller from the user.controller.js file

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),//this is used to validate the email address

    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),//this is used to validate the first name

    // body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),//this is used to validate the last name

    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),//this is used to validate the password
],
usercontroller.registerUser//this is used to call the registerUser function from the user controller

)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),//this is used to validate the email address

    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),//this is used to validate the password
],
    usercontroller.loginUser//this is used to call the loginUser function from the user controller
)// this is used to call the login function from the user controller



module.exports = router;