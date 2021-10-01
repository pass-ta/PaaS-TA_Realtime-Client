import {combineReducers} from 'redux'
import toggleVideoAudio from './toggleVideoAudio'
import getinform from './getinform'
import receiveChatData from './receiveChat'
import receiveGazeData from './receiveGaze'
import writepencil from './writepencil'
const rootReducer = combineReducers({
    toggleVideoAudio,
    getinform,
    receiveChatData,
    receiveGazeData,
    writepencil
})

export default rootReducer