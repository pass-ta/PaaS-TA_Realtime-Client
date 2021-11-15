import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import './Subtitle.scss'
function Subtitle(props) {
    const subtitle = useSelector((state)=>(state.receiveSubtitleData))
    const translateSubtitle = useSelector((state)=> state.receiveTranslateSubtitleData)
    // console.log(JSON.stringify(subtitle))
    console.log(subtitle)
    console.log(translateSubtitle)
    const [usesubtitle,setSubtitle] = useState({
        nickname:null,
        message:null,
        message2:null
    })
    const [useflag,setFlag] = useState(true)
    const [usetranslateSubtitle,setTranslateSubtitle] = useState({
        nickname:null,
        message:null
    })
    const onClickModify =() => {
        setFlag(!useflag)
        
    }
    useEffect(()=> {
        setSubtitle(subtitle)
        setTranslateSubtitle(translateSubtitle)
        
    },[subtitle,translateSubtitle])
    return (
        <>
            <div className="subtitleContainer" style={{animationName:props.otherSubtitleSetting.group.toString()+"4"||"false4"}}>
                    {useflag?(
                            <p id="my_p" className="preview_p"  > 
                        
                                {usesubtitle.nickname} :{usesubtitle.message} 
                                {/* 이쪽에 알아서 message2 쓰면 될 것 */}
                            </p>
                        )
                    
                        :
                        (
                            <p id="my_p" className="preview_p"  > 
                        
                                {usetranslateSubtitle.nickname} :{usetranslateSubtitle.message} 
                            </p>
                        )
                    }
                    <p className="preview_p modify_p" onClick={onClickModify}>변경</p>
            </div>

        </>
    )
}
export default Subtitle