import React, { useState } from "react";

import useAlert from "../hooks/useAlert";
import InputField from "./inputField";
import ButtonForm from "./buttom";
import userApi from "../services/userApi";

interface ClassroomInput {
    token: string;
    updatePage: number;
    setUpdatePage: React.Dispatch<React.SetStateAction<number>>;
}
    

export default function Classroom(Props: ClassroomInput) {
    const { token, updatePage, setUpdatePage } = Props;
    const { setAlert } = useAlert();
    const [formsData, setFormsData] = useState({
        teacherId: 0,
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement> ) {
        event.preventDefault();
        setAlert(null);

        if(!formsData?.teacherId) {
            setAlert({ type: "error", text: "All fields are required" });
            return;
        }

        try {
            const { teacherId } = formsData;
            await userApi.createClassroom( token, teacherId );
            setUpdatePage(updatePage + 1);
            setAlert({ type: "success", text: "classroom created" });
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
                    label="TeacherId"
                    name="TeacherId"
                    type="number"
                    value={formsData.teacherId}
                    onChange={handleInputChange}
                />
                <ButtonForm text='Create Classroom' loading={false}/>
            </form> 
        </>
    );
}