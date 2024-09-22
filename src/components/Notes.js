import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import Topbar from "./TopBar";

export default function () {
  const [message, setMessage] = useState("");
  const context = useContext(noteContext);
  let { notes, editNote } = context;
  const [enote, setEnote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const fetchNote = (note) => {
    ref.current.click();
    setEnote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };
  const handleChange = (e) => {
    setEnote({ ...enote, [e.target.id]: e.target.value });
  };
  const handleSubmitt = (e) => {
    e.preventDefault();
    console.log("updating the note", enote);
    editNote(enote.id, enote.title, enote.description, enote.tag);
    refClose.current.click();
    setMessage("Note updated successfully");
    setTimeout(() => {
      setMessage("");
    }, 1500);
  };
  const ref = React.useRef(null);
  const refClose = React.useRef(null);

  return (
    <>
      <Topbar message={message} />
      <div className="container my-3">
        <div className="row">
          <Addnote setMessage={setMessage} />
          <h2>Your notes</h2>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
            style={{ display: "none" }}
          ></button>
          {notes.map((note) => {
            return (
              <Noteitem
                note={note}
                key={note._id}
                fetchNote={fetchNote}
                setMessage={setMessage}
              />
            );
          })}

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Update Note
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={refClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="container my-3">
                    <div className="form-group">
                      <label htmlFor="Title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={handleChange}
                        placeholder="Enter title"
                        value={enote.title}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        onChange={handleChange}
                        placeholder="Enter Description"
                        value={enote.description}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="tag">Tags</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tag"
                        onChange={handleChange}
                        placeholder="Enter tag"
                        value={enote.tag}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitt}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
