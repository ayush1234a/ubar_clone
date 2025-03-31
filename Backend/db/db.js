const mongoose = require('mongoose');




function connecToDb() {
    mongoose.connect(process.env.DB_CONNECT,
       
    ).then(() => {
            console.log('Connected to DB'); 
        }).catch(err => console.error(err));//this is used to catch any errors that occur during the connection process
}//this is used to connect to the database using mongoose

module.exports = connecToDb;//this is used to export the function so that it can be used in other files