/*
    1/
    https://mui.com/joy-ui/react-badge/
    해당 날짜에 리스트 있으면 뱃지!

    2/
    새로고침 눌러야 showlist에 반영됨! -> 수정!
*/
// firebase 연결
import {db} from '../firebase/index';
import {collection, onSnapshot, doc, getDocs, addDoc, deleteDoc, query, orderBy} from '@firebase/firestore';

import * as React from 'react';
import {Component} from 'react';

// 달력
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// 타임라인
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {timelineOppositeContentClasses} from '@mui/lab/TimelineOppositeContent';

// 다이어로그
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';

import Chip from '@mui/joy/Chip';

// 아이콘
import AddIcon from '@mui/icons-material/Add';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SendSharpIcon from '@mui/icons-material/SendSharp';


export default class CustomMonthLayout extends Component {
    constructor(props){
        super(props);
    
        this.state={
            //렌더링 상태 체크
            changed: false,
            //선택한 날짜
            selectedDate: null,

            //input/모달 숨기기
            showFormControl: false,
            showModal: false,

            //추가할 데이터 저장
            newList: '',
            //데이터 저장
            lists: [],

            // 선택한 파일
            selectedFileName: ''
        };
        this.toggleFormControl = this.toggleFormControl.bind(this);
        this.createList = this.createList.bind(this);
        this.toggleModal = this.toggleModal.bind(this); // 모달 토글 함수 추가
        //this.fnSubmitPic = this.fnSubmitPic.bind(this);
    
        // DB 연결 객체 
        this.listsCollectionRef = collection(db, 'lists')
    
        // DB에 입력할 날짜
        this.date = new Date();
        this.now_date = this.date.getFullYear() + ' - ' + (this.date.getMonth()+1) + ' - ' + this.date.getDate();
        this.now_time = this.date.getHours() + ' : ' + this.date.getMinutes();
        
        //file
        this.filedInput = React.createRef();
    }

    // 날짜 값 가져오기
    handleDateChange = (newValue) => {
        this.setState({
            selectedDate : newValue
        });
    }

    // CRUD : Read , firebase 데이터베이스 리스너 설정
    componentDidMount(){
        this.getLists();

        const listsRef = collection(db, 'lists');
        onSnapshot(listsRef, (snapshot) => {
            const lists = [];
            snapshot.forEach((doc)=>{
                const list = doc.data();
                lists.push(list);
            })
            this.setState({lists});
        });
    }
    async getLists(){
        const data = await getDocs(
            query(this.listsCollectionRef, orderBy('timeStamp', 'desc'))
        );
        const lists = data.docs.map(doc => ({...doc.data(), id: doc.id}));
        this.setState({lists, changed: false});
    };

    // 버튼 누르면 textarea 나옴
    toggleFormControl = () => {
        this.setState((prevState) => ({
        showFormControl: !prevState.showFormControl,
        }))
    }

    toggleModal = () => {
        this.setState((prevState)=>({
            showModal: !prevState.showModal
        }));
    };

    // CRUD : Create
    createList = () => {
        addDoc(this.listsCollectionRef,
        {
            //date는 달력에서 선택한 날짜로 설정
            time: this.now_time,
            content: this.state.newList,
            timeStamp: this.date
        }
        );
        this.setState({changed: true})
        this.toggleModal();
    };

    fileInput = React.createRef();

    fileUploadClick = () => {
        const inputElement = document.getElementById('fileUpload');
        if(inputElement){
            inputElement.click();
        }
    };

