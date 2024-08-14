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
    console.log(id);
    
    
    const notes = await getNotes();

    let newArray = notes.filter(note => note.id != id);
    
    console.log(newArray);

    await fs.writeFile(notesPath, JSON.stringify(newArray));
};
// Test
// removeNote(1723624998791);

module.exports = {
    addNote, getNotes, removeNote
}