import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Room from './pages/Room';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/room" element={<Room />} />
    </Routes>
  );
}

export default App;
