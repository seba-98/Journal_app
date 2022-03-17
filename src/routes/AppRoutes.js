import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../REDUX- Management/actions/auth';
import PrivateRoutes from '../components/routesManagement/PrivateRoutes';
import PublicRoutes from '../components/routesManagement/PublicRoutes';
import { startGetNotes } from '../REDUX- Management/actions/notes';
import { useSelector } from 'react-redux';



const AppRoutes = () => {

  const [checking, setChecking] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const dispatch=useDispatch();
  const auth = getAuth();
  const state=useSelector(state=>state);
  const {uid} = state.auth;


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const{uid, displayName}=user;
        dispatch(login(uid, displayName));
        setIsLoggedIn(true);
        setChecking(false);

      } else {
        setChecking(false);
        setIsLoggedIn(false);
      }
    });
    
  }, [auth, dispatch])


  useEffect(() => dispatch(startGetNotes(uid)), [uid, dispatch])
   


  return (
    <>
    {
      !checking ?
      <Switch>
        <PrivateRoutes
        exact
        path='/'
        component={JournalScreen}
        isAuthenticated={isLoggedIn}
        />

        <PublicRoutes
         path="/auth" 
         component={AuthRouter}
         isAuthenticated={isLoggedIn}
         /> 
      </Switch>
      :
      <h3>Loading...</h3>
    }
    </>
  )
};

export default AppRoutes;
