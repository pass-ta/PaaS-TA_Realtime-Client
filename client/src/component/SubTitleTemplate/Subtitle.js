import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import './Subtitle.scss'
function Subtitle(props) {
    const subtitle = useSelector((state)=>(state.receiveSubtitleData))
    const translateSubtitle = useSelector((state)=> state.receiveTranslateSubtitleData)
    // console.log(JSON.stringify(subtitle))
    // console.log(subtitle)
    // console.log(translateSubtitle)
    const [usesubtitle,setSubtitle] = useState({
        nickname:null,
        message:null,
        message2:null,
        message3:null
    })
    const [useflag,setFlag] = useState(true)
    const [usetranslateSubtitle,setTranslateSubtitle] = useState({
        nickname:null,
        message:null,
        message2:null,
        message3:null
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
                            <p id="my_p" className="preview_p"> 
                                &nbsp;&nbsp;:&nbsp;&nbsp;{usesubtitle.message} &nbsp; 
                                <br></br>
                                &emsp;&emsp;&emsp;&emsp; {usesubtitle.message2}
                                <br></br>
                                &emsp;&emsp;&emsp;&emsp; {usesubtitle.message3}
                                <br></br>
                            </p>
                            
                        )
                    
                        :
                        (
                            <p id="my_p" className="preview_p"  > 
                                {usetranslateSubtitle.nickname}&nbsp;&nbsp;:&nbsp;&nbsp;{usetranslateSubtitle.message} &nbsp; 
                                <br></br>
                                &emsp;&emsp;&emsp;&emsp; {usetranslateSubtitle.message2}
                                <br></br>
                                &emsp;&emsp;&emsp;&emsp; {usetranslateSubtitle.message3}
                                <br></br>
                            </p>
                        )
                    }
                    <p className="preview_p modify_p" onClick={onClickModify}>언어변경</p>
            </div>

        </>
    )
}
export default Subtitle