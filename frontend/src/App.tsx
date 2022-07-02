import React from 'react';
import { Diary } from './Diary';
import { Timeline } from './Timeline';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Calendar } from './Calendar';

function App() {
  return (
    <BrowserRouter>
      <h1>Three good Things</h1>
      <ul>
        <li>
          <Link to="/">Top</Link>
        </li>
        <li>
          <Link to="timeline">タイムライン</Link>
        </li>
        <li>
          <Link to="calendar">カレンダー</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Diary />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
