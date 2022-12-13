import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export default function InputField(Props: any) {
  const { label, name, type, value, onChange } = Props;

  return (
    <>
      <UserInput
        sx={{ marginBottom: "16px" }}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        variant="outlined"
      />
    </>
  );
}

const UserInput = styled(TextField)({
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