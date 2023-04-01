import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import FetchButton from '../FetchButton/FetchButton';

const Visualizer = () => {
  const [data, setData] = useState(null);

  let fetchData = async () => {
    const fetchedData = await fetch('http://localhost:3000/queryResp', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json());
    console.log('fetchData invoked');
    console.log('fetchData: ', fetchedData);
    await setData(fetchedData);
    return;
  };

  //deleted classname from FetchButton
  return (
    <>
      <FetchButton fetchData={fetchData} />
      {data ? <TreeDiagram data={data} /> : null}
    </>
  );
};

export default Visualizer;
