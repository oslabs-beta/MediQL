import React, { useContext } from "react";
import logo from './mediqlLogo.png';
import PortContext from "../../contextStore/port-context";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import './navbarStyles.scss';

function Navbar({theme}) {
  const { setPort: setGlobalPort } = useContext(PortContext);
  
  // console.log('theme-->', theme)
  
  const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalPort(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
  const boxTheme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgb(255, 255, 255)",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgb(255, 255, 255)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgb(255, 255, 255)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgb(255, 255, 255)",
            },
          },
        },
      },
    },
  });
    
  return (
    <>
      <nav className={`nav ${theme === "dark" ? "dark-theme" : ""}`}>
        <div className='logoName'>
          <a href='/'>
            <img src={logo}/>
          </a>
          <h1>MediQL</h1>
        </div>
        <div className='port'>
          <ThemeProvider theme={boxTheme}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
              noValidate
              autoComplete="off"
              >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="PORT# Required"
                  onChange={handlePortChange}
                />
              </div>
            </Box>
          </ThemeProvider>
        </div>
      </nav>
    </>
  )
}

export default Navbar;