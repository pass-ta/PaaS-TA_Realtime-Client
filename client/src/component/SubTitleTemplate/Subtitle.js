import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import './Subtitle.scss'
function Subtitle(props) {
    const subtitle = useSelector((state)=>(state.receiveSubtitleData))
    const translateSubtitle = useSelector((state)=> state.receiveTranslateSubtitleData)
    // console.log(JSON.stringify(subtitle))
    console.log(subtitle)
    const [usesubtitle,setSubtitle] = useState({
        nickname:null,
        message:null
    })
    const [usetranslateSubtitle,setTranslateSubtitle] = useState({
        nickname:null,
        message:null
    })
    const onClickModify =() => {

    }
    useEffect(()=> {
        setSubtitle(subtitle)
        setTranslateSubtitle(translateSubtitle)

    },[subtitle,translateSubtitle])
    return (
        <>
            <div className="subtitleContainer" style={{animationName:props.otherSubtitleSetting.group.toString()+"4"||"false4"}}>
{/*              
                {subtitle.arr.map((data,index)=> {
                    <div key={index}>

                        <p>{data.nickname}</p>
                        <p>{data.message}</p>
                    </div>
                })} */}
               
                    <p className="preview_p"  >{usesubtitle.nickname} :{usesubtitle.message} </p>
                    <p className="preview_p modify_p" onClick={onClickModify}>변경</p>
                
                {/* {usesubtitle.map((data)=> {
                    return (
                        <>
                            <p className="preview_p" style={{color:"white"}}>{data.nickname} :{data.message} </p>
                        </>
                    )
                })} */}
            </div>

        </>
    )
}
export default Subtitle