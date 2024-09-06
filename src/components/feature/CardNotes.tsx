import React from 'react';
import { FaStickyNote } from "react-icons/fa";
import { CardNotesProps } from '../../types/todoTypes';
import Div from '../ui/Div';
import './CardNotes.css';

export default function CardNotes({ todos, setSelectedTodo }: CardNotesProps): React.JSX.Element {
  return (
    <div className="card-notes">
      {todos.length > 0 ? (
        todos.map(todo => (
        <Div 
          key={todo.id} 
          setSelectedTodo={() => setSelectedTodo(todo)} 
          title={<h3><FaStickyNote />&nbsp;{todo.title}</h3>} 
          description={<p>{todo.description}</p>} 
          className="todo-item"
        />
      ))) : (
        <Div 
          description={<p>Pas de notes</p>} 
          className="todo-no-item"
        />
      )}
    </div>
  );
}