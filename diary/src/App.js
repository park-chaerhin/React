import './App.css';
import React,{Component} from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import Calendar from './components/Calendar'
import FixedBottomNavigation from './components/Navigation'
import Camera from './components/Camera'
import List from './components/List'

export default class App extends Component {
  render(){
    return (
      <div className="App">
        {/* Calendar */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
        </LocalizationProvider>

        <List />

        <Camera />
        
        <FixedBottomNavigation />
      </div>
    );
  }
}