import {RECEIVE_SUBTITLE_DATA } from "../action"
const initialState = {
    nickname:null,
    message:null,
    message2:null
}

function receiveSubtitleData(state= initialState,action) {
    switch(action.type) {
        case RECEIVE_SUBTITLE_DATA:
            return action.data
        default:
            return state
    }
}
export default receiveSubtitleData