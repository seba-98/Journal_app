import { types } from "../../utils-(assets, hooks, helpers...)/types/types";

export const loadingReducer=(state=false, action) =>{

    switch (action.type) {
        case types.logLoading:
            return{loadingLog:true}

        case types.logFinishLoading:
            return{loadingLog:false}
            
        default:
            return state;
    }

}