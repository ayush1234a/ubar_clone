const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type : String,
            //required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email:{
        type : String,
        required: true,
        unique: true,
        minlength: [5, 'email must be at least 5 characters long'],
    },
    password:{
        type : String,
        required: true,
        select: false,
    },

    socketId:{
        type : String,
        
    },//this is used to store the socket id of the user and for live tracking

})//this is used to create a schema for the user model

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({__id: this._id}, process.env.JWT_SECRET);
    return token;
}//this is used to generate a token for the user using jwt (JSON Web Token) and sign it with the secret key

userSchema.methods.comparePassword = async function(password) {
    return  await bcrypt.compare(password, this.password);
   
}//this is used to compare the password entered by the user with the hashed password stored in the database

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}//this is used to hash the password entered by the user before storing it in the database

const userModel = mongoose.model('user', userSchema);//this is used to create a model for the user schema and export it so that it can be used in other files

module.exports = userModel;//this is used to export the user model so that it can be used in other files 