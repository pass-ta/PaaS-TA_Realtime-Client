import React, { useEffect, useRef } from 'react';
import Styled from 'styled-components';
import './index.scss'
import {GiChessKing} from 'react-icons/gi'






function Video({email, nickname,stream, roomowner,audio,video,share,useshare}) {
    
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
        
       
    },[])
   
    const Container = Styled.div`
        position: relative;
        display: inline-block;
        width:${useshare===true ? '60%' : '20%'};
        height:${useshare===true ? '60%' : '20%'};
        margin: 5px;
    `;
    return (
        <Container id="aa"> 
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