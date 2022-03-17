import db from "../../firebase/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";


export const loadNotes=async(uid) =>{

    let arr=[];
    const q= query(collection(db, `${uid}/journal/notes`));
    const data= await getDocs(q);


    data.forEach((doc)=>{
        arr=[...arr, {...doc.data(), id:doc.id}]
    });

    return arr;

}