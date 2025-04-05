const captainModel = require('../models/captain.model');





module.exports.createCaptain = async ({
    firstname,lastname, email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
};//this is used to create a new captain in the database using the captain model and return it 