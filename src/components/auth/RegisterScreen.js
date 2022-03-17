import React from 'react';
import {Link} from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {startRegisterWithUser, resetReqErrors} from '../../REDUX- Management/actions/auth';


const RegisterScreen = () => {

  const initialValues={
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  }
  const RegisterSchema = Yup.object().shape({
    name:Yup.string()
    .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required"),
      confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')  
  });


  const dispatch = useDispatch();
  const state=useSelector(state=>state);

  const{error}=state.req;
  const {loadingLog}=state.loading; //Indicador de carga

  const removeERR=()=>state.req && state.req !== null && dispatch(resetReqErrors())
    
    
  
  return (
    <>
      <h3 className="auth__title mb-5">Register</h3>

      <Formik 
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={({name, email, password}, {setSubmitting, resetForm})=>{ 
          dispatch(startRegisterWithUser(name, email, password))
          resetForm();
        }}
      >
      
      {({ errors, touched }) => (

        <Form >
          {errors.name && touched.name ? 
            (<div className='errInputMessage'>{errors.name}</div> )
            : 
            null
          }
          <Field type="text" className={`auth__input mb-5 ${errors.name  && 'errInput'}`}autoComplete="off"placeholder="name" name="name" onFocus={removeERR}/>
          

          {errors.email && touched.email ? 
            (<div className='errInputMessage'>{errors.email}</div> ) 
            : 
            null
          }
          <Field type="text" className={`auth__input mb-5 ${errors.email && 'errInput'}`} autoComplete="off"placeholder="email" name="email" onFocus={removeERR}/>

          {errors.password && touched.password ? 
            (<div className='errInputMessage'>{errors.password}</div> ) 
            : 
            null
          }
          <Field type="password" className={`auth__input mb-5 ${errors.password && 'errInput'}`} placeholder="password" name="password"  onFocus={removeERR}/>
          
          {errors.confirmPassword && touched.confirmPassword ? 
            (<div className='errInputMessage'>{errors.confirmPassword}</div> ) 
            :
            null
          }
          {error &&
            <h3 className='alert-warning'>{error}</h3>
          }  
          <Field type="password" className={`auth__input mb-5 ${errors.confirmPassword && 'errInput'}`} placeholder="confirm password" name="confirmPassword"  onFocus={removeERR}/>
          


          <button 
            type="submit"  
            className={`${loadingLog===true ? 'btn-disabled': 'btn-primary'} btn  btn-block mb-5`}
            disabled={loadingLog}
          >Register</button>
         
          <button className="btn btn-primary btn-block mb-5" >Reset</button>

          <Link to="/auth/login" className="links" onClick={removeERR}>Already registered?</Link>

        </Form>
      )}
      </Formik>
  </>
  );
};

export default RegisterScreen;
