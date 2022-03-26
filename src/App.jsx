import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import PopularList from './components/list/PopularList';
import './App.scss';

function App() {
  return (
    <div className="movie-wrap">
      <Navbar />
      <PopularList />
    </div>
  );
}

export default App;
