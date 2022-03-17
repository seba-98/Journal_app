import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNotes } from '../../REDUX- Management/actions/notes';
import { useForm } from '../../utils-(assets, hooks, helpers...)/hooks/useForm';
import NotesAppbar from './NotesAppbar';


const NoteScreen = () => {

  const dispatch=useDispatch();

  const {active:note}=useSelector(state=>state.entries);
  const[values, handleInputChange, handleReset] = useForm(note);
  const{title, body, id}=values;
  const activeId= useRef(note.id)

  const [inputFocus]=useState(localStorage.getItem('lastInput' || 'title'));
  const handleFocus=(e)=>{
        e.target.setSelectionRange(e.target.value.length, e.target.value.length)
        localStorage.setItem('lastInput', e.target.name);
  }
  const handleDelete=()=>dispatch(startDeleteNotes(note));
    

  
  useEffect(() =>{
      if(note.id !== activeId.id){
          handleReset(note)
      }
    }, [note.id, handleReset, note])


    useEffect(() =>{
        if(values !== note){
            dispatch(activeNote( values, id));
        } 
    },[values, dispatch, id, note])
    



  return (
    <div className="notes__main-content ">
        <NotesAppbar values={values}/>

        <div className="notes__content">

            <input
                type="text"
                onFocus={handleFocus}
                value={title || ''}
                name="title"
                placeholder="Some awesome title"
                className="notes__title-input"
                onChange={handleInputChange}                
                autoComplete="off"
                autoFocus={inputFocus === 'title' ? true : false }
            />
            <textarea 
                placeholder="what happened today" 
                onFocus={handleFocus}
                value={body}
                name="body"
                style={{direction: 'ltr', unicodeBidi: 'bidi-override'}}
                onChange={handleInputChange}
                className="notes__text-area"
                autoFocus={inputFocus === 'body' ? true : false }
            />
            {
                note.url &&
                <div className="notes__image">
                <img src={note.url} alt="arbol" />
            </div>
            }
            {note.id &&
                <button className="btn btn-danger" onClick={handleDelete}>Delete entry</button>

            }

        
        </div>
    </div>
  );
};

export default NoteScreen;
