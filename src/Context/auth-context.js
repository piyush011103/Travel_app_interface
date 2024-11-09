import { createContext, useContext, useReducer } from "react";
import {authReducer} from "../reducer"

const initialValue = {
    isAuthModalOpen: false,
    username: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessToken: "",
    name: "",
    selectedTab: "login",
}

const AuthContext = createContext(initialValue);



const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialValue);

    return (
        <AuthContext.Provider value={{ ...state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }