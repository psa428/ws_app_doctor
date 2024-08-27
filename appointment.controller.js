const Appointment = require('./models/Appointment');

async function addAppointment(name, phone, problem) {
    let date_create = new Date();
    
    let doc = {name: name, phone: phone, problem: problem, date_create: date_create} ;
    
    await Appointment.create(doc);
   
};


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
    addAppointment, getNotes, removeNote, editNote
}