import { types } from "../../utils-(assets, hooks, helpers...)/types/types";

const initialState = {
    notes:[],
    active:null,
}

export const notesReducer =(state=initialState, action) =>{

    switch (action.type) {


        case types.notesAddNew:
            return{
                notes: [...state.notes, action.payload],
                active:action.payload
            }

        case types.notesActive:
            return {
                ...state,
                active:{
                    ...action.payload
                }
            }
        case types.notesLoad:
            return{
                ...state,
                notes:action.payload
            }
        case types.notesUpdated:
            const notes= state.notes.map((n)=>(n.id === action.payload.id) ? action.payload :n )
            return {notes:notes, active:state.active }

        case types.notesDeleted:
            const arrFiltered= state.notes.filter(note=>note.id !== action.payload && note);
            return{
                ...state,
                active:{},
                notes:arrFiltered
            }

        case types.notesLogoutCleaning:
            return {}    

        default:
            return state
    }

}