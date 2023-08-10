import * as React from 'react';
import {Component} from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

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
        this.ref = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (event, newValue) => {
        this.setState({ value: newValue});
    }

    componentDidMount(){
        this.ref.current.ownerDocument.body.scrollTop = 0;
    }

    render() {
        const {value} = this.state;

        return (
            <Box ref={this.ref}>
                <Paper
                    sx={{position: 'fixed', bottom: 0, left: 0, right:0}}
                    elevation={3}
                >
                    <BottomNavigation
                        //sx={{ width: 1200 }}
                        value={value}
                        onChange={this.handleChange}
                    >
                        <BottomNavigationAction 
                            label="Calendar" 
                            value="calendar"
                            icon={<CalendarTodayOutlinedIcon />} 
                        />
                        <BottomNavigationAction 
                            label="All" 
                            value="all"
                            icon={<ListOutlinedIcon />} 
                        />
                        <BottomNavigationAction 
                            label="Camera" 
                            value="camera"
                            icon={<CameraAltOutlinedIcon />} 
                        />
                        <BottomNavigationAction 
                            label="Search" 
                            value="search"
                            icon={<SearchOutlinedIcon />} 
                        />
                    </BottomNavigation>
                </Paper>
            </Box>
        );
    };
};