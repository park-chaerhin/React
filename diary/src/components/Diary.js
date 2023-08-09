/*
    C -
    R -
    ---------왜 새로고침 해야 바뀌어있는지...
    U
    D
    !! 클릭한 날짜 알아내서 리스트 추가, 리스트 읽어오기 !!
*/

// firebase 연결
import {db} from '../firebase';
import {collection, doc, getDocs, addDoc, deleteDoc, query, orderBy} from '@firebase/firestore';

//import classNames from "classnames/bind";
//import style from "../components/Calendar.css";
//const cx = classNames.bind(style);

import * as React from 'react';
import {Component} from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
// import FormLabel from '@mui/joy/FormLabel';
// import Menu from '@mui/joy/Menu';
// import MenuItem from '@mui/joy/MenuItem';
// import ListItemDecorator from '@mui/joy/ListItemDecorator';

import Chip from '@mui/joy/Chip';

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
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
            query(this.listsCollectionRef, orderBy('time', 'desc'))
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
            }
        );
        this.setState({changed: true})
    };

    // CRUD : Delete
    deleteList = async(id)=>{
        const del = window.confirm('Delete? Really?');
        if(del){
            const listDoc = doc(db, 'lists', id);
            await deleteDoc(listDoc);
            this.setState({changed: true});
        }
    } 

    render(){
        const showList = this.state.lists.map(value=>(
            <div 
                key={value.id}
                className="list"
            >
                <span>{value.time}</span>
                <span>{value.content}</span>
                <IconButton
                    onClick={()=>{this.deleteList(value.id)}}
                >
                    <HighlightOffOutlinedIcon />
                </IconButton>
            </div>
        ))
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
                                <IconButton
                                    variant="plain"
                                    color="neutral"
                                    // onClick={(event) => setAnchorEl(event.currentTarget)}
                                >
                                    <CameraAltOutlinedIcon />
                                </IconButton>
                                <IconButton>
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