import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import { useRef } from 'react';

export default function Noteitem(props) {
  const {note, fetchNote} = props;
  const {deleteNote} = useContext(noteContext);
  const deleteNotes = (id) => {
    deleteNote(id);
    props.setMessage("Note deleted successfully");
    setTimeout(() => {
      props.setMessage("");
    }, 1500);

  }
 
  return (
    <div className="card col-md-3 m-3">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNotes(note._id)}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {fetchNote(note)}}></i>
        </div>
    </div>
  )
}
