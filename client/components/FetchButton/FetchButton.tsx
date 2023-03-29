import React, { useState, useEffect } from 'react';
// const io = require('socket.io-client');
import * as d3 from 'd3';

// const socket = io('http://localhost:3000/queryResponseReceiver');
// const socket = io();



const FetchButton = ({ fetchData }) => {
  return (
    <div>
      <button onClick={fetchData}>Fetch /queryResp</button>
    </div>
  );
};
export default FetchButton;
