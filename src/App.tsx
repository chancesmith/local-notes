import React, { ChangeEvent, useEffect, useRef } from "react";
import "./App.css";
import { createNote, getAllNotes, updateNote } from "./api_notes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = React.useState<null | Note>(null);

  function getNotes() {
    const notesObj = getAllNotes();
    const notes = Object.keys(notesObj).map((key) => {
      return notesObj[key];
    });
    return notes;
  }

  // fetch notes
  useEffect(() => {
    const notes = getNotes;
    setNotes(notes);
  }, []);

  // resize textarea
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 100 + "px";
    }
  }, [selectedNote]);

  function handleAddNote(content: string) {
    const newNote = createNote(content);
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    textareaRef.current?.focus();
  }

  function handleSelectNote(noteId: string) {
    const foundNote = notes.find((note) => note.id === noteId);
    const isNoteFound = foundNote !== undefined;
    if (isNoteFound) {
      setSelectedNote(foundNote);
      textareaRef.current?.focus();
    } else {
      setSelectedNote(null);
      alert("Note not found");
    }
  }

  function handleUpdateContent(e: ChangeEvent<HTMLTextAreaElement>) {
    const newContent = e.target.value;

    if (selectedNote) {
      const updatedNote: Note = {
        ...selectedNote,
        content: newContent,
      };
      setSelectedNote(updatedNote);
      updateNote(updatedNote);
    }
  }

  function handleBlurEditNote() {
    const notes = getNotes;
    setNotes(notes);
  }

  return (
    <div className="root">
      <div className="app">
        <div className="c-notes-list">
          <h1>Local Notes</h1>
          <button onClick={() => handleAddNote("")}>+ Add Note</button>
          {notes
            .sort((a, b) => {
              // sort by updatedAt
              return dayjs(b.updatedAt).diff(dayjs(a.updatedAt));
            })
            ?.map((note) => (
              <div
                className={`c-notes-list__item ${
                  selectedNote?.id === note.id
                    ? "c-notes-list__item--active"
                    : ""
                }`}
                onClick={() => handleSelectNote(note.id)}
              >
                <div className={`c-notes-list__item__title`}>
                  <h2>
                    {note.content.length
                      ? note.content.split("\n").slice(0, 1).join(" ")
                      : "New Note"}
                  </h2>
                  <p>
                    {/* created: {dayjs(note.createdAt).format("MM/DD/YY")}{" "} */}
                    {note.updatedAt ? (
                      <span>{dayjs(note.updatedAt).fromNow()}</span>
                    ) : null}
                  </p>

                  <p>
                    {note.content.length
                      ? note.content.split(" ").slice(0, 15).join(" ") + "..."
                      : null}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="c-edit-note">
          {selectedNote ? (
            <>
              <h2>Edit Note</h2>
              {selectedNote.content.length ? (
                <h3>
                  {selectedNote.content.split("\n").slice(0, 1).join(" ")}
                </h3>
              ) : null}
              <textarea
                ref={textareaRef}
                value={selectedNote.content}
                onChange={handleUpdateContent}
                onBlur={handleBlurEditNote}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
