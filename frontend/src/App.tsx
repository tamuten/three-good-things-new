import React from 'react';
import { Diary } from './Diary';
import { Timeline } from './Timeline';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <h1>Three good Things</h1>

      <Diary />
      <Timeline />

    </BrowserRouter>
  );
}

export default App;
