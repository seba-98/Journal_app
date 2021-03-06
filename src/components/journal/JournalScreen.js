import React from 'react';
import { useSelector } from 'react-redux';
import NoteScreen from '../notes/NoteScreen';
import NothingSelected from './NothingSelected';
import Sidebar from './Sidebar';

const JournalScreen = () => {


  const {active}=useSelector(state=>state.entries);


  return (
    <div className="journal__main-content">
      <Sidebar />
        {active ?
          <NoteScreen />
        :
        <NothingSelected />  

        }
    </div>
  );
};

export default JournalScreen;
