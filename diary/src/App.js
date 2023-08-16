import './App.css';
import React,{Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Calendar from './components/Calendar'
import FixedBottomNavigation from './components/Navigation'
import Camera from './components/Camera'
import List from './components/List'


export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />}></Route>
          <Route path="/List" element={<List />}></Route>
          <Route path="/Camera" element={<Camera />}></Route>
          <Route path="/" element={<Calendar />}></Route>
        </Routes>  

        <FixedBottomNavigation />
      </BrowserRouter>
    );
  }
}