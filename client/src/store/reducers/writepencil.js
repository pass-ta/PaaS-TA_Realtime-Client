import {EDIT_BODY} from '../action/index'
const initialState = {
    data: {
        cursor:'',
        body:''
    }
    
}
function writepencil(state=initialState,action) {
    
    switch(action.type) {
        case EDIT_BODY:
            return action.data
            
        default:
            return state
    }
}
export default writepencil