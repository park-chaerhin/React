import './App.css';
import React,{useState} from 'react';

import Calendar from './components/Calendar'
import FixedBottomNavigation from './components/Navigation'
import List from './components/List'

function App() {
  return (
    <div className="App">
      <Calendar />
      <List />
      <FixedBottomNavigation />
    </div>
  );
}

export default App;
