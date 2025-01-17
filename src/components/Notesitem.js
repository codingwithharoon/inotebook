import React from 'react'
import  NoteContext  from '../context/notes/notecontext'; // Correct import path
import { useContext } from 'react';

export default function Noteitem (props) {
  const context = useContext(NoteContext);
  const {deletenote}=context;
  const{note,updatenote2} =props;

  return (
    <div className='col-md-3'>
    <div className="card">
    <div className="card-body my-3">
    <div className="d-flex">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote2(note)}}></i>
    </div>
    <h5 className="card-title">  {note.description}</h5>
    <br></br>
  </div>
</div>
</div>
  )
}
