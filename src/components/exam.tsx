import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from "styled-components";

import userApi from "../services/userApi";
import parseJwt from "../utils/parseJwt";
import DenseTable from "./table";

interface ExamInput {
    token: string;
    updatePage: number;
    setUpdatePage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Exam(Props: ExamInput) {
    const { token, updatePage, setUpdatePage } = Props;

    useEffect(() => {
        const {user: {id}} = parseJwt(token);
    }, [updatePage]);
    
    return(
        <>
        </>
    );
}

const SelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

const UserInput = {
    color: "white",
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '.MuiSvgIcon-root ': {
      fill: "white !important",
    }
}