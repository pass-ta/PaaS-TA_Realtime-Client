import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import CodeEditor from '../CodeEditorTemplate/CodeEditor'
import CodeEditorPreview from '../CodeEditorPreviewTemplate/CodeEditorPreview'
import './Pencil.scss'

function Pencil(props) {
    console.log("필기 활성화 상태:"+JSON.stringify(props.setting))
    useEffect(()=> {
        return CodeEditorPreview.bind(mydata||"")
    },[])
    const mydata = useSelector(state => state.writepencil)

 
    return (
        <>
        
            <div className="pencilContainer" style={{animationName:props.setting.toString()+"2"||"false2"}}>
                <div className="leftBlock">
                    <CodeEditor/>
                </div>
                <div className="rightBlock">
                    <CodeEditorPreview mydata={mydata}/>
                </div>
            </div>
            
        </>
    )
}
export default Pencil