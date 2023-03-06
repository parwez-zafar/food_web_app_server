const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserScheema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    c_password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('user', UserScheema);
