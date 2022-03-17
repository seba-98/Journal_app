import {useState} from 'react';

export const useForm = (initValue={}) => {

    const [values, setValues] = useState(initValue);

    const handleInputChange=({target})=>{
        setValues({
            ...values,
            [target.name]:target.value
        })
    }
    const handleReset=(newState=initValue)=>{
        setValues(newState)
    }

  return [values, handleInputChange, handleReset];
};


