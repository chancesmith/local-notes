import { createNote, getAllNotes } from "./api_notes";
import { advanceTo, clear } from "jest-date-mock";
import * as db from "./db_interface";

// mock local storage
const localStorageMock = function () {
  let store: any = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
};

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
        content: "hello",
      },
    };
    createNote("hello");
    const result = getAllNotes();
    expect(result).toEqual(expectedNotes);
    expect(getNotesSpy).toHaveBeenCalledTimes(1);
  });
});
