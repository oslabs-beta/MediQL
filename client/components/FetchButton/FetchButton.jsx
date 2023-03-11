import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const FetchButton = ({ fetchData }) => {
  return (
    <Stack direction ="row" spacing={2}>
      <Button variant="contained" size="small" onClick={fetchData}>Fetch /queryResp</Button>
    </Stack>
  );
};
export default FetchButton;
