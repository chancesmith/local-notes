import { getNotes, upsertNote, storeNotes } from "./db_interface";
export function createNote(content: string) {
  // generate id
  const id = Math.random().toString(36).substring(2);
  const createdAt = new Date().getTime();
  const updatedAt = createdAt;
  const note = {
    id,
    createdAt,
    updatedAt,
    content,
  };

  return upsertNote(note);
}

export function getAllNotes() {
  return getNotes();
}

export function updateNote(note: Note) {
  const updatedAt = new Date().getTime();
  const updatedNote = { ...note, updatedAt };
  return upsertNote(updatedNote);
}

// for testing
export function storeAllNotes(notes: NoteDict) {
  storeNotes(notes);
}
