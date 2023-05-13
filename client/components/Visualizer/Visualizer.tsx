import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import { io } from 'socket.io-client';

const Visualizer = () => {
  const socket = io();
  const [data, setData] = useState(null);

  socket.on('newDoc', async (doc) => {
    await setData(doc);
  });

  return <>{data ? <TreeDiagram data={data} /> : null}</>;
};

export default Visualizer;
