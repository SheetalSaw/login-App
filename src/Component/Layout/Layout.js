import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const Layout = (props) => {

   const Header = (props) => {
     return(
        <div>
           <AppBar position="static">
           <Toolbar>
           <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

        </div>
     )
  }

  const footer = (props) => {
    return(
        <div>
          <Toolbar style={{position:"static",
          backgroundColor:"white",
        height:'8vh', color:"white"}}></Toolbar>
        </div>
    )
  }
 

  return (
    <div>
        {Header()}
        <div>
        {props.children}
        </div>
        {footer()}
    </div>
  )
}

export default Layout

