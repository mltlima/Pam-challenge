import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

const LOCAL_STORAGE_KEY = "auth-token";
const persistedAuthToken = localStorage.getItem(LOCAL_STORAGE_KEY);

interface Children {
    children: React.ReactNode;
}

export default function AuthProvider(Props: Children) {
    const {children} = Props;
    const [token, setToken] = useState(persistedAuthToken);

    function signIn(token: string) {
        setToken(token);
        localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }

    function signOut() {
        setToken(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    return (
        <AuthContext.Provider value={{token, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}