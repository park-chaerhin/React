import './App.css';
import React,{Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import FixedBottomNavigation from './components/Navigation';
import Diary from './components/Diary';
import Calendar from './components/Calendar';
import List from './components/List';
import Camera from './components/Camera';
import Gallery from './components/gallery';


export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Diary />}></Route>
          <Route path="/Calendar" element={<Calendar />}></Route>
          <Route path="/List" element={<List />}></Route>
          <Route path="/Camera" element={<Camera />}></Route>
          <Route path="/Gallery" element={<Gallery />}></Route>
        </Routes>  

        <FixedBottomNavigation />
      </BrowserRouter>
    );
  }
}