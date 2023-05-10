import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import FetchButton from '../FetchButton/FetchButton';
import { io } from "socket.io-client";

const Visualizer = () => {

  const socket = io();
  const [data, setData] = useState(null);

  socket.on("newDoc", async (doc) => {
    // console.log("REACT Received new document:", doc);
    // Do something with the new document
    await setData(doc);
  });

  //deleted classname from FetchButton
  return (
    <>
      {/* <FetchButton fetchData={fetchData} /> */}
      {data ? <TreeDiagram data={data} /> : null}
    </>
  );
};

export default Visualizer;
