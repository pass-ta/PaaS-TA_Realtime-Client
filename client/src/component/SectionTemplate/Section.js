import React ,{ useEffect, useRef,useState}from 'react'
import { receiveSubtitleData } from '../../store/action'
import './Section.scss'
import Video from '../VideoTemplate/index'
import {Grid} from 'semantic-ui-react'
import useMedia from '../../useMedia'
import { useDispatch} from 'react-redux'
import {receiveGazeData} from '../../store/action'
import { Notify } from "notiflix";
import socket from 'socket.io-client'
import Subtitle from '../SubTitleTemplate/Subtitle'


function Section(props) {
    
    
    // 초기 video 화면 크기 >> 이후 방 입장인원따라 다르게 해주기
    localStorage.setItem('width',"500px");
    localStorage.setItem('height',"300px");
    const dispatch = useDispatch()

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const language = 'ko-KR';
    let final_transcript = "";
    recognition.continuous = true;
    recognition.interimResults = true;
      
  
 
    
  
 
    
    


    var io = props.io
    const userdata = props.userdata
    
 
    //video audio 상태관리
    // const {video,audio}= useSelector((state)=> ({
    //     video:state.toggleVideoAudio.video,
    //     audio:state.toggleVideoAudio.audio
    // }),(prev,next)=> {
    //     return prev.video ===next.video && prev.audio === next.audio
    // })


 //console.log("Section 비디오 상태:"+video+"\n Section 오디오 상태"+audio)


    const [users,setUsers] = useState([])
    const [subtitle,setSubtitle] = useState()
    let pcs = {}

    var videolocalref = useRef(null)
    var videoremoteref = useRef(null)
    let localStream;
    let len;
    let shareref = useRef(null)
    let captureStream;
  
    // //pcConfig에는 stun turn 서버를 적게되는데 rtc 중계를 끊어지는 걸 대비한
    // // 임시서버이다 https://gist.github.com/yetithefoot/7592580
    var pcConfig = {
        'iceServers':[{
            urls:'stun:stun.l.google.com:19302'
        },
        {
            urls:"turn:numb.viagenie.ca",
            credential:"muazkh",
            username:"webrtc@live.com"
        }
    ]}

    const columnCount = useMedia(
        // Media queries
        ['(min-width: 1024px)', '(min-width: 768px)', '(min-width: 400px)'],
        // Column counts (relates to above media queries by array index)
        [4, 3, 2 , 1],
        // Default column count
        1
    )
    





    let interim_transcript = "init";
  
    //footer부분을 home으로 다 옮기고
    //비디오와 오디오를 props로 section으로 보내주기 !
    
    useEffect(()=> {
        console.log("props 상태"+JSON.stringify( props.setting))
        // STT를 위해서 크롬확인
        if (typeof webkitSpeechRecognition !== 'function') {
            alert('크롬에서만 동작 합니다.');
            return false;
        }

        if(props.setting.video ===false && props.setting.audio ===false) {
            try {
                videolocalref.current.srcObject.getTracks()[0].stop()
                localStream.getTracks()[0].stop()
                videolocalref.current.srcObject = null
                localStream = null
            }catch(err) {
                console.log(err)
            }
          
        }else {
            navigator.mediaDevices.getUserMedia(
                props.setting
             ).then((stream)=> {
                console.log(stream.getTracks())
                
                localStream = stream
                videolocalref.current.srcObject = stream 
                
                io.emit('join room',{
                    'room':userdata.roomname,
                    'email':userdata.useremail,
                    'nickname':userdata.nickname,
                    'roomtype':userdata.roomtype,
                    'roomowner':userdata.roomowner,
                    'audio':props.setting.audio,
                    'video':props.setting.video,
                    'share':false
                })
                
        
 



                // start 
                recognition.start();
                console.log("STT : START")

                

                // result 
                recognition.onresult = (event) => {
                    // Create the interim transcript string locally because we don't want it to persist like final transcript
                    

                    // // Loop through the results from the speech recognition object.
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
                        // console.log(event.results[i])
                        if (event.results[i].isFinal) {
                            final_transcript = event.results[i][0].transcript;
                            // console.log(final_transcript)
                            // io.emit('stt_message',{
                            //     'nickname':userdata.nickname,
                            //     'message':final_transcript
                            // })
                            io.emit('translate_stt_message',{
                                'nickname':userdata.nickname,
                                'message':event.results[i][0].transcript
                            })
                        } else {
                            interim_transcript += event.results[i][0].transcript;
                            io.emit('stt_message',{
                                'nickname':userdata.nickname,
                                'message':event.results[i][0].transcript
                            })
                                
                         
                            
                        }
                    }
                   // document.querySelector("#subtitle") = interim_transcript;
                    //console.log("혜원TAG : ",interim_transcript )
                    //console.log(event.results[event.results.length-1])

                };              
             
                
             }).catch((err)=> {
                 //console.log(err); /* handle the error */
                 //사용자가 웹캠을 가지고 있지 않은경우
                    if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                        alert("캠을 찾을 수 없습니다.")
                    //다른곳에서 웹캠이나 마이크에 엑세스를 이미 하고 있는 경우
                    } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
                        //webcam or mic are already in use 
                        alert("다른 곳에서 마이크 또는 웹캠을 사용중입니다")
                    } else if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
                        //-----------------????-------------------
                        //사용자가 웹캠또는 마이크에 액세스를 거부 한 경우
                    } else if (err.name === "NotAllowedError" || err.name ==="PermissionDeniedError") {
                        //둘다 false로 되어있는 경우
                        alert('카메라 또는 마이크를 탐색할 수 없습니다.')
                    } else if (err.name === "TypeError" || err.name === "TypeError") {
                        //alert대신 custom alert 하는게 나을 것 같다. lotti 라던가
                        alert('비디오와 마이크가 꺼져있습니다')
                        console.log("aa"+localStream)
                        
                    
            
                    } else {
                        //other errors 
                    }
             })
        }
       

    },[props.setting])
    //--------------------------화면 공유-------------------
    //화면 공유 props.otherShareSetting 바뀔시 로직
    useEffect(()=> {
        console.log("share체크"+JSON.stringify(props.otherShareSetting))
        const {share} = props.otherShareSetting
        if (share) {
            startCapture({
                video: {
                  cursor: "always"
                },
                audio: false
              })
            //방 전체 인원에게 share 메세지를 보내준다.
           
        }
    },[props.otherShareSetting])
    
    //실시간 다른 사용자 share 받을 useEffect
    
    //화면 공유 startcaptuer 함수
    // window.addEventListener("message",event=> {
    //     console.log("event+"+JSON.stringify(event))
    //     const streamId = event.data.streamId
    //     console.log("streamid="+streamId)
    //     if(streamId){
    //         io.emit("sharesetting",props.otherShareSetting,streamId)
    //     }else {
    //         //streamId 가져오기 실패
    //     }
    // })
    async function startCapture(displayMediaOptions) {
        const videoElem = document.getElementById("sharevideo")
        try {
            // window.postMessage("message","*")
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
            videoElem.srcObject = captureStream
            recognition.close()
            io.disconnect()
            const SERVERPATH = "https://localhost:4000"
            io = socket.connect(SERVERPATH);
            io.on("connect",()=>{
                console.log(io.id)
                io.emit('join room',{
                    'room':userdata.roomname,
                    'email':userdata.useremail,
                    'nickname':userdata.nickname,
                    'roomtype':userdata.roomtype,
                    'roomowner':userdata.roomowner,
                    'audio':props.setting.audio,
                    'video':props.setting.video,
                    'share':props.otherShareSetting.share
                })
           
 



                // start 
                recognition.start();
                console.log("STT : START")


                // result 
                recognition.onresult = (event) => {
                    // Create the interim transcript string locally because we don't want it to persist like final transcript
                    

                    // // Loop through the results from the speech recognition object.
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
                        // console.log(event.results[i])
                        if (event.results[i].isFinal) {
                            final_transcript = event.results[i][0].transcript;
                            // console.log(final_transcript)
                            io.emit('stt_message',{
                                'nickname':userdata.nickname,
                                'message':final_transcript
                            })
                        } else {
                            interim_transcript += event.results[i][0].transcript;
             
                                
                         
                            
                        }
                    }
                   // document.querySelector("#subtitle") = interim_transcript;
                    //console.log("혜원TAG : ",interim_transcript )
                    //console.log(event.results[event.results.length-1])

                };              
                io.on('all_users',(allUsers,mydata)=> {
                    len = allUsers.length
                    console.log("allUsers :"+JSON.stringify(allUsers))
                    
                    for(let i=0; i<len; i++){
                        console.log("현재 방의 참가자는 :"+allUsers[i].id)
                        console.log('io의 아이디'+io.id)
                     
                        if(mydata.share){
        
                            createPeerConnection(allUsers[i].id,allUsers[i].email,allUsers[i].nickname,allUsers[i].roomowner ,allUsers[i].audio,allUsers[i].video,io,captureStream,mydata.share)
                        }else {
                            createPeerConnection(allUsers[i].id,allUsers[i].email,allUsers[i].nickname,allUsers[i].roomowner ,allUsers[i].audio,allUsers[i].video,io,localStream,mydata.share)
        
                        }
                            
                        
                        let pc = pcs[allUsers[i].id]
                        
                        if(pc){
                            //
                            //                     iceRestart 선택 과목
                            // 활성 연결에서 ICE를 다시 시작하려면 이것을 로 설정하십시오 
                            //true. 이렇게 하면 반환된 제안이 이미 있는 것과 다른 자격 증명을 갖게 됩니다.
                            //그런 다음 반환된 제안을 적용하면 ICE가 다시 시작됩니다. false동일한 자격 
                            //증명을 유지하고 ICE를 다시 시작하지 않도록 지정 합니다. 
                            //기본값은 false 입니다.
                            //re rendering 되더라도 자격증명이 똑같으면 offer이 새로 되지 않는다
                            pc.createOffer({
                                iceRestart : true,
                                offerToReceiveAudio:true,
                                offerToReceiveVideo:true
                            })
                            .then(sdp=> {
                                console.log(sdp)
                                console.log('원격 연결 신청(나 자신):create offer success')
                                pc.setLocalDescription(new RTCSessionDescription(sdp))
                                io.emit('offer',{
                                    sdp:sdp,
                                    offerSendId:io.id,
                                    offerSendEmail:userdata.useremail,
                                    offerSendNickname:userdata.nickname,
                                    offerroomowner:userdata.roomowner,
                                    offerReciveID:allUsers[i].id,
                                    audio:mydata.audio,
                                    video:mydata.video,
                                    share:mydata.share
                                
                                })
                                
                            }).catch(error=> {
                                console.log(error)
                            })
                        }
                    }
                })
                io.on('getOffer',(data)=> {
                    console.log('get offer')
                    createPeerConnection(data.offerSendId,data.offerSendEmail,data.offerSendnickname,data.offerroomowner,data.audio,data.video,io,localStream,data.share)
                    console.log("22222222222"+data.audio+data.video)
                    let pc = pcs[data.offerSendId]
                    if(pc) {
                        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=> {
                            console.log('원격 연결 완료(연결 받기) answer set remote description success')
                            
                            pc.createAnswer({
                                offerToReceiveVideo:true,
                                offerToReceiveAudio:true})
                            .then(sdp=> {
                                console.log('create answer success')
                                pc.setLocalDescription(new RTCSessionDescription(sdp))
                                io.emit('answer',{
                                    sdp:sdp,
                                    answerSendID:io.id,
                                    answerREceiveID:data.offerSendId
        
                                })
                            }).catch(error=> {
                                console.log(error)
                            })
                        })
                    }
                })
                io.on('getAnswer',(data)=> {
                    console.log('get answer')
                    let pc = pcs[data.answerSendID]
                    if(pc) {
                        pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
                    }
                })
                io.on('getCandidate',(data)=> {
                    
                    let pc=  pcs[data.candidateSendID]
                    if(pc) {
                        pc.addIceCandidate(new RTCIceCandidate(data.candidate)).then(()=> {
                            //
                        })
                    }
                })
        
                io.on('user_exit',data=> {
        
                    pcs[data.id].close()
                    delete pcs[data.id]
                    setUsers(oldUsers=>oldUsers.filter(user=> user.id!==data.id))
        
                   
        
                    Notify.failure(`${data.nickname}님이 나갔습니다.`);
                    
                   
                })
                //만약 지금 사용자가 방장이면
                //receiveGazeAlert를 받았다면,
                io.on('receiveGazeAlert',(data)=> {
                    console.log(`receive: ${data.nickname} == ${data.email}이가 부정행위를 ${data.gazeOption.gaze}번 한다!!!`)
                    Notify.warning("부정행위 알림")
                    dispatch(receiveGazeData(data))
                })
                io.on('receive_stt_message',data=> {
                    
                })
                
            })
            console.log("share보내고 io의 id"+io.id)
            
            
        } catch(err) {
            console.log("error:"+err)
        }
    }
    
    // const gotStream = screenStream => {
    //     const videoElem = document.getElementById("sharevideo")
    //     videoElem.srcObject = screenStream
        
    //     console.log("여기까지 오나?")
    //     // shareref.current.srcObject = screenStream
    // }
    // const onFail = err => {
    //     console.log("실패요인"+err)
    // }

    
    //--------------------------------------------------------
    useEffect(()=> {
        
        io.on('all_users',(allUsers,mydata)=> {
            len = allUsers.length
            console.log("allUsers :"+JSON.stringify(allUsers))
            
            for(let i=0; i<len; i++){
                console.log("현재 방의 참가자는 :"+allUsers[i].id)
                console.log('io의 아이디'+io.id)
     
                if(mydata.share){

                    createPeerConnection(allUsers[i].id,allUsers[i].email,allUsers[i].nickname,allUsers[i].roomowner ,allUsers[i].audio,allUsers[i].video,io,captureStream,mydata.share)
                }else {
                    createPeerConnection(allUsers[i].id,allUsers[i].email,allUsers[i].nickname,allUsers[i].roomowner ,allUsers[i].audio,allUsers[i].video,io,localStream,mydata.share)

                }
                    
                
                let pc = pcs[allUsers[i].id]
                
                if(pc){
                    //
                    //                     iceRestart 선택 과목
                    // 활성 연결에서 ICE를 다시 시작하려면 이것을 로 설정하십시오 
                    //true. 이렇게 하면 반환된 제안이 이미 있는 것과 다른 자격 증명을 갖게 됩니다.
                    //그런 다음 반환된 제안을 적용하면 ICE가 다시 시작됩니다. false동일한 자격 
                    //증명을 유지하고 ICE를 다시 시작하지 않도록 지정 합니다. 
                    //기본값은 false 입니다.
                    //re rendering 되더라도 자격증명이 똑같으면 offer이 새로 되지 않는다
                    pc.createOffer({
                        iceRestart : true,
                        offerToReceiveAudio:true,
                        offerToReceiveVideo:true
                    })
                    .then(sdp=> {
                        console.log(sdp)
                        console.log('원격 연결 신청(나 자신):create offer success')
                        pc.setLocalDescription(new RTCSessionDescription(sdp))
                        io.emit('offer',{
                            sdp:sdp,
                            offerSendId:io.id,
                            offerSendEmail:userdata.useremail,
                            offerSendNickname:userdata.nickname,
                            offerroomowner:userdata.roomowner,
                            offerReciveID:allUsers[i].id,
                            audio:mydata.audio,
                            video:mydata.video,
                            share:mydata.share
                        
                        })
                        
                    }).catch(error=> {
                        console.log(error)
                    })
                }
            }
        })
        io.on('getOffer',(data)=> {
            console.log('get offer')
            createPeerConnection(data.offerSendId,data.offerSendEmail,data.offerSendnickname,data.offerroomowner,data.audio,data.video,io,localStream,data.share)
            console.log("22222222222"+data.audio+data.video)
            let pc = pcs[data.offerSendId]
            if(pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=> {
                    console.log('원격 연결 완료(연결 받기) answer set remote description success')
                    
                    pc.createAnswer({
                        offerToReceiveVideo:true,
                        offerToReceiveAudio:true})
                    .then(sdp=> {
                        console.log('create answer success')
                        pc.setLocalDescription(new RTCSessionDescription(sdp))
                        io.emit('answer',{
                            sdp:sdp,
                            answerSendID:io.id,
                            answerREceiveID:data.offerSendId

                        })
                    }).catch(error=> {
                        console.log(error)
                    })
                })
            }
        })
        io.on('getAnswer',(data)=> {
            console.log('get answer')
            let pc = pcs[data.answerSendID]
            if(pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
            }
        })
        io.on('getCandidate',(data)=> {
            
            let pc=  pcs[data.candidateSendID]
            if(pc) {
                pc.addIceCandidate(new RTCIceCandidate(data.candidate)).then(()=> {
                    //
                })
            }
        })

        io.on('user_exit',data=> {

            pcs[data.id].close()
            delete pcs[data.id]
            setUsers(oldUsers=>oldUsers.filter(user=> user.id!==data.id))

           

            Notify.failure(`${data.nickname}님이 나갔습니다.`);
            
           
        })
        //만약 지금 사용자가 방장이면
        //receiveGazeAlert를 받았다면,
        io.on('receiveGazeAlert',(data)=> {
            console.log(`receive: ${data.nickname} == ${data.email}이가 부정행위를 ${data.gazeOption.gaze}번 한다!!!`)
            Notify.warning("부정행위 알림")
            dispatch(receiveGazeData(data))
        })
        io.on('receive_stt_message',data=> {
            dispatch(receiveSubtitleData(data))
        })
        io.on('translate_stt_message',data=> {
            dispatch(receiveSubtitleData(data))
        })
       
       
        
       
        
      
    },[])

 



   


    const createPeerConnection = (socketID, email,nickname,roomowner ,audio,video,newSocket, localStream,share)=> {
        let pc = new RTCPeerConnection(pcConfig);
        
        if (localStream) {
            console.log('localstream add');
            localStream.getTracks().forEach(track => {
              pc.addTrack(track, localStream);
            });
          } else {
            console.log('no local stream');
          }
        // add pc to peerConnections object
        pcs = { ...pcs, [socketID]: pc };
    
        pc.onicecandidate = (e) => {
            console.log(e)
          if (e.candidate) {
           
            newSocket.emit('candidate', {
              candidate: e.candidate,
              candidateSendID: newSocket.id,
              candidateReceiveID: socketID
            });
          }
        }
        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        }
    
        pc.ontrack = (e) => {
          console.log('ontrack success and audio'+audio);
          
          setUsers(oldUsers => oldUsers.filter(user => user.id !== socketID));
          
          setUsers(oldUsers => [...oldUsers, {
            id: socketID,
            email: email,
            nickname:nickname,
            roomowner:roomowner,
            audio:audio,
            video:video,
            stream: e.streams[0],
            share:false
          }]);
          console.log(JSON.stringify(users))
          if(share && props.otherShareSetting.share===false) shareref.current.srcObject = e.streams[0]
         
        }
        
        // return pc
        return pc;
    
      }
    // const gotconnect = ()=> {
    //     try {
           
    //         io.emit('join room',{'room':'1234','email':'sample@naver.com'})
       
    //     }catch(error) {
    //         console.log(error)
    //     }
       
    // }

 

   
    

    return (
        <>
            <div className="SectionContainer" style={{animationName:props.otherPensilsetting.toString()+"3"||"false3"}}>     
                 
                
                {console.log("길이"+users.length)}
                <Grid divided = "vertically">
                    <Grid.Row columns = {columnCount}>
                        <video
                            className="video"
                            id="showvideoid"
                            muted
                            ref={videolocalref}
                        

                            autoPlay>
                        </video>
                        {users.map((user,index)=> {
                            return (
                                <Video
                                    key={index}
                                    email={user.email}
                                    nickname = {user.nickname}
                                    roomowner = {user.roomowner}
                                    audio = {user.audio}
                                    video = {user.video}
                                    stream={user.stream}
                                    share={user.share}
                                />
                        
                            )
                        })}
                    </Grid.Row>
                </Grid>
                        
                <video id="sharevideo" autoPlay ref={shareref}></video>
                <Subtitle otherSubtitleSetting={props.otherGroupsetting}/>

                {/* <a id="subtitles"> {userdata.nickname} {interim_transcript} </a> */}
                   
            </div>
        
                
        </>
    )
}

export default Section