const userModel =   require('../models/user.model');//this is used to import the user model from the user.model.js file
const bcrypt = require('bcrypt');//this is used to import the bcrypt package for hashing passwords
const   jwt = require('jsonwebtoken');//this is used to import the jsonwebtoken package for generating tokens
const blacklistedTokenModel = require('../models/blacklistToken.model');//this is used to import the blacklisted token model from the blacklistedToken.model.js file
const captainModel = require('../models/captain.model');



module.exports.authUser = async (req, res, next) => {// this is used to export the authUser function
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];//this is used to get the token from the request cookies or headers
    
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });//this is used to send a response back to the client with the message Unauthorized
     }

     const isBlacklisted = await blacklistedTokenModel.findOne({ token: token });//this is used to check if the token is blacklisted 
     if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized' });//this is used to send a response back to the client with the message Unauthorized
     }//this is used to check if the token is blacklisted 

     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//this is used to verify
        const user = await userModel.findById(decoded._id);//this is used to find the user in the database using the id from the decoded token
        req.user = user;//this is used to attach the user object to the request object

        return next();//this is used to call the next middleware function in the stack
     } 
     catch(err){
        return res.status(401).json({ message: 'Unauthorized' });//this is used to send a response back to the client with the message Unauthorized
     }
}

module.exports.authcaptain = async (req, res, next) => {// this is used to export the authUser function
   const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];//this isused to get the token from the request cookies or headers

   
   if(!token){
         return res.status(401).json({ message: 'Unauthorized' });//this is used to send a response back to the client with the message Unauthorized
      }

      const isBlacklisted = await blacklistedTokenModel.findOne({ token: token });//this is used to check if the token is blacklisted 
      if(isBlacklisted){
         return res.status(401).json({ message: 'Unauthorized' });//this is used to send a response back to the client with the message Unauthorized
      }//this is used to check if the token is blacklisted 
 
      try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);//this is used to verify
         const captain = await captainModel.findById(decoded._id);//this is used to find the user in the database using the id from the decoded token
         req.captain = captain;//this is used to attach the user object to the request object
 
         return next();//this is used to call the next middleware function in the stack
      } 
      catch(err){
         return res.status(401).json({ message: 'Unauthorized' });//this is used to send a response back to the client with the message Unauthorized
      }

   }
