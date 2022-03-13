// functions to crud into local storage
export function upsertNote(note: Note) {
  const notes = getNotes();
  localStorage.setItem("notes", JSON.stringify({ ...notes, [note.id]: note }));
  return note;
}

export function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "{}");
}

export function getNote(id: string) {
  const notes = getNotes();
  return notes[id];
}

export function softDeleteNote(note: Note) {
  const notes = getNotes();
  const updatedNote = { ...notes[note.id], deletedAt: Date.now() };
  localStorage.setItem(
    "notes",
    JSON.stringify({ ...notes, [note.id]: updatedNote })
  );
  return updatedNote;
}
