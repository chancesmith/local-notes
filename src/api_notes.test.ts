import {
  createNote,
  getAllNotes,
  storeAllNotes,
  updateNote,
} from "./api_notes";
import { advanceTo, clear } from "jest-date-mock";
import * as db from "./db_interface";

// mock local storage
class LocalStorageMock {
  // set store type
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  length() {
    return Object.keys(this.store).length;
  }
}

// @ts-ignore
global.localStorage = new LocalStorageMock();

describe("notes api", () => {
  beforeEach(() => {
    localStorage.setItem = jest.fn();
    localStorage.getItem = jest.fn();
    localStorage.clear = jest.fn();
    advanceTo(new Date("2022-01-01"));
  });
  afterEach(() => {
    clear();
  });
  it("should save note to db", () => {
    const randomSpy = jest.spyOn(Math, "random").mockImplementation(() => {
      return 0.12345;
    });
    const upsertNoteSpy = jest.spyOn(db, "upsertNote");

    const expectedNote = {
      id: (0.12345).toString(36).substring(2),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      content: "hello",
    };

    const result = createNote("hello");

    expect(result).toEqual(expectedNote);
    expect(upsertNoteSpy).toHaveBeenCalledTimes(1);
    expect(upsertNoteSpy).toHaveBeenCalledWith(expectedNote);
  });
  it("should get all notes", () => {
    const randomSpy = jest.spyOn(Math, "random").mockImplementation(() => {
      return 0.12345;
    });
    const getNotesSpy = jest.spyOn(db, "getNotes");
    const id = (0.12345).toString(36).substring(2);
    const expectedNotes = {
      [id]: {
        id: id,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        content: "hello",
      },
    };
    createNote("hello");
    const result = getAllNotes();
    expect(result).toEqual(expectedNotes);
    expect(getNotesSpy).toHaveBeenCalledTimes(1);
  });
  // it("should store all notes", () => {
  //   const note = {
  //     id: "123",
  //     createdAt: new Date().getTime(),
  //     updatedAt: new Date().getTime(),
  //     content: "hello",
  //   };
  //   const notes = {
  //     [note.id]: note,
  //   };
  //   const storeNotesSpy = jest.spyOn(db, "storeNotes");
  //   const result = storeAllNotes(notes);
  //   expect(storeNotesSpy).toHaveBeenCalledTimes(1);
  //   expect(getAllNotes()).toEqual(notes);
  // });
  it("should update note", () => {
    const note = {
      id: "123",
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      content: "hello",
    };
    const notes = {
      [note.id]: note,
    };
    const updatedNote = { ...note, content: "hello world" };
    const updatedNoteExpected = {
      ...updatedNote,
    };

    storeAllNotes(notes);

    const result = updateNote(updatedNote);
    expect(result).toEqual(updatedNoteExpected);
    expect(getAllNotes()).toStrictEqual({
      ...notes,
      [updatedNote.id]: updatedNote,
    });
  });
});
