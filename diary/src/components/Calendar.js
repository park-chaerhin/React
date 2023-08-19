/*
    1/
        https://mui.com/joy-ui/react-badge/
        해당 날짜에 리스트 있으면 뱃지!
    2/
        새로고침 눌러야 showlist에 반영됨!
    3/
        클릭한 날짜 구해서 해당 날짜에 list 등록
    4/
        firebase에 저장된 사진 불러오기
*/

// https://eunhee-programming.tistory.com/267 참고

// firebase 연결
import {db} from '../firebase/index';
import {collection, onSnapshot, doc, getDocs, addDoc, deleteDoc, query, orderBy} from '@firebase/firestore';

import * as React from 'react';
import {Component} from 'react';

import classNames from "classnames/bind";
//import style from "../components/Calendar.css";

import Button from '@mui/material/Button';

// 타임라인
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {timelineOppositeContentClasses} from '@mui/lab/TimelineOppositeContent';

// 다이어로그
//import Modal from '@mui/joy/Modal';
//import ModalDialog from '@mui/joy/ModalDialog';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

//import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';

import Chip from '@mui/joy/Chip';

// 아이콘
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SendSharpIcon from '@mui/icons-material/SendSharp';

//const cx = classNames.bind(style);

export default class Calendar extends Component {
    constructor(props){
        super(props);
        
        // 오늘 날짜 구하기
        this.today = {
            year : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            day : new Date().getDay()
        };

        this.state = {
            //선택한 날짜
            selectedYear: this.today.year,
            selectedMonth: this.today.month,
            selectedDate: this.today.date,
            selectedDay: this.today.day,

            //렌더링 상태
            changed: false,

            //input/모달 숨기기
            showFormControl: false,
            showModal: false,

            //추가할 데이터 저장
            newList: '',
            //데이터 저장
            lists: [],

            //선택한 파일
            selectedFileName: ''
        };

        this.toggleFormControl = this.toggleFormControl.bind(this);
        this.createList = this.createList.bind(this);
        this.toggleModal = this.toggleModal.bind(this); // 모달 토글 함수 추가

        // DB 연결 객체 
        this.listsCollectionRef = collection(db, 'lists')
    
        // DB에 입력할 날짜
        this.date = new Date();
        this.now_date = this.date.getFullYear() + ' - ' + (this.date.getMonth()+1) + ' - ' + this.date.getDate();
        this.now_time = this.date.getHours() + ' : ' + this.date.getMinutes();
                
        //file
        this.fileInput = React.createRef();
        
        this.week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    }

    ////    달력 만들기     ////
    handleDateClick = (day) => {
        this.setState({
            selectedDate: day
            //selectedDate: new Date(
            //    this.state.selectedYear, 
            //    this.state.selectedMonth - 1, 
            //    day
            //)
        })
    }

    // 선택한 달의 마지막 날짜
    getdateTotalCount = () => {
        const {selectedYear, selectedMonth} =  this.state;
        return new Date(selectedYear, selectedMonth, 0).getDate();
    };

    // 이전 달
    prevMonth = () => {
        const { selectedYear, selectedMonth } = this.state;

        if (selectedYear === 1){
            this.setState({
                selectedMonth: 12,
                selectedYear: selectedYear - 1,
            }); 
        }else {
            this.setState({selectedMonth: selectedMonth - 1 });
        }
    };

    // 다음 달
    nextMonth = () => {
        const { selectedYear, selectedMonth } = this.state;

        if (selectedYear === 1){
            this.setState({
                selectedMonth: 12,
                selectedYear: selectedYear + 1,
            });
            } else {
                this.setState({selectedMonth: selectedMonth + 1 });
            }
    };

