import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import FetchButton from '../FetchButton/FetchButton';
import VisualizerContext from '../../VisualizerContext';

const Visualizer = () => {
  //   const [fetchClicked, setFetchClicked] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    //fetch data then set
    //create fetch request to queryResp
    setData(
      await fetch('http://localhost:3000/queryResp', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then((res) => res.json())
    );
    return;
  };

  return (
    <>
      {/* <button onClick={() => fetchData()}>
        Fetch queryResp
      </button> */}
      <FetchButton fetchData={fetchData} />
      <TreeDiagram
        // fetchClicked={fetchClicked}
        // setFetchClicked={setFetchClicked}
        data={[data]}
      />
    </>
  );
};

export default Visualizer;
