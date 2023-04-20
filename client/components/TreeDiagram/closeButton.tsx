import React from 'react';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import './closeButtonStyles.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5794',
    },
  },
});

const CloseButton = () => {
  return (
    <div className='close-button'>
      <ThemeProvider theme={theme}>
        <IconButton color="primary" className='largebutton'>
            <CancelPresentationTwoToneIcon />
        </IconButton>
      </ThemeProvider>
    </div>
  );
};

export default CloseButton;
