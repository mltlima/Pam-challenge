import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { ChangeEvent, useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import styled from "styled-components";

interface Props {
    label: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: Props) {
    const {name, label, value, onChange} = props;
    const [showPassword, setShowPassword] = useState(false);
    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <PasswordForm variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                sx={{ marginBottom: "16px" }}
                id={name}
                name={name}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </PasswordForm>
    );
}

const PasswordForm = styled(FormControl)({
    width: '100%',
    input: {
      color: 'white'
    },
    label: {
      color: '#777576'
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary',
      },
    },
  });