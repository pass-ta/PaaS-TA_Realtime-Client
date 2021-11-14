

export const TOGGLE_VIDEO_AUDIO ="TOGGLE_VIDEO_AUDIO"
export const FETCH_GET_INFORM = "FETCH_GET_INFORM"
export const RECEIVE_CHAT_DATA = "RECEIVE_CHAT_DATA"
export const RECEIVE_SUBTITLE_DATA = "RECEIVE_SUBTITLE_DATA"
export const RECEIVE_TRANSLATE_SUBTITLE_DATA = "RECEIVE_TRANSLATE_SUBTITLE_DATA"
export const RECEIVE_GAZE_DATA = "RECEIVE_GAZE_DATA"
export const EDIT_BODY = "EDIT_BODY"

export const toggleVideoAudio = (data)=> {
    return {
        type:'TOGGLE_VIDEO_AUDIO',
        data:data
    }
}
export const receiveChatData = (data) => {
    return {
        type:"RECEIVE_CHAT_DATA",
        data : data
    }
}
export const receiveSubtitleData = (data) => {
    return {
        type:"RECEIVE_SUBTITLE_DATA",
        data : data
    }
}
export const receiveTranslateSubtitleData = (data) => {
    return {
        type:"RECEIVE_TRANSLATE_SUBTITLE_DATA",
        data : data
    }
}
export const fetchGetInform = async(Data)=> {
    // console.log(Data)
    
    return {
        type:"FETCH_GET_INFORM",
        payload : Data
    }
}
export const receiveGazeData = (data)=> {
    return {
        type:'RECEIVE_GAZE_DATA',
        data:data
    }
}
export const EditBody = (cursor,body) => {
    return {
        type:"EDIT_BODY",
        data:{
            cursor:cursor,
            body:body
        }
    }
}