import { Box } from "@mui/system";
import styled from "styled-components";

interface Children {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(Props: Children) {
    const {children, onSubmit} = Props;

    return(
        <FormBox>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </FormBox>
    );
}

const FormBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "55px",
});