import React from 'react';
import { useSelector } from 'react-redux';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {

  const state=useSelector(state=>state);
  const {notes}=state.entries;

  return (
    <div className="journal__entries">

        {notes && 
            notes.map((entry)=>{
              return <JournalEntry {...entry} key={entry.id}/>
          })
        }
        
    </div>
  )
};

export default JournalEntries;
