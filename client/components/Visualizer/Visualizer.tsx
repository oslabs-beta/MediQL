import React from 'react';
import { useState, useContext } from 'react';
import TreeDiagram from '../TreeDiagram/TreeDiagram';
import FetchButton from '../FetchButton/FetchButton';
// interface Data {
//   name: string | null;
//   children: Data[] | null;
// }
const Visualizer = () => {
  // const [fetchClicked, setFetchClicked] = useState(false);
  // const [data, setData] = useState<Data[] | null>(null);
  const [data, setData] = useState(null);

  
 let fetchData = async () => {
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
      <FetchButton className='fetchbutton' fetchData={fetchData} />
      {data && <TreeDiagram data={[data]} />}
    </>
  );
};

export default Visualizer;
