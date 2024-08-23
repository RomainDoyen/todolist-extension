import './CardNotes.css';
// import { FaNoteSticky } from "react-icons/fa6";
import { FaStickyNote } from "react-icons/fa";

export default function CardNotes() {
  return (
    <div className="card-notes">
        <div className="todo-item">
          <h3><FaStickyNote />&nbsp;Titre de la note</h3>
          <p>Description</p>
        </div>
    </div>
  );
}