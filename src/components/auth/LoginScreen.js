import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import  '../../firebase/firebaseConfig';
import { startGoogleLogin, startLogin, resetReqErrors } from '../../REDUX- Management/actions/auth';
import { useForm } from '../../utils-(assets, hooks, helpers...)/hooks/useForm';


const LoginScreen = () => {

  const dispatch=useDispatch();

  const state=useSelector(state=>state);
  const {loadingLog}=state.loading; //Indicador de carga


  const [values, handleInputChange, handleReset] = useForm({
    email:'',
    password:'',
  });
  const {email, password}=values;


  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLogin(email, password) );
    handleReset();
  };
  const handleGoogle = () => {
    dispatch( startGoogleLogin())
  };
    
  const removeErr=()=> state.req ? dispatch(resetReqErrors()) : null
    

  return (
    <>
      <h3 className="auth__title mb-5">Login screen</h3>
      <form onSubmit={handleLogin} >
        <input 
          type="text" 
          className='auth__input mb-5'
          autoComplete="off"
          placeholder="email" 
          name="email"
          id="loginEmail"
          onChange={handleInputChange}  
          value={email}
          onFocus={removeErr}
        />

        <input 
          type="password" 
          className='auth__input mb-5' 
          placeholder="password" 
          name="password"
          onChange={handleInputChange}
          value={password}     
          onFocus={removeErr}     
        />
        {state.req ?
        <h3 className='alert-warning'>{state.req.error}<br/>{state.req.question&& state.req.question}</h3>
        :null
        }

        <button 
          type="submit" 
          className={`${loadingLog===true ? 'btn-disabled': 'btn-primary'} btn  btn-block`}
          disabled={loadingLog}
        >
          Login
        </button>

        <div className="auth__social_networks" >
          <p>Login with social networks</p>

          <div className="google-btn mb-5" onClick={handleGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="links" onClick={removeErr}>
          Create new account
        </Link>

      </form>
    </>
  );
};

export default LoginScreen;
