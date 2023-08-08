import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState('calendar');
    const ref = React.useRef(null);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0;
    })

    return (
        <Box ref={ref}>
        <Paper
            sx={{position: 'fixed', bottom: 0, left: 0, right:0}}
            elevation={3}
        >
        <BottomNavigation
            //sx={{ width: 1200 }}
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction 
                label="Calendar" 
                value="calendar"
                icon={<CalendarTodayOutlinedIcon />} 
            />
            <BottomNavigationAction 
                label="Photo" 
                value="photo"
                icon={<InsertPhotoOutlinedIcon />} 
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