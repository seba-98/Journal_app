import { types } from "../../utils-(assets, hooks, helpers...)/types/types"
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    signOut 
} from "firebase/auth";
const auth=getAuth();



//-------------////////// NOT ASYNCS DISPATCHS\\\\\\\\\\\\\\\\\\\\\\\\\--------------------
export const login = (uid, displayName) => (
    {
        type:types.login,
        payload:{
            uid,
            displayName
        }
    }
)
export const logOut= () => (
    {
        type:types.logout
    }
)
const uiStartLoading = () =>(
    {
        type:types.logLoading,
        payload:true
    }
)
const uiFinishLoading = () =>(
    {
        type:types.logFinishLoading,
        payload:false
    }
)
export const resetReqErrors=()=> ( {type:types.nonError})
   



//---------------register WITH EMAIL AND PASSWORD--------------------


export const startRegisterWithUser=(name, email, password) => {

    return (dispatch)=>{
        dispatch(uiStartLoading()) //inicio de carga
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(async ({user})=>{
            await updateProfile(user, {
                displayName: name,
              })
              dispatch(login(user.uid, user.displayName))
              dispatch(uiFinishLoading()) //fin de carga
              dispatch(resetReqErrors());
            })
            .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                dispatch({type:errorCode})
                dispatch(uiFinishLoading())//fin  de carga
          });
    }
}


//---------------LOGIN WITH EMAIL AND PASSWORD--------------------
export const startLogin = (email, password) =>{

    return (dispatch)=>{ 
        
        dispatch(uiStartLoading())
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(uiFinishLoading())
            dispatch(resetReqErrors());
        })
        .catch((error) => {
            const{code}=error;

            console.log(code);


            dispatch({
                type:code,
                payload:email
             })
             dispatch(uiFinishLoading())
        });
    }
}
//---------------LOGOUT--------------------

export const startLogOut = () =>{
    return (dispatch)=>{
        signOut(auth).then(() => {
            dispatch(logOut())
          }).catch((error) => {
            console.log(error);
          });
    }
}



//---------------LOGIN WITH GOOGLE ACCOUNT--------------------
export const startGoogleLogin = () =>{

    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    return(dispatch)=>{ 
        dispatch(uiStartLoading())

        signInWithPopup(auth, provider)
        .then((result)=>{
            const{uid, displayName} = result.user;
            dispatch(login(uid, displayName));
            dispatch(uiFinishLoading())
            dispatch(resetReqErrors());
        })
        .catch((error) => {
            dispatch(uiFinishLoading())
          });
    }
}




  
        
    
