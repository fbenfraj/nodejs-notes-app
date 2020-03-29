const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("New note added."));
  } else {
    console.log(chalk.bgRed("Note title taken."));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);
  if (newNotes.length < notes.length) {
    console.log(chalk.bgGreen("Note removed!"));
    saveNotes(newNotes);
  } else {
    console.log(chalk.bgRed("No note found!"));
  }
};

const saveNotes = notes => {
  const notesString = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", notesString);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  console.log(chalk.bgBlue("Your notes: "));
  const notes = loadNotes();
  notes.forEach(note => console.log(note.title));
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => title === note.title);
  note
    ? console.log(chalk.bgBlue(note.title), note.body)
    : console.log(chalk.bgRed("No note found."));
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
