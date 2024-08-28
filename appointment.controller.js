const Appointment = require('./models/Appointment');
const User = require('./models/User');

async function addAppointment(name, phone, problem) {
    let date_create = new Date();
    
    let doc = {name: name, phone: phone, problem: problem, date_create: date_create} ;
    
    await Appointment.create(doc);
   
};

async function loginUser(email, password) {
    const user = await User.findOne( { email });
    console.log(`in loginUser user = ${user}`);
    if (!user) {
        throw new Error('Пользователь не найден');
    }
}


async function getNotes() {
    
    const notes = await Note.find();
    
    return notes;
};

async function removeNote(id) {
    await Note.deleteOne({_id: id});
    
    
};

async function editNote(id, title) {
    
    await Note.updateOne({_id:  id}, {title:    title });

};

module.exports = {
    addAppointment, loginUser
}