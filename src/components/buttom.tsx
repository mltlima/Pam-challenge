import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    loading: boolean,
    text: string
}

function ButtonForm(props: Props){
    const { loading, text } = props;
  return(
    <Button 
      type='submit' 
      variant="contained" 
      fullWidth
      disabled={loading}
      >
      {
        loading ? <CircularProgress color="primary" /> : text
      }
    </Button>
  );
}

export default ButtonForm;