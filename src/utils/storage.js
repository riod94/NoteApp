const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');

function getNotes() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('@NOTES', (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      let notes = result ? JSON.parse(result) : [];
      notes = notes.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

      resolve(notes);
    });
  });
}

function setNotes(notes) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('@NOTES', JSON.stringify(notes), err => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(notes);
    });
  });
}

async function createNote(
  title = '',
  content = '',
  reminder = false,
  reminderDate = null,
) {
  const notes = await getNotes();
  const id = new Date().getTime();
  const now = new Date();
  const note = await {
    id,
    title,
    content,
    reminder,
    reminderDate: reminder ? reminderDate : null,
    createdAt: now,
    updatedAt: now,
  };
  await notes.push(note);
  await setNotes(notes);
  return note;
}

async function updateNote(
  id,
  title = '',
  content = '',
  reminder = false,
  reminderDate = null,
) {
  const notes = await getNotes();
  const noteExist = await notes.find(note => note.id === id);
  if (await noteExist) {
    noteExist.title = title;
    noteExist.content = content;
    noteExist.reminder = reminder;
    noteExist.reminderDate = reminderDate;
    noteExist.updatedAt = new Date();
    await setNotes(notes);
    return noteExist;
  } else {
    console.error('Note not found');
    return;
  }
}

async function deleteNote(id) {
  const notes = await getNotes();
  const newNotes = await notes.filter(note => note.id !== id);
  return await setNotes(newNotes);
}

export {getNotes, createNote, updateNote, deleteNote};
