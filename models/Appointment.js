const mongoose = require('mongoose');
const { required } = require('yargs');

const AppointmentSchema = mongoose.Schema({
    name: {
        type:   String,
        required:   true
    },
    phone: {
        type:   String,
        required:   true
    },
    problem:    {
        type:   String,
        required:   true
    },
    date_create: {
        type:   Date
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;

