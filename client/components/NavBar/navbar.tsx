import React, { useContext } from "react";
import logo from './mediqlLogo.png';
import PortContext from "../../contextStore/port-context";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './navbarStyles.scss';

function Navbar() {
  const { setPort: setGlobalPort } = useContext(PortContext);
  
  const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalPort(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

    return (
        <>
            <nav className='nav'>
                <div className='logoName'>
                    <a href='/'>
                        <img src={logo}/>
                    </a>
                    <h1>MediQL</h1>
                </div>
                <div className='port'>
                    <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
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
                </div>
            </nav>
        </>
    )
}

export default Navbar;