    render(){
        const {showModal, lists, selectedDate, selectedFile} = this.state;
        // console.log(selectedDate)

        const showList = this.state.lists.map((value) => (
            <Timeline 
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]:{
                        flex: 0.2,
                    },
                    }}
                position="alternate"
                key={value.id}
            >
                <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                        {value.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        {value.content}
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        )).reverse();
    
        return (
            <div>
                {/* 달력 */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar 
                        value={selectedDate}
                        onChange={this.handleDateChange}
                        showDaysOutsideCurrentMonth 
                        fixedWeekNumber={6} />
                </LocalizationProvider>

                {/* 타임라인 리스트 */}
                <div style={{marginBottom: '75px'}}>
                    {showList}
                </div>

                <Box
                    sx={{position:'fixed', bottom:0, left:0, right:0, zIndex:1}}
                >
                    <Fab 
                        sx={{position:'fixed', bottom: 65, right:10}}
                        color="" 
                        aria-label="add"
                        onClick={this.toggleModal}
                    >
                        <AddIcon />
                    </Fab>
                    
                    {/* 리스트추가 */}
                    <Dialog open={this.state.showModal} onClose={this.toggleModal}>
                        <DialogContent>
                            <Textarea
                                placeholder=""
                                minRows={2}
                                value={this.state.selectedFile ? this.state.selectedFile.name : ''}
                                onChange={(e)=>{this.setState({newList: e.target.value})}}
                                startDecorator={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Chip
                                            color="neutral"
                                            disabled={false}
                                            onClick={function(){}}
                                            size="sm"
                                            variant="plain"
                                        > {this.now_date} </Chip>
                                        <Chip
                                            color="neutral"
                                            disabled={false}
                                            onClick={function(){}}
                                            size="sm"
                                            variant="plain"
                                        > {this.now_time} </Chip>
                                    </Box>
                                }
                                endDecorator={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 'var(--Textarea-paddingBlock)',
                                            pt: 'var(--Textarea-paddingBlock)',
                                            borderTop: '1px solid',
                                            borderColor: 'divider',
                                            flex: 'auto',
                                        }}
                                    >
                                    {/* 갤러리버튼 : firebase 저장된 사진 불러오기 */}
                                    <input 
                                        type="file" 
                                        //multiple={true}
                                        ref={this.fileInput}
                                        onChange={this.fileChange}
                                        //id="fileUpload" 
                                        style={{display: "none"}}
                                    />
                                    <IconButton
                                        variant="plain"
                                        color="neutral"
                                        onClick={this.fileUploadClick}
                                    > <CollectionsOutlinedIcon /> </IconButton>        
                                    <IconButton 
                                        sx={{ ml: 'auto' }}
                                        type="submit"
                                        onClick={this.createList}
                                    > <SendSharpIcon /> </IconButton>
                                    </Box>
                                }
                                sx={{
                                    minWidth: 300,
                                    borderRadius: 0,
                                }}
                            >
                                {/* 선택한 파일 미리보기 */}
                                {selectedFile && (
                                    <Box sx={{mt:2}}>
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Selected File Preview"
                                            style={{maxWidth: '100', height:'auto'}}
                                        />
                                    </Box>
                                )}
                            </Textarea>
                        </DialogContent>
                    </Dialog>

                    {/*
                    {this.state.showFormControl && (
                        <FormControl
                            sx={{width:500}}
                        >
                            <Textarea
                                placeholder=""
                                minRows={1}
                                onChange={(e)=>{this.setState({newList: e.target.value})}}
                                startDecorator={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Chip
                                            color="neutral"
                                            disabled={false}
                                            onClick={function(){}}
                                            size="sm"
                                            variant="plain"
                                        > {this.now_date} </Chip>
                                        <Chip
                                            color="neutral"
                                            disabled={false}
                                            onClick={function(){}}
                                            size="sm"
                                            variant="plain"
                                        > {this.now_time} </Chip>
                                    </Box>
                                }
                                endDecorator={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 'var(--Textarea-paddingBlock)',
                                            pt: 'var(--Textarea-paddingBlock)',
                                            borderTop: '1px solid',
                                            borderColor: 'divider',
                                            flex: 'auto',
                                        }}
                                    >
                                    <IconButton
                                        variant="plain"
                                        color="neutral"
                                        // onClick={(event) => setAnchorEl(event.currentTarget)}
                                    > <CollectionsOutlinedIcon /> </IconButton>        
                                    <IconButton 
                                        sx={{ ml: 'auto' }}
                                        type="submit"
                                        onClick={this.createList}
                                    > <SendSharpIcon /> </IconButton>
                                    </Box>
                                }
                                sx={{
                                    minWidth: 300,
                                    borderRadius: 0,
                                }}
                            />
                        </FormControl>
                    )}
                    */}
                </Box>
            </div>
        );
    }
}

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
