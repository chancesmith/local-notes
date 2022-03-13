import React, { useEffect } from "react";
import "./App.css";
import { createNote, getAllNotes } from "./api_notes";
import { upsertNote } from "./db_interface";

function App() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  // const [selectedNote, setSelectedNote] = React.useState(null);

  useEffect(() => {
    const notesObj = getAllNotes();
    const notes = Object.keys(notesObj).map((key) => {
      return notesObj[key];
    });
    setNotes(notes);
  }, []);

  function handleAddNote(content: string) {
    const newNote = createNote(content);
    setNotes([...notes, newNote]);
  }

  return (
    <div className="root">
      <h1>Local Notes</h1>
      <button onClick={() => handleAddNote("new")}>Add Note</button>
      <div className="c-notes-list">
        <div className="c-notes-list__item">
          {notes?.map((note) => (
            <div className="c-notes-list__item__title">
              <h2>Note Title</h2>
              {/* show date */}
              <p>{new Date(note.createdAt).toUTCString()}</p>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
