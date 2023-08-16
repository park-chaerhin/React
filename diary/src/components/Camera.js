import * as React from 'react';
import {Component} from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import {oStorage, oPicturesinDB} from '../firebase/index';

import IconButton from '@mui/joy/IconButton';
import CameraIcon from '@mui/icons-material/Camera';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default class Camera extends Component{
    constructor(props){
        super(props);
        this.state = {
            oPictures: [],
            oVideoStream: null,
            bIsWait: false
        };
        this.rVideoRef = React.createRef();
        this.fnCameraCapture = this.fnCameraCapture.bind(this);
    }

    componentDidMount(){
        // Web API 를 통해 카메라 접근 요청
        navigator.mediaDevices.getUserMedia({video:true})
            .then(pVideoStream => {
                // 카메라 영상 스트림 정보 oVideoStream에 저장
                this.setState({oVideoStream: pVideoStream});
                // 카메라 영상 스트림 정보 pVideoStream에 표시
                this.rVideoRef.current.srcObject = pVideoStream;
                this.rVideoRef.current.play();
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentWillUnmount(){
        // 화면 종료하면 재생되는 영상 트랙찾아 종료
        const {oVideoStream} = this.state;
        if(oVideoStream){
            const oTracks = oVideoStream.getTracks();
            oTracks.forEach(pTrack => pTrack.stop());
        }        
    }

    fnCameraCapture(){
        // 이미지 캡쳐
        this.setState({bIsWait: true});
        const {oVideoStream} = this.state;
        if(oVideoStream){
            const oVideoTrack = oVideoStream.getVideoTracks()[0];
            const oCapturedImage = new Window.ImageCapture(oVideoTrack);
            const options = {
                imageHeight: 359,
                imageWidth: 640,
                fillLightMode: 'off'      
            };

            // 캡쳐이미지 파이어베이스DB, 스토리지에 저장
            oCapturedImage.takePhoto(options)
                .then(pImageData => {
                    if(oVideoStream){
                        // 영상정지
                        const oTracks = oVideoStream.getTracks();
                        oTracks.forEach(pTrack => pTrack.stop());
                    }
                        //console.log(`캡쳐: ${pImageData.type}, ${pImageData.size}바이트`);
                    // 저장할 이미지 파일이름으로 사용할 id 준비
                    const nID = new Date().toISOString;
                    // 파이어베이스 스토리지에 저장fire
                    const oImageRef = oStorage.ref('images').child(`pic${nID}`);
                    oImageRef.put(pImageData)
                        .then(snapshot => {
                                //console.log(`업로드: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}% 완료`);
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    // console.log('업로드URL:', downloadURL);
                                    oPicturesinDB.push({
                                        url: downloadURL,
                                        title: '',
                                        info: '',
                                        filename: `pic${nID}`,
                                    })
                                    .then(() => {
                                        //
                                    });
                                });
                        })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(()=>{
                        this.setState({bIsWait: false});
                    });
            });
        }
    }

    render(){
        const {bIsWait} = this.state;

        return(
            <div>
                <div style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
                    {/* clssName 으로 style 추가 ! : video  width=100% */}
                    <video 
                        ref={this.rVideoRef} 
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
                <Fab 
                        sx={{
                            position:'fixed',
                            bottom: '65px', 
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}
                        color="" 
                        aria-label="camera"
                        onClick={this.fnCameraCapture()}
                    >
                    <CameraIcon />
                </Fab>

                {/*
                <IconButton
                    size="md"
                    variant="soft"
                    onClick={this.fnCameraCapture}
                    style={{
                        position: 'absolute',
                        bottom: '65px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '50%'
                    }}
                >
                    <CameraIcon />
                </IconButton>
                */}
            </div>
        )
    }
}