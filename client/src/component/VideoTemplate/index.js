import React, { useEffect, useRef ,useState} from 'react';
import Styled from 'styled-components';
import './index.scss'
import {GiChessKing} from 'react-icons/gi'





function Video({email, nickname,stream, roomowner,audio,video}) {

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
    return (
        <div id="aa"> 
            <video
                
                id ="videoindex"
                ref={ref}
                
                autoPlay
            ></video>
            <div className="infocontainer">
                <div>
                    {roomowner===email ? <GiChessKing className="GIICON"/>:<p className="info_p">{nickname}</p> }
                    
                </div>
                <p className="info_p">{email}</p>    
            </div>

        </div>
    );
}

export default Video;