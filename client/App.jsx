import React from 'react';
// import { Socket } from 'socket.io-client';
import TreeDiagram from './components/TreeDiagram/TreeDiagram';
import './components/TreeDiagram/TreeDiagramStyles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<TreeDiagram />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
