interface Note {
  id: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  isFavorite?: boolean;
  deletedAt?: number;
}

type NoteDict = { [id: string]: Note };