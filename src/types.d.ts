interface Note {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
  content: string;
}

type NoteDict = { [id: string]: Note };