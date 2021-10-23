import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {EditBody} from '../../store/action/index'
import './CodeEditor.scss'
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/display/placeholder';
//mode
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/python/python'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/go/go'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/ruby/ruby'
//theme
import 'codemirror/theme/monokai.css';
import CodeMirror from 'codemirror'

function CodeEditor() {
    const dispatch = useDispatch()
    const state = {
        cursor : "",
        body:""
    }
    useEffect(() => {
        const editor = document.getElementById("editor")
        const codeMirror = CodeMirror(editor,{
            mode:'markdown',
            theme:'default',
            dragDrop:true,
            linenumbers:true,
            lineWrapping:true,
            scrollbarStyle:'overlay',
            placeholder:'마크다운 형식으로 작성됩니다.',
        
        })
        codeMirror.on('change',onChange)
        
    })
    const onChange = (doc) => {
        
        state.cursor = doc.getCursor()
        state.body = doc.getValue()
        
        dispatch(EditBody(state.cursor,state.body))
   
    }
    return (
        <>
            <div className="CodeEditor">
                <div className="editor" id="editor"  >
                
                </div>
            </div>
        </>
    )
}
export default CodeEditor