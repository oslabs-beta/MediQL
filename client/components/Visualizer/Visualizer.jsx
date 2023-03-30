import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import FetchButton from '../FetchButton/FetchButton';

const Visualizer = () => {
  //   const [fetchClicked, setFetchClicked] = useState(false);
  const [queryData, setQueryData] = useState(null);
  const [originData, setOriginData] = useState(null);

  const fetchData = async () => {
    //fetch data then set
    //create fetch request to queryResp
    
    const dataQuery = await fetch('http://localhost:3000/queryResp', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then((res) => {
        return res.json();
      });
      
    const dataOrigin = await fetch('http://localhost:3000/originResp', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then((res) => {
        console.log('ORIGIN DATA PARSING');
        return res.json();
      })
      
    setQueryData(dataQuery);
    setOriginData(dataOrigin);
    return;
  };

  return (
    <>
      <FetchButton fetchData={fetchData} />
      <TreeDiagram queryData={[queryData]} originData = {originData} />
    </>
  );
};

export default Visualizer;
