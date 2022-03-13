import { getNotes, upsertNote } from "./db_interface";
export function createNote(content: string) {
  // generate id
  const id = Math.random().toString(36).substring(2);
  const createdAt = new Date().getTime();
  const note = {
    id,
    createdAt,
    content,
  };

  return upsertNote(note);
}

export function getAllNotes() {
  return getNotes();
}
