import React from 'react';
// import { Socket } from 'socket.io-client';
// import TreeDiagram from './components/TreeDiagram/TreeDiagram';
import './components/TreeDiagram/TreeDiagramStyles.scss';
import './components/LogoBar/LogoBarStyles.scss';
import './components/DisplayGraphiql/DisplayGraphiql.scss'

import LogoBar from './components/LogoBar/LogoBar';
import Visualizer from './components/Visualizer/Visualizer';
import DisplayGraphiql from './components/DisplayGraphiql/DisplayGraphiql';

const App = () => {
  return (
    <div>
      <LogoBar />
      <Visualizer />
      <DisplayGraphiql/>
    </div>
  );
};

export default App;
