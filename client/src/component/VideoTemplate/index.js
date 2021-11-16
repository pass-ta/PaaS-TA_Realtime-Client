import React, { useEffect, useRef } from 'react';
import Styled from 'styled-components';
import './index.scss'
import {GiChessKing} from 'react-icons/gi'
const Container = Styled.div`
    position: relative;
    display: inline-block;
    
    margin: 5px;
`;





function Video({email, nickname,stream, roomowner,audio,video,share}) {
    const ref = useRef(null);
 
    console.log(typeof audio)
    console.log(!audio)
    useEffect(() => {
        console.log("audio와 video "+audio +" , "+video)
        if (ref.current) ref.current.srcObject = stream;
        if(audio===false) {
            
            

        }else {
            ref.current.srcObject = stream;
        }
        if(video===false) {
            ref.current.srcObject = null
        }else {
            ref.current.srcObject = stream;
        }
        console.log(share)

    },[])
    
    return (
        <Container id="aa">
            {console.log("마지막 오디오 체크"+audio)}
            <video
                style={{width:"100%" ,height:"100%",
                    backgroundColor: "black"}}
                id ="videoindex"
                ref={ref}
                muted = {true}
                autoPlay
            ></video>
            <div className="infocontainer">
                <div>
                    {roomowner===email ? <GiChessKing className="GIICON"/>:<p className="info_p">{nickname}</p> }
                    
                </div>
                <p className="info_p">{email}</p>    
            </div>

        </Container>
    );
}

export default Video;