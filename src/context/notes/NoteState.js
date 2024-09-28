import NoteContext from "./noteContext";
import { useEffect, useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
   const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);
    const fetchNotes = async () => {
        const apiUrl = `${host}/api/notes/fetchnotes`;
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: headers
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
    }
    const addNote = async(title, description, tag = "default") => {

        console.log("Adding note", title, description, tag);
        //lets make an api call
        const apiUrl = `${host}/api/notes/writenotes`;
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setnotes(notes.concat(note));
        
        console.log("Adding note", title, description);
    }

    const editNote = async(id, title, description, tag) => {
        //API call
        const apiUrl = `${host}/api/notes/updatenotes/${id}`;
        console.log(title);
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        };
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setnotes(newNotes);
        console.log("Editing note", id);
    }

    const deleteNote = async (id) => {
        //API call
        const apiUrl = `${host}/api/notes/deletenotes/${id}`;
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        };
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: headers,
        });
        const json = await response.json();
        // console.log(json);

        const newNotes = notes.filter((note) => {return note._id !== id});
        setnotes(newNotes);
        console.log("Deleting note", id);
    }


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )   
}
export default NoteState;