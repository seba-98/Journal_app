
import db from '../../firebase/firebaseConfig';
import { doc, collection, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { types } from '../../utils-(assets, hooks, helpers...)/types/types';
import { loadNotes } from '../../utils-(assets, hooks, helpers...)/helpers/loadNotes';
import Swal from 'sweetalert2'
import { uploadImage } from '../../utils-(assets, hooks, helpers...)/helpers/uploadImage';


export const addNote= (note) =>({
    type:types.notesAddNew,
    payload:note
})
export const activeNote=( note, id)=>({ 
    type:types.notesActive,
    payload:{
        ...note,
        id
    }
})
export const getNotes=(notes)=>({
    type:types.notesLoad,
    payload:notes
})
export const refreshNotes=(id, note)=>({
    type:types.notesUpdated,
    payload:{
        id,
        ...note
    }
})
export const deleteNote=(id)=>({
    type:types.notesDeleted,
    payload:id
})
export const notesLogOutCleaning=()=>({
    type:types.notesLogoutCleaning,
})



export const startGetNotes = (uid)=>{
    return async(dispatch)=>{
       const load=await loadNotes(uid);
       dispatch(getNotes(load));
    }
}

export const startNewNote = (values) =>{

    return async (dispatch, getState)=>{
        const {uid}= getState().auth;

        const newNote={
            ...values,
            date: new Date().getTime()
        }

        delete newNote.id;

        try{
            const docRef=await collection(db, `${uid}/journal/notes`);
            const data=await addDoc(docRef, newNote);
            dispatch(addNote({...newNote, id:data.id}));
        }
        catch(err){
            console.log(err);
        }
    }
}

export const startSaveNotes = ( note )=>{

    return async(dispatch, getState)=>{
        const {uid}=getState().auth

        try{

            if(!note.url || note.url === ''){
                delete note.url
            }
    
            const noteToFirestore= {...note};
            delete noteToFirestore.id;
    
            const docRef= doc(db,`${uid}/journal/notes/${note.id}`);
            await updateDoc(docRef, noteToFirestore);
            dispatch(refreshNotes(note.id, noteToFirestore));
    
            Swal.fire(
                note.title,
                'Saved',
                'success'
              )
            }
        catch(err){
            console.log(err);
        }
    }
}

export const startSaveImages = (file)=>{

    return async(dispatch, getState)=>{
        const{active}=getState().entries;

        Swal.fire({
            title:'Uploading..',
            text:'Please wait..',
            allowOutsideClick:false,
            onBeforeOpen:()=>{
                Swal.showLoading();
            }
        })

        const fileUrl=await uploadImage(file);
        Swal.close();
        dispatch(activeNote({...active, url:fileUrl},active.id))

    }
}

export const startDeleteNotes = (note)=>{

    return async(dispatch, getState)=>{

        const {uid}=getState().auth;
        await deleteDoc(doc(db, `${uid}/journal/notes/${note.id}`));
        dispatch(deleteNote(note.id));
        Swal.fire(
            'Nota '+note.title,
            'Eliminada correctamente',
            'success'
          )

    }

}

