import { useReducer, createContext } from 'react';

export const AuthContext = createContext({});

const initialState = {
    user: null,
}


function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: {
                    email: action.user.email,
                    isAuth: true,
                },
            }

        case "LOG_OUT":
        return {
            user: null
        }
        default:
            return state;
    }
}


function AuthContextComponent({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);



    return ( 
        <AuthContext.Provider value={{state,  dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
  export default AuthContextComponent