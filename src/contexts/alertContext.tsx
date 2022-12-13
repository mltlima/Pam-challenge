import { createContext, useState } from "react";

export const AlertContext = createContext<any>(null);

interface Children {
    children: React.ReactNode;
}

export default function AlertProvider(Props: Children) {
    const {children} = Props;
    const [alert, setAlert] = useState(null);

    function handleClose() {
        setAlert(null);
    }

    return (
        <AlertContext.Provider value={{alert, setAlert, handleClose}}>
            {children}
        </AlertContext.Provider>
    );
}