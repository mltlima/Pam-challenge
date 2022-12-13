import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

import useAuth from '../../hooks/useAuth';

type Anchor = 'right';

export default function SwipeableTemporaryDrawer() {
    const navigate = useNavigate();
    const { signOut, token } = useAuth();
    const [state, setState] = React.useState({
        right: false,
    });

    function redirectTo(route: any){
        navigate(`${route}`);
    }

    function logout() {
        signOut();
        navigate("/");
        window.location.reload();
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
        };

    const list = (anchor: Anchor) => (
        <Box
        sx={{ width: 200 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
        <List>
            {[{text:'Home', route:'/dashboard'}].map((item, index) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => redirectTo(item.route)}>
                <ListItemIcon>
                    {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
            <ListItemButton onClick={logout}>
                <ListItemIcon>
                <ExitToAppIcon color='primary'/>
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
            </ListItemButton>
            </ListItem>
        </List>
        </Box>
    );

  return (
    <div>
      <MenuIcon onClick={toggleDrawer('right', true)}></MenuIcon>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
        >
        {list('right')}
      </SwipeableDrawer>
    </div>
  );
}