    // 연도 고르기
    yearControl = () => {
        const {selectedYear} = this.state;

        let yearArr = [];
        const startYear = this.state.selectedYear - 10;
        const endYear = this.state.selectedYear + 10;
        //const startYear = today.year - 10;
        //const endYear = today.year + 10;

        for (var i = startYear; i < endYear+1; i++){
            yearArr.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return(
            //<select
            //    onChange={this.changeSelectYear}
            //    value={selectedYear}
            //>
            //    {yearArr}
            //</select>
            <span>{selectedYear}</span>
        );
    };

    // 달 고르기
    monthControl = () => {
        const { selectedMonth, selectedYear } = this.state;

        let nextMonth = selectedMonth + 1;
        let nextYear = selectedYear;

        if(nextMonth > 12) {
            nextMonth = 1;
            nextYear += 1;
        };

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return(
            <span>{months[nextMonth - 2]}</span>
        )
    };

    getchangeSelectYear = (e) => { 
        this.setState({ selectedYear: Number(e.target.value) });
    };

    changeSelectMonth = (e) => {
        this.setState({ selectedMonth: Number(e.target.value) });
    };

    // 달력 - 요일
    returnWeek = () => {
        const weekendStyle = {
            color: '#D6879F'
        };

        let weekArr = [];
        this.week.forEach((v)=>{
            weekArr.push(
                <div
                    className = " weekday "
                    style = {v === "SUN" ? weekendStyle : (v === "SAT" ? weekendStyle : null)}
                >
                    {v}
                </div>
            );
        });
        return weekArr;
    };

    // 달력 - 날짜
    returnDay = () => {
        const { selectedYear, selectedMonth } = this.state;
        const dateTotalCount = this.getdateTotalCount();//

        const todayStyle = {
            backgroundColor: '#DCE1F2',
            fontWeight: 'bold',
            color: '#444078'
        };

        const dayArr = [];
        for (const nowDay of this.week) {
            const day = new Date(
                selectedYear, 
                selectedMonth - 1, 
                1
            ).getDay();

            if ( this.week[day] === nowDay ) {
                for ( var i = 0; i < dateTotalCount; i++) {
                    dayArr.push(
                        <div
                            key={i + 1}
                            className = "weekday"
                                // 오늘날짜
                            style = {
                                this.today.year === selectedYear &&
                                this.today.month === selectedMonth &&
                                this.today.date === i + 1
                                    ? todayStyle
                                    : null
                            }
                            // 날짜 클릭 핸들러
                            onClick={() => this.handleDateClick(i +1)}
                        >
                            <Button size='small'>
                                { i + 1 }
                            </Button>
                        </div>
                    );
                }
            } else{
                dayArr.push(
                    <div className="weekday"></div>
                );
            }
        }
        return dayArr;
    };

    // CRUD : Read, firebase 데이터베이스 리스너 설정
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



    render() {
        const {selectedYear, selectedMonth, selectedDate, selectedDay, lists} = this.state;

        const filteredLists = lists.filter((value) => {
            const valueDate = new Date(value.timeStamp.toDate());
            return(
                selectedDate &&
                //Date 객체인지 확인하고, 그 후에 getDate() 호출
                selectedDate instanceof Date &&
                valueDate.getDate() === selectedDate.getDate() &&
                valueDate.getMonth() === selectedDate.getMonth() &&
                valueDate.getFullYear() === selectedDate.getFullYear()
            );
        });

        const showList = filteredLists.map((value) => (
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


        return( 
            <div style={{
                backgroundColor: '#DCE1F2',
                width: '100vw',
                height: '100vh',
                overflowX: 'hidden' // 가로 스크롤 제거
            }}>
                <div>
                    <div className="title" 
                        style={{ 
                            display: "flex", 
                            width: '100vw',
                            padding: '1rem 0',
                            justifyContent: 'center',
                            alignItems: 'center' //세로중앙정렬
                        }}
                    >
                        <Button 
                            variant="text" 
                            onClick={this.prevMonth}
                            style={{
                                fontSize: 'large', 
                                color: '#444078',
                            }}
                        >
                            ◀
                        </Button>
                        <h3
                            style={{
                                fontSize: 'large', 
                                color: '#444078',
                            }}
                        >
                            {this.monthControl()} {' '}
                            {this.yearControl()}
                        </h3>
                        <Button 
                            variant="text" 
                            onClick={this.nextMonth}
                            style={{fontSize: 'large', color: '#444078'}}
                        >
                            ▶
                        </Button>
                    </div>
                    <div
                        style={{
                            backgroundColor: '#fff',
                            margin: '0 2rem',
                            borderRadius: '0.5rem',
                            height: 'max-content',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)', // 요일 칸 수
                                gap: '0.5rem', // 요일 사이 간격
                                textAlign: 'center',
                                justifyContent: 'center',
                                padding: '1rem 0',
                                color: '#787C9C',
                            }}
                        >
                            {this.returnWeek()}
                        </div>
                        <div 
                            className="date" 
                            style={{ 
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                gap: '0.5rem',
                                padding: '1rem',
                                height: '25rem',
                                width: '100%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                        >
                            {this.returnDay()}
                        </div>
                    </div>
                </div>
                <Box
                    sx={{
                        position: 'fixed', 
                        bottom: 0, 
                        left: 0, 
                        right: 0,
                        zIndex: 1
                    }}
                >
                    <Fab
                        sx={{position: 'fixed', bottom: 65, right: 10}}
                        aria-label="add"
                        onClick={this.toggleModal}
                    >
                        <AddIcon />
                    </Fab>

                    <Dialog open={this.state.showModal} onClose={this.toggleModal}>
                        <DialogContent>
                            <Textarea
                                placeholder=""
                                minRows={2}
                                value={this.state.newList}
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
                                    <input 
                                        type="file" 
                                        //multiple={true}
                                        ref={this.fileInput}
                                        onChange={this.fileChange}
                                        id="fileUpload" 
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
                            </Textarea>
                        </DialogContent>
                    </Dialog>
                </Box>
            </div>
        );
    }
}

