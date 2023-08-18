/*
    1/
        캡쳐안됨-firebase 데이터 등록?!
*/
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
            bIsWait: false
        };
        this.oVideoStream = null;
        this.rVideoRef = React.createRef();
        //this.fnCameraCapture = this.fnCameraCapture.bind(this);
    }

    componentDidMount(){
        // Web API 를 통해 카메라 접근 요청
        navigator.mediaDevices
            .getUserMedia({video:true})
            .then((pVideoStream) => {
                // 카메라 영상 스트림 정보 oVideoStream에 저장
                this.oVideoStream = pVideoStream;
                // 카메라 영상 스트림 정보 pVideoStream에 표시
                if(this.rVideoRef.current){
                    this.rVideoRef.current.srcObject = pVideoStream;
                }
                //this.rVideoRef.play();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount(){
        if(this.oVideoStream){
            // 화면 종료하면 재생되는 영상 트랙찾아 종료
            const oTrack = this.oVideoStream.getTracks();
            oTrack.forEach((pTrack) => pTrack.stop());
        }       
    }

    fnCameraCapture = () => {
        this.setState({bIsWait: true});
                
        // 이미지 캡쳐
        const oVideoTrack = this.oVideoStream.getVideoTracks()[0];
        const oCapturedImage = new Window.ImageCapture(oVideoTrack);
        const options = {
            imageHeight: 359,
            imageWidth: 640,
            fillLightMode: 'off'      
        };

        // 캡쳐이미지 파이어베이스DB, 스토리지에 저장
        oCapturedImage
            .takePhoto(options)
            .then((pImageData) => {
                // 영상정지
                const oTrack = this.oVideoStream.getTracks();
                oTrack.forEach((pTrack) => pTrack.stop());
                //console.log(`캡쳐: ${pImageData.type}, ${pImageData.size}바이트`);
                    
                // 저장할 이미지 파일이름으로 사용할 id 준비
                const nID = new Date().toISOString();

                // 파이어베이스 스토리지에 저장
                const uploadTask = oStorage.ref('images').child(`pic${nID}`).put(pImageData);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // state_changed 이벤트로 얼만큼의 바이트가 업로드 중인지 콘솔
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                        console.log(`업로드: ${progress}% 완료`, snapshot.state);
                    },
                    (error) => {
                        // 오류 발생 시 콘솔
                        console.log(error);
                    },  
                    () => {
                        // 업로드 완료 후 DB에 정보 저장
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {                            
                            console.log('업로드URL:', downloadURL);
                            oPicturesinDB.push({
                                url: downloadURL,
                                title: '',
                                info: '',
                                filename: `pic${nID}`,
                            })
                        });
                    }
                )
            });
    }

    render(){
        return(
            <div>
                <video 
                    ref={this.rVideoRef} 
                    style={{
                        width: '100vw', 
                        height: '100vh', 
                        objectFit: 'cover',
                        overFlow: 'hidden'
                    }}
                    autoPlay
                    playsInline
                />
                <Fab 
                    sx={{
                        position:'fixed',
                        bottom: '65px', 
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                    color="" 
                    aria-label="camera"
                    onClick={this.fnCameraCapture.bind(this)}
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
        );
    }
}