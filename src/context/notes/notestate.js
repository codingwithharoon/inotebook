import React, { useState } from "react";
import Notecontext from "./notecontext";

const Notestate = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:5000"

  const getNotes=async()=>
  {
    try {
      const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token'),
  },
});

if (!response.ok) {
  throw new Error('Network response was not ok.');
}

const result = await response.json();
setNotes(result);
console.log('Success:', result);


    } catch (error) {
      console.error("Error:", error);
    }
  }
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem("token"),
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }
  const deletenote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      console.log( result);
      setNotes(
      notes.filter((note) => { return note._id !== id})
      );
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  const updatenote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token"),
        },
        body: JSON.stringify({title, description, tag})
      });
      const result = await response.json();
      console.log( result);
      getNotes();

      
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <Notecontext.Provider value={{ notes, addNote, updatenote, deletenote,getNotes, }}>
      {props.children}
    </Notecontext.Provider>
  );
};

export default Notestate;
