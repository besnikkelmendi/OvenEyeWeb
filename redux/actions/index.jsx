export const LOGIN_TOKEN = 'LOGIN_TOKEN';
export const LOGOUT = 'LOGOUT';

export function login(auth, userRole){
    return{
        type:LOGIN_TOKEN,
        auth,
        userRole
    }

}

export const logout = () => {
    return {
        type: LOGOUT,
    }
};