import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import FetchButton from '../FetchButton/FetchButton';
import VisualizerContext from '../../VisualizerContext';

const Visualizer = () => {
  //   const [fetchClicked, setFetchClicked] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = () => {
    //fetch data then set 
    setData('harharhar');
    setNum(num + 1);
    return;
  };

  return (
    <>
      {/* <VisualizerContext.Provider
        value={{
          fetchClicked,
          setFetchClicked,
          data,
          setData,
        }}
      > */}
      <button onClick={() => buttonClick()}>
        {/* // fetchClicked={fetchClicked}
        // setFetchClicked={setFetchClicked} */}
        Fetch queryResp
      </button>
      <TreeDiagram
        // fetchClicked={fetchClicked}
        // setFetchClicked={setFetchClicked}
        data={num}
      />
      {/* </VisualizerContext.Provider> */}
    </>
  );
};

export default Visualizer;
