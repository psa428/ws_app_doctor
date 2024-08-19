const fs = require('fs/promises');
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note);
    

    await fs.writeFile(notesPath, JSON.stringify(notes));
};


async function getNotes() {
    
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
};

async function removeNote(id) {
    
    const notes = await getNotes();

    let newArray = notes.filter(note => note.id != id);
  
    await fs.writeFile(notesPath, JSON.stringify(newArray));
};

async function editNote(id, title) {
    
    const notes = await getNotes();

    let idx = notes.findIndex(note => note.id == id);
    
    if (idx > -1) {
        notes[idx].title = title;
        await fs.writeFile(notesPath, JSON.stringify(notes));
        

    };    

};

module.exports = {
    addNote, getNotes, removeNote, editNote
}