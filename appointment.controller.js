const Appointment = require('./models/Appointment');
const User = require('./models/User');

async function addAppointment(name, phone, problem) {
    let currentDate = new Date();
    
    let doc = {name: name, phone: phone, problem: problem, date_create: currentDate} ;
    
    await Appointment.create(doc);
   
};

async function loginUser(email, password) {
    const user = await User.findOne( { email });
   
    if (!user) {
        throw new Error('Пользователь не найден');
    }
}


async function getAppointments() {
    
    const appointments = await Appointment.find();
    
    return appointments;
};

async function removeNote(id) {
    await Note.deleteOne({_id: id});
    
    
};

async function editNote(id, title) {
    
    await Note.updateOne({_id:  id}, {title:    title });

};

module.exports = {
    addAppointment, loginUser, getAppointments
}