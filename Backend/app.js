const dotenv = require('dotenv');
dotenv.config();//this is used to load environment variables from a .env file into process.env
// this two line should be at the top of the file bcause we are using env variables in this file and it config first
const express = require('express');
const cors = require('cors');
const app = express();
const cookiePaser = require('cookie-parser');//this is used to import the cookie-parser package for parsing cookies in the request
const connecToDb= require('./db/db');
const userRoutes = require('./routes/user.routes');//this is used to import the user routes from the user.routes.js file
const captainRoutes = require('./routes/captain.routes');//this is used to import the captain routes from the captain.routes.js file

connecToDb();//this is used to connect to the database




app.use(cors());//this is used to enable CORS (Cross-Origin Resource Sharing) for all routes and methods in the application
app.use(express.json());//this is used to parse incoming JSON requests and make the data available in req.body
app.use(express.urlencoded({ extended: true }));//this is used to parse incoming requests with urlencoded payloads and make the data available in req.body
app.use(cookiePaser());//this is used to paese the cookies in the request and make them avialable in req.cookies



app.get('/', (req, res) => {
    res.send('Hello World!');
});//it is temporyr for check setp is complit or not it is an route for home page
app.use( '/users', userRoutes);//this is used to use the user routes for all routes that start with /user

app.use(express.json());
app.use('/captains', captainRoutes);//this is used to use the captain routes for all routes that start with /captain
app.use('/api', require('./routes/captain.routes'));

//console.log("Captain routes loaded!"); // Add this to check
// app.use((req, res, next) => {
//     console.log(`Incoming Request: ${req.method} ${req.url}`);
//     next();
// });


module.exports = app;