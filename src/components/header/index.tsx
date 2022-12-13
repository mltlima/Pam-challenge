import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from "../../hooks/useAuth";
import parseJwt from "../../utils/parseJwt";
import SwipeableTemporaryDrawer from "./drawer";

export default function Header(){
    const { token } = useAuth();
    const navigate = useNavigate();
    const [user, setUsername] = useState('');

    useEffect(() => {
        const {user: {username}} = parseJwt(token);
        setUsername(username);
    }, [token]);

    return(
        <HeaderContainer>
        <div className="left"> 
            <h1 onClick={() => navigate('/dashboard')}>PAM</h1>
            <nav>
            <p onClick={() => navigate('/dashboard')}>Home</p>
            </nav>
        </div>
        <div className="right">
            <Avatar className='avatar' alt={user} sx={{width: 50, height: 50}} />
            <SwipeableTemporaryDrawer />
        </div>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #000000;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 80px;
  padding: 30px;
  color: #FFFFFF;
  .left {
    display: flex;
    justify-content: space-between;
    width: 500px;
    h1 {
      font-weight: 700;
      font-size: 40px;
    }
    h1:hover {
      cursor: pointer;
    }
    nav {
      display: flex;
      width: 200px;
      align-items: center;
      justify-content: space-between;
      p:hover{
        cursor: pointer;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px
  }
  @media (max-width: 800px){
    .left{
      nav{
        display: none;
      }
    }
    .right{
      flex-direction: row-reverse;
      .avatar{
        display: none;
      }
    }
  }
`