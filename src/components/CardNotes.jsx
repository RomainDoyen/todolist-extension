import './CardNotes.css';
// import { FaNoteSticky } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";

export default function CardNotes() {
  return (
    <div className="card-notes">
        <div className="todo-item">
          <h3><CiStickyNote />&nbsp;Titre de la note</h3>
          <p>Description</p>
        </div>
    </div>
  );
}