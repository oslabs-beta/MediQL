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

  let fetchData = async () => {
    const fetchedData = await fetch('http://localhost:3000/queryResp', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json());
    // console.log('fetchData invoked');
    // console.log('fetchData: ', fetchedData);
    await setData(fetchedData);
    return;
  };

  //deleted classname from FetchButton
  return (
    <>
      {/* <FetchButton fetchData={fetchData} /> */}
      {data ? <TreeDiagram data={data} /> : null}
    </>
  );
};

export default Visualizer;
