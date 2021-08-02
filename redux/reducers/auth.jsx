import { LOGIN_TOKEN,LOGOUT } from "../actions/index.jsx"


export const auth=(state = null,action)=>{
    switch(action.type){
        case LOGIN_TOKEN:
            if(action.auth!==undefined){
                console.log("Login")
                return action.auth;
            }
            return null;
        case LOGOUT:
            console.log("Logout")
            return "";    
            
        default:
            return state;
    }
};

export const userRole=(state = null,action)=>{
    switch(action.type){
        case LOGIN_TOKEN:
            if(action.auth!==undefined){
                console.log("Login")
                return action.userRole;
            }
            return null;
        case LOGOUT:
            console.log("Logout")
            return "";    
            
        default:
            return state;
    }
};