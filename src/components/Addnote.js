import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";

export default function Addnote(props) {
  const context = useContext(noteContext);
  const addNote = context.addNote;
  const alContext = useContext(alertContext);
  const showAlert = alContext.showAlert;
  const [note, setNote] = useState({ title: "", description: "" });
  const handleSubmitt = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: ""});
      showAlert("Note added successfully", "success");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add note</h2>
      <form className="container my-3">
        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            value={note.title}
            className="form-control"
            id="title"
            minLength={3}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={note.description}
            className="form-control"
            id="description"
            minLength={3}
            onChange={handleChange}
            placeholder="Enter Description"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tags</label>
          <input
            type="text"
            value={note.tag}
            className="form-control"
            id="tag"
            minLength={3}
            onChange={handleChange}
            placeholder="Enter Tag"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitt}
          disabled={note.title.length < 3 || note.description.length < 3}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
