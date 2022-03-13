import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface Note {
  id: string;
  createdAt: string;
  deletedAt: string;
  content: string;
}

function App() {
  return (
    <div className="root">
      <h1>Local Notes</h1>
      <button>Add Note</button>
      <div className="c-notes-list">
        <div className="c-notes-list__item">
          {notes?.map((note) => (
            <div className="c-notes-list__item__title">
              <h2>Note Title</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
