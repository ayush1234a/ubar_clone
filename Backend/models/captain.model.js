const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type : String,
           
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
            
    },//this is used to create a schema for the fullname field of the captain model

    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^|S+@1+I.|S+$/, 'Please enter a valid email'],
        },//this is used to create a schema for the email field of the captain model

    password:{
        type:String,
        required: true,
        select: false,
       
    }, //this is used to create a schema for the password field of the captain model
    
    //this is used to store the socket id of the user and for live tracking

    soketId:{
        type:String,
    },//this is used to store the socket id of the user and for live tracking


   status:{
    type:String,
    enum:  ['active', 'inactive'],
    default: 'inactive',
    },
    //this is used to store the status of the user and for live tracking

    vehicle:{
        color:{
            type:String,
            required:true,
            minlength: [3, 'color must be at least 3 characters long'],
        },

        plate:{
            type:String,
            required:true,
            minlength: [3, 'number must be at least 3 characters long'],
        }, 

        capacity:{
            type:String,
            required:true,
            minlength: [1, 'capacity must be at least 1 '],
        },

        vehicleType:{
            type:String,
            required:true,
            enum: ['car', 'bike', 'auto'],
        },
    },//this is used to create a schema for the vehicle field of the captain model

    location:{
        let:{
            type:Number,
        },
        lng:{
            type:Number,  
        },
        
    },//this is used to store the location of the user and for live tracking

})//this is used to create a schema for the captain model);


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{ expiresIn: '24h' });
    return token;
    }//this is used to generate a token for the user using jwt (JSON Web Token) and sign it with the secret key

    captainSchema.methods.comparePassword = async function(password) {
        return  await bcrypt.compare(password, this.password);
        
    }//this is used to compare the password entered by the user with the hashed password stored in the database

    captainSchema.statics.hashPassword = async function(password) {
        return await bcrypt.hash(password, 10);
        
        }//this is used to hash the password entered by the user before storing it in the database
    

    const captainModel = mongoose.model('captain', captainSchema);//this is used to create a model for the captain schema and export it so that it can be used in other files

    module.exports = captainModel;//this is used to export the captain model so that it can be used in other files
