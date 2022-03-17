import { types } from "../../utils-(assets, hooks, helpers...)/types/types";

export const requestReducer = (state=false, action) => {

 switch (action.type) {

      case types.alreadyUsed:
        return {error:'Ese email ya esta registrado'}

      case types.invalidEmail:
        return {error:'Email invalido'}

      case types.userNotFound:
        return {error:'El usuario no esta registrado'}
        
      case types.invalidPassword:
        return {
          error:'Contraseña invalida',
          question:`¿Su email es: ${action.payload} ?`
        }
      case types.nonError:
          return false
 
     default:
         return state;
 }   

}