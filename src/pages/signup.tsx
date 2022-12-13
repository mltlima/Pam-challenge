import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";


import useAlert from "../hooks/useAlert";
import userApi from "../services/userApi";
import PasswordInput from "../components/password";
import InputField from "../components/inputField";
import ButtonForm from "../components/buttom";

export default function Signup() {
    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [formsData, setFormsData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault();
        setAlert(null);

        if(!formsData?.username || !formsData?.password || !formsData?.confirmPassword) {
            setAlert({ type: "error", text: "All fields are required" });
            return;
        }

        if(formsData.password !== formsData.confirmPassword) {
            setAlert({ type: "error", text: "Passwords do not match" });
            return;
        }

        //regex verify password
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(!regex.test(formsData.password)) {
            setAlert({ type: "error", text: "Password must contain at least 8 characters, including uppercase, lowercase letters and numbers" });
            return;
        }

        try {
            const { username, password } = formsData;
            const {data: { token }} = await userApi.signUp( { username, password } )
            console.log(token);
            setAlert({ type: "success", text: "User created successfully" });
            navigate("/signin");
        } catch (error: any) {
            if(error.response) {
                setAlert({ type: "error", text: error.response.data.message });
                return;
            }
            console.log(error)
            setAlert({ type: "error", text: "Something went wrong, try again in a few seconds" });
        }

    }

    function handleInputChange(event: { target: HTMLInputElement } ) {
        setFormsData({ ...formsData, [event.target.name]: event.target.value });
    }

    return(
        <Container>
            <div className='image-div'>
                <div className='box'>
                    <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                        PAM
                    </Typography>
                    <Typography sx={{ marginBottom: "16px" }} variant="subtitle1" component={"p"}>
                        A school management system
                    </Typography>
                </div>
            </div>
            <div className='form-div'>
                <Typography variant="h2">Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        name="username"
                        value={formsData.username}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formsData.password}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        label="ConfirmPassword"
                        name="confirmPassword"
                        value={formsData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <ButtonForm text='Sign Up' loading={loading}/>
                </form>
                <Link to='/signin' style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" component={"p"}>Already have an account?</Typography>
                </Link>
            </div>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #28282B;
  .form-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35vw;
    height: 100vh;
    h1 {
      color: white;
      font-size: 50px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    h2 {
      color: white;
      font-size: 30px;
    }
    form {
      padding: 30px 50px;
    }
    p {
      color: white;
    }
  }
  .image-div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75vw;
    height: 100vh;
    background: radial-gradient(circle, rgba(88,69,154,1) 0%, rgba(0,17,37,1) 100%);
    background-image: url('https://images8.alphacoders.com/939/939313.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 200px;
      opacity: 85%;
      border-radius: 10px;
      h1{
        color: white;
        font-size: 50px;
        font-weight: 700;
        padding: 10px;
      }
      p{
        color: white;
        font-size: 20px;
      }
    }
  }
  @media (max-width: 1100px){
    flex-direction: column;
    .form-div{
      width: 100vw;
      background-image: url('https://images8.alphacoders.com/939/939313.jpg');
      background-repeat: no-repeat;
      background-size: contain;
    }
    .image-div{
      display: none;
    }
  }
`