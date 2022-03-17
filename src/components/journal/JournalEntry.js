import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../REDUX- Management/actions/notes';


const JournalEntry = ({id, body='cuerpo del articulo', title='titulo', date, url=''}) => {


  const noteDate = moment(date);
  const dispatch=useDispatch();
  const{active}=useSelector(state=>state.entries);

  const handleNoteActive=()=>dispatch(activeNote({body, title, date, url}, id))

  const setSelectedStyle=()=>active && active.id=== id && 'journal__selected'
    
  return (
      <div className={`journal__entry ${setSelectedStyle()} `} onClick={handleNoteActive}>
        <div 
          className="journal__entry-picture" 
          style={{backgroundImage:`url(${url})`,}}
        ></div>
        <div className="journal__entry-body">
          <p className="journal__entry-title">{title}</p>
          <p className="journal__entry-content">{body}</p>
        </div>

        <div className="journal__entry-date-box">
            <span>{noteDate.format("dddd")}</span>
            <h4>{noteDate.format(" Do")}</h4>
        </div>
        
      </div>
  )
};

export default JournalEntry;
