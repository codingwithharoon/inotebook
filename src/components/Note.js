
import Noteitem from './Notesitem';
import  NoteContext  from '../context/notes/notecontext'; // Correct import path
import { useContext,useEffect,useRef,useState } from 'react';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


export default function Note(){
  let navigate = useNavigate();


const context = useContext(NoteContext);
const {notes,getNotes, updatenote}=context;

  
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    getNotes(token); // Pass the token to fetch user-specific notes
  } else {
    navigate('/login'); // Redirect if user is not logged in
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
const ref = useRef(null)
const refclose = useRef(null)
const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})

const updatenote2 =(currentnote)=>
{
  ref.current.click();
  setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag:currentnote.tag})
}
const handleClick = () => {
  updatenote(note.id, note.etitle, note.edescription, note.etag);
  refclose.current.click();
};

const onChange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <>
    <AddNote/>
<button type="button"  ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update your Notes</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className="my-3">
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required /> 
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
              </div>           
              <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
              </div>   
          </form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update it</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
    {notes.length===0 && "No Notes to display bro :) "}
    {notes.map ((note)=>
{
  return <Noteitem note={note} updatenote2={updatenote2} key={note._id}/>
})

}
    </div>
    </>
  )
}
