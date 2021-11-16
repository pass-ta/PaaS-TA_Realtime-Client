import React,{useEffect, useState} from 'react'
import './Chat.scss'
import RenderChat from './RenderChat'
import ChatUser from '../ChatUserTemplate/ChatUser'
import { receiveChatData } from '../../store/action'
import { useDispatch } from 'react-redux'
import moment from 'moment'
var chatdata= ""

// user data의 imageurl을 넣기
function Chat(props) {
  
    const dispatch = useDispatch()
    const io = props.io
    const {nickname,userimage} = props.userdata
    console.log("채팅 활성화 상태:"+props.setting)
    // io.on("message",data=> {
    //     dispatch(receiveChatData(data))
        
    // }) 
    // useEffect(()=> {
        
    // },[chat])
   
    useEffect(()=> {
        io.on("message",data=> {
            console.log(data)
            dispatch(receiveChatData(data))
        })
         
    },[])
   

    

  



    
    const submit = (e)=> {
        e.preventDefault()
        io.emit('message',{
            nickname,
            chatdata,
            moment:moment().format('HH:mm:ss')
        })
      
        document.getElementById('chatinput').value=""
        
        return false;
    }
 
    const onChange = (e) => {
        chatdata = e.target.value
    }
   

    return (
        <>
           
            <div className="inbox" style={{animationName:props.setting.toString()||"false"}}>
                <aside >
                   
                    <ul ng-controller="chatCtrl as chat" className="ng-scope">
                        <ChatUser username={nickname} src={userimage}/>
    
                      
                    </ul>
                </aside>
                
                <main ng-controller="chatCtrl as chat" className="ng-scope">
                    <RenderChat />
                    
                    <footer>
                        <form onSubmit={e=>submit(e)} className="ng-pristine ng-valid">
                            {/* <ValueInput/> */}
                            <input  
                                id="chatinput"
                                onChange={e=>onChange(e)}
                                className = "textarea_input" 
                                autoComplete="off"
                                type ="text" 
                                placeholder="메세지를 입력하세요" />
                            <input type = "submit" value ="전송" className="submitIcon"/>
                        </form>
                    </footer>
                </main>
            </div>
     
        </>
    )
}

export default Chat