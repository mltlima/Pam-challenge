import { Box, Paper, Link, Typography, CircularProgress } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from 'react';

import Header from "../components/header";
import useAuth from "../hooks/useAuth";
import userApi from "../services/userApi";
import Transfer from "../components/transfer";
import Transactions from "../components/transactions";

export default function Dashboard() {
    const { token } = useAuth();
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);
    const [updatePage, setUpdatePage] = useState(0);

    useEffect(() => {
        const {user: {username}} = parseJwt(token);
        setUsername(username);
    }, [token]);

    useEffect(() => {
        const promise = userApi.getBalance(token);
        promise.then((response) => {
            setBalance(response.data.balance);
        });
    }, [updatePage]);

    return(
        <>
            <Header />
            <Container>
                <CentralBox>
                    <TitleDiv>
                        <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                            Welcome back,
                        </Typography>
                        <Typography sx={{ marginBottom: "16px", marginLeft: "25px" }} variant="h4" component={"h1"}>
                            {username}
                        </Typography>
                    </TitleDiv>
                    <ContainerBox>
                        <PaperBox>
                            <Typography sx={{ marginBottom: "16px", color: "white" }} variant="h6" component={"h1"}>
                                Your balance: ${balance}
                            </Typography>
                            <Transfer token={token} updatePage={updatePage} setUpdatePage={setUpdatePage}/>
                        </PaperBox>
                        <PaperBox sx={{overflow: "scroll"}}>
                            <Typography sx={{ marginBottom: "16px", color: "white" }} variant="h6" component={"h1"}>
                                Transactions
                            </Typography>
                            <Transactions token={token} updatePage={updatePage} setUpdatePage={setUpdatePage}/>
                        </PaperBox>
                    </ContainerBox>
                </CentralBox>
            </Container>
        </>
    );
}

//decode user info from jwt token
function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const TitleDiv = styled.div`
    margin: 20px 0px 20px 0px
`

const PaperBox = styled(Paper)({
    width: "500px",
    height: "400px",
    padding: "16px",
    margin: "16px",
    color: "white",
    ["@media (max-width:800px)"]: { 
        width: "300px"
    }
})

const CentralBox = styled(Box)({
    display: "flex",
    width: "80%",
    flexDirection: "column",
})

const ContainerBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
})

const CellBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    ["@media (max-width:800px)"]: { 
        flexDirection: "column",
        width: "300px"
    }
})

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  width: 100vw;
  height: 100vh;
  color: #FFFFFF;
  background: linear-gradient(#0c0b08, #726b94);
  background-size: cover;
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    padding-left: 70px;
    padding-right: 80px;
    width: 45vw;
    height: 100%;
    h3 {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 10px;
      font-weight: 500;
    }
  }
  @media (max-width: 1000px){
    height: 100%;
    .image {
      display: none;
    }
    .text {
      width: 100%;
      padding-left: 20px;
      background: linear-gradient(rgba(0, 0, 0, 1), rgba(34, 113, 179, 0.4), rgba(0, 0, 0, 1));
      background-size: cover;
      div {
        width: 300px;
      }
    }
  }
`