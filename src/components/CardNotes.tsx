import React from 'react';
import './CardNotes.css';
// import { FaNoteSticky } from "react-icons/fa6";
import { FaStickyNote } from "react-icons/fa";
import { CardNotesProps } from '../types/types';

export default function CardNotes({ todos, setSelectedTodo }: CardNotesProps): React.JSX.Element {
  return (
    <div className="card-notes">
      {todos.length > 0 ? (
        todos.map(todo => (
        <div key={todo.id} className="todo-item"  onClick={() => setSelectedTodo(todo)}>
          <h3><FaStickyNote />&nbsp;{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      ))) : (
        <div className="todo-no-item">
          <p>Pas de notes</p>
        </div>
      )}
    </div>
  );
}