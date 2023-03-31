import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './FetchButtonStyles.scss';

const FetchButton = ({ fetchData }) => {
  return (
    <div className='fetchbutton'>
      <Stack direction ="row" spacing={2}>
        <Button variant="contained" size="small" onClick={fetchData}>Fetch /queryResp</Button>
      </Stack>
    </div>
  );
};

export default FetchButton;
