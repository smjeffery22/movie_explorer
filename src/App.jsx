import { useState, useEffect } from 'react';
import axios from 'axios';
import PopularList from './components/PopularList';
import './App.scss';

function App() {
  return (
    <div className="App">
      <PopularList />
    </div>
  );
}

export default App;
