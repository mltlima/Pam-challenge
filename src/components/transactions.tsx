import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from "styled-components";

import userApi from "../services/userApi";
import parseJwt from "../utils/parseJwt";
import DenseTable from "../components/table";

interface TransferInput {
    token: string;
    updatePage: number;
    setUpdatePage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Transactions(Props: TransferInput) {
    const { token, updatePage, setUpdatePage } = Props;
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('all');
    const [orderDate, setOrderDate] = useState('asc');
    const [id, setId] = useState(0);
    let temp = "asc";

    useEffect(() => {
        const promise = userApi.getTransactions(token);
        promise.then((response) => {
            setTransactions(response.data);
        });
        const {user: {id}} = parseJwt(token);
        setId(id);
    }, [updatePage]);
    
    useEffect(() => {
        if (orderDate !== temp) {
            setTransactions(transactions.reverse());
            temp === "asc" ? temp = "desc" : temp = "asc";
        }
    }, [orderDate]);
    
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handleDateChange = (event: SelectChangeEvent) => {
        setOrderDate(event.target.value as string);
    };


    return(
        <>  
            <SelectionContainer>
                <Box sx={{ minWidth: "50%" }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Type of transaction</InputLabel>
                        <Select
                        sx={UserInput}
                        id="transction-type"
                        value={type}
                        label="Type of transaction"
                        onChange={handleChange}
                        >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"cash-in"}>Cash-in</MenuItem>
                        <MenuItem value={"cash-out"}>Cash-out</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: "50%" }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Order date</InputLabel>
                        <Select
                        sx={UserInput}
                        id="transction-type"
                        value={orderDate}
                        label="Order date"
                        onChange={handleDateChange}
                        >
                        <MenuItem value={"asc"}>Ascendent</MenuItem>
                        <MenuItem value={"desc"}>Descendent</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </SelectionContainer>
            {type === "cash-in" ? 
                <DenseTable transactions={transactions.filter((transaction: any) => transaction.creditedAccountId === id)} />
            : type === "cash-out" ?
                <DenseTable transactions={transactions.filter((transaction: any) => transaction.debitedAccountId === id)} />
            : <DenseTable transactions={transactions} /> }
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