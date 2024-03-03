import { SET_USERNAME,SET_PASSWORD } from "./actions";

const initialState={
    username:'',
    password:'',
};

const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_USERNAME:
            return {...state,username:action.payload};
        case SET_PASSWORD:
            return {...state,password:action.payload};
        default:
            return state;
    }
};

export default rootReducer;