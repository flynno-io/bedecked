import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopContainer from './TopContainer';
import CardsPage from '../../pages/CardsPage'; // Import the cards page

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopContainer />} />
      <Route path="/cards" element={<CardsPage />} />
    </Routes>
  );
}

export default App;
