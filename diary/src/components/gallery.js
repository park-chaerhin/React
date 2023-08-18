/*
    firebase에 저장된 사진 불러와서 띄우기(like 갤러리)
*/
// firebase 연결
import {db} from '../firebase/index';
import {oPicturesinDB} from '../firebase/index'

import * as React from 'react';
import {Component} from 'react';

// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default class Gallery extends Component {
    constructor(props){
        super(props);
        this.state={
            // 사진 데이터 저장 변수
            oPictures: []
        }
    }

    componentDidMount(){
        //firebase 데이터 가져와서 상태 설정
        if(oPicturesinDB){
            oPicturesinDB.on('value', snapshot => {
                console.log(oPicturesinDB)
                const pictures = [];
                snapshot.forEach(childSnapshot => {
                    const key = childSnapshot.key;
                    const data = childSnapshot.val();
                    pictures.push({key, ...data});
                });
                this.setState({oPictures: pictures});
            });    
        }
    }


    render(){
        const {oPictures} = this.state;

        return (
            <div>
                <Grid 
                    container
                    spacing={2}
                >
                    {oPictures.map(item => (
                        <Grid
                            item key={item.key}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={2}
                        >
                            <img 
                                src={item.url} 
                                alt="" 
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    objectFit: 'cover'
                                }} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}