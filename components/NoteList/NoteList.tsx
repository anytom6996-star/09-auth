import Link from 'next/link';

import type { Note } from '@/types/note';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({
  notes,
}: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li
          key={note.id}
          className={css.item}
        >
          <h2>{note.title}</h2>

          <p>{note.content}</p>

          <div className={css.actions}>
            <span className={css.tag}>
              {note.tag}
            </span>

            <Link
              href={`/notes/${note.id}`}
              className={css.link}
            >
              View details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;