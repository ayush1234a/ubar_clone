const userModel = require('../models/user.model');//this is used to import the user model from the user.model.js file




module.exports.createUser = async ({
    firstname, lastname, email, password
}) => { //this is used to return an object with the result of the function /it is an one type function
    if(! firstname || !email || !password) {
        throw new Error('All fields are required');//this is used to throw an error if any of the fields are empty
    }
    const user = userModel.create ({
        fullname:{
            firstname,
            lastname
            },
            email,
        password
    
        }) 

        return user;
}//this is used to create a function that will be used to create a user
    