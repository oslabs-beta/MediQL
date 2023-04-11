import React from 'react';

import './App.Styles.scss'
import './components/TreeDiagram/TreeDiagramStyles.scss';
import './components/LogoBar/LogoBarStyles.scss';
import './components/DisplayGraphiql/DisplayGraphiql.scss';

import LogoBar from './components/LogoBar/LogoBar';
import Visualizer from './components/Visualizer/Visualizer';
import DisplayGraphiql from './components/DisplayGraphiql/DisplayGraphiql';

const App = () => {
  return (
    <>
    <LogoBar />
    
    <div className='mainDiv'>
      <DisplayGraphiql />
      <Visualizer />
    </div> 
    </>
    
  );
};

export default App;
