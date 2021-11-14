import {combineReducers} from 'redux'
import toggleVideoAudio from './toggleVideoAudio'
import getinform from './getinform'
import receiveChatData from './receiveChat'
import receiveGazeData from './receiveGaze'
import writepencil from './writepencil'
import receiveSubtitleData from './receiveSubtitle'
import receiveTranslateSubtitleData from './receiveTranslateSubtitle'
const rootReducer = combineReducers({
    toggleVideoAudio,
    getinform,
    receiveChatData,
    receiveGazeData,
    writepencil,
    receiveSubtitleData,
    receiveTranslateSubtitleData
    
})

export default rootReducer