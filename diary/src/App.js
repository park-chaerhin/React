import './App.css';
import React,{useState, Component} from 'react';

import Calendar from './components/Calendar'
import FixedBottomNavigation from './components/Navigation'
import Diary from './components/Diary'

export default class App extends Component {
  render(){
    return (
      <div className="App">
        <Calendar />
        <Diary />
        <FixedBottomNavigation />
      </div>
    );
  }
}
