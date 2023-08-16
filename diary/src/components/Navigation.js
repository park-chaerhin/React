/*
    main 가려짐
    아이콘 클릭 -> 페이지 전환
*/

import * as React from 'react';
import {Component} from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default class FixedBottomNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'calendar'
        };
        // this.ref = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (event, newValue) => {
        this.setState({ value: newValue});
    }

    // componentDidMount(){
    //     this.ref.current.ownerDocument.body.scrollTop = 0;
    // }

    render() {
        const {value} = this.state;

        return (
            <Paper
                sx={{position: 'fixed', bottom: 0,width: '100%', zIndex:2}}
                elevation={3}
            >
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                >
                    <BottomNavigationAction
                        component={Link}
                        to='/'
                        label="Calendar" 
                        value="calendar"
                        icon={<CalendarTodayOutlinedIcon />} 
                    />
                    <BottomNavigationAction 
                        component={Link}
                        to='/List'
                        label="All" 
                        value="all"
                        icon={<ListOutlinedIcon />} 
                    />
                    <BottomNavigationAction 
                        component={Link}
                        to='/camera'
                        label="Camera" 
                        value="camera"
                        icon={<CameraAltOutlinedIcon />} 
                    />
                    <BottomNavigationAction 
                        component={Link}
                        to='/search'
                        label="Search" 
                        value="search"
                        icon={<SearchOutlinedIcon />} 
                    />
                </BottomNavigation>
            </Paper>
        );
    };
};