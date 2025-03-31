const dotenv = require('dotenv');
dotenv.config();//this is used to load environment variables from a .env file into process.env
// this two line should be at the top of the file bcause we are using env variables in this file and it config first
const express = require('express');
const cors = require('cors');
const app = express();
const connecToDb= require('./db/db');
const userRoutes = require('./routes/user.routes');//this is used to import the user routes from the user.routes.js file


connecToDb();//this is used to connect to the database



app.use(cors());//this is used to enable CORS (Cross-Origin Resource Sharing) for all routes and methods in the application
app.use(express.json());//this is used to parse incoming JSON requests and make the data available in req.body
app.use(express.urlencoded({ extended: true }));//this is used to parse incoming requests with urlencoded payloads and make the data available in req.body



app.get('/', (req, res) => {
    res.send('Hello World!');
});//it is temporyr for check setp is complit or not it is an route for home page
app.use( '/users', userRoutes);//this is used to use the user routes for all routes that start with /user


module.exports = app;