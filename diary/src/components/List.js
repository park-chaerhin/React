/*
    C -
    R -
    ---------왜 새로고침 해야 바뀌어있는지... / timeline같은 디자인 추가
    U
    D
    !! 클릭한 날짜 알아내서 리스트 추가, 리스트 읽어오기 / 리스트 있으면 배지 추가!!
    https://mui.com/material-ui/react-timeline/#api 참고해서 list npm install 해야할게 있나?!?!?!?!?

*/

// firebase 연결
import {db} from '../firebase';
import {collection, doc, getDocs, addDoc, deleteDoc, query, orderBy} from '@firebase/firestore';

import * as React from 'react';
import {Component} from 'react';

/**  MUI  **/
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {timelineOppositeContentClasses} from '@mui/lab/TimelineOppositeContent';

import Chip from '@mui/joy/Chip';

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import SendSharpIcon from '@mui/icons-material/SendSharp';

export default class ExampleTextareaComment extends Component {
    constructor(props){
        super(props);

        // 렌더링 상태 체크, 추가할 데이터 저장, 데이터저장
        this.state = {
            changed: false,
            newList : "",
            lists: []
        };

        // DB 연결 객체 
        this.listsCollectionRef = collection(db, 'lists')

        // DB에 입력할 날짜
        this.date = new Date();
        this.now_date = this.date.getFullYear() + ' - ' + (this.date.getMonth()+1) + ' - ' + this.date.getDate();
        this.now_time = this.date.getHours() + ' : ' + this.date.getMinutes();
    }


    // CRUD : Read
    componentDidMount(){
        this.getLists();
    }
    async getLists(){
        const data = await getDocs(
            query(this.listsCollectionRef, orderBy('timeStamp', 'desc'))
        );
        const lists = data.docs.map(doc => ({...doc.data(), id: doc.id}));
        this.setState({lists, changed: false});
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
    };

    // CRUD : Delete
    // deleteList = async(id)=>{
    //     const del = window.confirm('Delete? Really?');
    //     if(del){
    //         const listDoc = doc(db, 'lists', id);
    //         await deleteDoc(listDoc);
    //         this.setState({changed: true});
    //     }
    // } 

    render(){
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

            /* 메신저디자인~
                <div 
                    key={value.id}
                >
                    <span>{value.time}</span>
                    <span>{value.content}</span>
                    <IconButton
                        onClick={()=>{this.deleteList(value.id)}}
                    >
                        <HighlightOffOutlinedIcon />
                    </IconButton>
                </div>
            */
        )).reverse();

        return (
            <div>
                {showList}

                <FormControl>
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
                                >{this.now_date}</Chip>
                                <Chip
                                    color="neutral"
                                    disabled={false}
                                    onClick={function(){}}
                                    size="sm"
                                    variant="plain"
                                >{this.now_time}</Chip>
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
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    // onClick={(event) => setAnchorEl(event.currentTarget)}
                                >
                                    <CollectionsOutlinedIcon />
                                </IconButton>

                                {/*
                                <IconButton
                                    variant={italic ? 'soft' : 'plain'}
                                    color={italic ? 'primary' : 'neutral'}
                                    aria-pressed={italic}
                                    onClick={() => setItalic((bool) => !bool)}
                                >
                                    <FormatItalic /> 
                                </IconButton>
                                */}

                                <IconButton 
                                    sx={{ ml: 'auto' }}
                                    type="submit"
                                    onClick={this.createList}
                                >
                                    <SendSharpIcon />
                                </IconButton>
                            </Box>
                        }
                        sx={{
                        minWidth: 300,
                        borderRadius: 0,
                        // fontWeight,
                        // fontStyle: italic ? 'italic' : 'initial',
                        }}
                    />
                </FormControl>
            </div>
        );
    }
}