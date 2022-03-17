import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startSaveImages, startSaveNotes, startNewNote, refreshNotes } from '../../REDUX- Management/actions/notes';
import moment from 'moment';

const NotesAppbar = ({values}) => {

  const dispatch = useDispatch();
  const {active} = useSelector(state=>state.entries);
  const time= moment(values.date);


  const handleSendEntry=()=>  active.id === undefined  ?  dispatch(startNewNote(active))  :  dispatch( startSaveNotes(active))
  const handlePictureUpload=()=>document.querySelector('#fileSelector').click();

  const handleFileChange=(e)=>{
    const file= e.target.files[0];

    file ?
      dispatch(startSaveImages(file))
    :
      console.log('noimage');
  }


  return (
      <div className="notes__appbar">

          <span>{time.format("D/M/YYYY")}</span>

          <input type="file" id="fileSelector" style={{display:'none'}} onChange={handleFileChange}/>

          <div>
            <button className="btn btn-primary" onClick={handlePictureUpload}>
                Picture
            </button>
            <button className="btn btn-primary"
              onClick={handleSendEntry}
            >
                Save
            </button>
          </div>

      </div>
  );
};

export default NotesAppbar;
