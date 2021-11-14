import {RECEIVE_TRANSLATE_SUBTITLE_DATA } from "../action"
const initialState = {
    nickname:null,
    message:null,
}

function receiveTranslateSubtitleData(state= initialState,action) {
    switch(action.type) {
        case RECEIVE_TRANSLATE_SUBTITLE_DATA:
            return action.data
        default:
            return state
    }
}
export default receiveTranslateSubtitleData