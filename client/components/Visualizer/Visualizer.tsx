import React from "react";
import { useState, useEffect, useContext } from "react";
import TreeDiagram from "../TreeDiagram/TreeDiagram";
import FetchButton from "../FetchButton/FetchButton";
import io from 'socket.io-client';

const socket = io();

const Visualizer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try{
        const fetchedData = await fetch("http://localhost:3000/queryResp", {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
        const jsonData = await fetchedData.json();

        console.log('socket.io jsonData-->', jsonData);
        setData(jsonData);
        socket.emit('data', jsonData);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  });

  //deleted classname from FetchButton
  return (
    <>
      {/* <FetchButton fetchData={fetchData} /> */}
      {data && <TreeDiagram data={[data]} />}
    </>
  );
};

export default Visualizer;
