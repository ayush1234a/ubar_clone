const dotenv = require('dotenv');
dotenv.config();//this is used to load environment variables from a .env file into process.env
// this two line should be at the top of the file bcause we are using env variables in this file and it config first
const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());//this is used to enable CORS (Cross-Origin Resource Sharing) for all routes and methods in the application


app.get('/', (req, res) => {
    res.send('Hello World!');
});//it is temporyr for check setp is complit or not it is an route for home page


module.exports = app;