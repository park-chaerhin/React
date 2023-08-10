/*
    https://mui.com/joy-ui/react-badge/
    해당 날짜에 리스트 있으면 뱃지!
*/
import * as React from 'react';
import {Component} from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// export default class CustomMonthLayout extends Component {
//     render(){
//         return (
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
//             </LocalizationProvider>
//         );
//     }
// }

/* 
// 노가다 달력
// https://eunhee-programming.tistory.com/267 참고
import React, {useState, useCallback} from 'react';
import classNames from "classnames/bind";
import style from "../components/Calendar.css";

import Button from '@mui/material/Button';

const cx = classNames.bind(style);

export default function Calendar (){
    // 오늘 날짜 구하기
    const today = {
        year : new Date().getFullYear(),
        month : new Date().getMonth()+1,
        date : new Date().getDate(),
        day : new Date().getDay()
    }

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const [selectedYear, setSelectedYear] = useState(today.year)
    const [selectedMonth, setSelectedMonth] = useState(today.month);
    // const [selectedDate, setSelectedDate] = useState(today.date);
    // const [selectedDay, setSelectedDay] = useState(today.day);

    // 선택한 달의 마지막 날짜
    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

    // 이전 달
    const prevMonth = useCallback(()=>{
        if (selectedYear === 1){
            setSelectedMonth(12);
            setSelectedYear(selectedYear-1);
        } else {
            setSelectedMonth(selectedMonth-1);
        }
    },[selectedMonth])
    // 다음 달
    const nextMonth = useCallback(()=>{
        if (selectedYear === 1){
            setSelectedMonth(12);
            setSelectedYear(selectedYear+1);
        } else {
            setSelectedMonth(selectedMonth+1);
        }
    },[selectedMonth])

    // 연도 고르기
    const yearControl = useCallback(()=>{
        let yearArr = [];
        const startYear = today.year - 10;
        const endYear = today.year + 10;

        for (var i = startYear; i < endYear+1; i++){
            yearArr.push(
                <option key={i} value={i}>{i}년</option>
            )
        }
        return(
            <select
                onChange={changeSelectYear}
                value={selectedYear}
            >{yearArr}</select>
        )
    },[selectedYear]);

    // 달 고르기
    const monthControl = useCallback(()=>{
        let monthArr = [];
        for (var i =0; i < 12; i++){
            monthArr.push(
                <option key={i+1} value={i+1}>{i+1}월</option>
            )
        }
        return(
            <select
                onChange={changeSelectMonth}
                value={selectedMonth}
            >{monthArr}</select>
        )
    },[selectedMonth]);

    const changeSelectYear = function(e){
        setSelectedYear(Number(e.target.value))
    };
    const changeSelectMonth = function(e){
        setSelectedMonth(Number(e.target.value))
    };

    // 달력 - 요일
    const returnWeek = useCallback(()=>{
        let weekArr = [];
        week.forEach((v)=>{
            weekArr.push(
                <div
                    className={cx(
                        {weekday:true},
                        {sunday:v==="일"},
                        {saturday:v==="토"}
                    )}
                >{v}</div>
            );
        });
        return weekArr;
    }, [])

    // 달력 - 날짜
    const returnDay = useCallback(()=>{
        let dayArr = [];
        for (const nowDay of week){
            const day = new Date(selectedYear, selectedMonth-1, 1).getDay();
            if(week[day] === nowDay){
                for(var i=0; i < dateTotalCount; i++){
                    dayArr.push(
                        <div
                            key={i+1}
                            className={cx(
                                // 오늘날짜
                                {today : 
                                    today.year === selectedYear &&
                                    today.month === selectedMonth &&
                                    today.date === i+1
                                },
                                // 전체 날짜 style
                                {weekday : true},
                                // 일요일 style
                                {sunday :
                                    new Date(
                                        selectedYear,
                                        selectedMonth-1,
                                        i+1
                                    ).getDay() === 0,
                                },
                                // 토요일 style
                                {saturday : 
                                    new Date(
                                        selectedYear,
                                        selectedMonth-1,
                                        i+1
                                    ).getDay() === 6,
                                },
                            )}
                        >{i+1}</div>
                    );
                }
            } else{
                dayArr.push(
                    <div className="weekday"></div>
                )
            }
        }
        return dayArr;
    }, [selectedYear, selectedMonth, dateTotalCount]);

    return(
        <div className="container">
            <div className="title">
                <h3>{yearControl()}년 {monthControl()}월</h3>
                <div>
                    <Button variant="text" onClick={prevMonth}> &lt; </Button>
                    <Button variant="text" onClick={nextMonth}> &gt; </Button>
                </div>
            </div>
            <div className="week">{returnWeek()}</div>
            <div className="date">{returnDay()}</div>
        </div>
    );
}
*/
