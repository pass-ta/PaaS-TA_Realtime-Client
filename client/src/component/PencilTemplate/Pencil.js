import React from 'react'
import './Pencil.scss'
function Pencil(props) {
    console.log("필기 활성화 상태:"+JSON.stringify(props.setting))

    const {roomname,useremail,nickname,roomtype,userimage} = props.userdata
   
 
    return (
        <>
            <div className="pencilContainer" style={{animationName:props.setting.toString()+"2"||"false2"}}>
                <div className="leftBlock">

                </div>
                <div className="rightBlock">
                    
                </div>
            </div>
        </>
    )
}
export default Pencil