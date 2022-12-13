import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

import AuthProvider from "./contexts/authContext";
import AlertProvider from "./contexts/alertContext";
import Alert from "./components/alert";
//import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
              <AuthProvider>
                <AlertProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Signin />} />
                                <Route path="/signin" element={<Signin />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </BrowserRouter>
                    <Alert />
                </AlertProvider>
              </AuthProvider>
        </ThemeProvider>
    );
  }

const theme = createTheme({
    palette: {
        primary: {main: "#BEBFBE"},
        secondary: { main: "#A4A6A4" },
        background: { default: "#FFFFFF", paper: "#28282B" },
    },
});

export default App;