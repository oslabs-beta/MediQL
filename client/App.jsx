import React from 'react';
// import { Socket } from 'socket.io-client';
// import TreeDiagram from './components/TreeDiagram/TreeDiagram';
import './components/TreeDiagram/TreeDiagramStyles.scss';
import './components/LogoBar/LogoBarStyles.scss';

import LogoBar from './components/LogoBar/LogoBar';
import Visualizer from './components/Visualizer/Visualizer';

const App = () => {
  return (
    <div>
      <LogoBar />
      <Visualizer />
    </div>
  );
};

export default App;
