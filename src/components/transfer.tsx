import React, { useState } from "react";

import useAlert from "../hooks/useAlert";
import InputField from "./inputField";
import ButtonForm from "./buttom";
import userApi from "../services/userApi";

interface TransferInput {
    token: string;
    updatePage: number;
    setUpdatePage: React.Dispatch<React.SetStateAction<number>>;
}
    

export default function Transfer(Props: TransferInput) {
    const { token, updatePage, setUpdatePage } = Props;
    const { setAlert } = useAlert();
    const [formsData, setFormsData] = useState({
        toUser: "",
        amount: 0,
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault();
        setAlert(null);

        if(!formsData?.toUser || !formsData?.amount) {
            setAlert({ type: "error", text: "All fields are required" });
            return;
        }

        try {
            const { toUser, amount } = formsData;
            await userApi.transfer( token, { toUser, amount } );
            setUpdatePage(updatePage + 1);
            setAlert({ type: "success", text: "Transfer successful" });
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formsData.amount}
                    onChange={handleInputChange}
                />
                <InputField
                    label="To User"
                    name="toUser"
                    type="text"
                    value={formsData.toUser}
                    onChange={handleInputChange}
                />
                <ButtonForm text='Transfer' loading={false}/>
            </form> 
        </>
    );
}