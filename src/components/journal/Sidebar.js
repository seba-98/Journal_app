import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../../firebase/firebaseConfig';
import { startLogOut } from '../../REDUX- Management/actions/auth';
import { activeNote, notesLogOutCleaning } from '../../REDUX- Management/actions/notes';
import JournalEntries from './JournalEntries';





const Sidebar = () => {
  
  const {name}=useSelector(state=>state.auth);
  
  const dispatch=useDispatch();
  const handleLogout = () =>{  
    dispatch(startLogOut());
    dispatch(notesLogOutCleaning())
  }
  const handleNewEntry = () => dispatch(activeNote());
    


  return( 
    <aside className='journal__main-sidebar '>
        <div className="journal__sidebar-navbar ">
            <h3 className="mt-5">
                <i className="far fa-moon" />
                <span>{name}</span>
            </h3>
            <button className="btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="journal__new-entry" onClick={handleNewEntry}>
            <i className="far fa-calendar-plus fa-5x" />
            <p className="mt-5" onClick={handleNewEntry}>new entry</p>
        </div>

        <JournalEntries />
    </aside>

  )
};

export default Sidebar;
