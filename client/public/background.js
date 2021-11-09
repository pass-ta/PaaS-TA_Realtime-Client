chrome.runtime.onConnect.addListener(port=> {
    port.onMessage.addListener(msg=> {
        if(msg.type ==="REQEST_SCREEN_STREAM_ID"){
            requestScreenStreamId(port,msg)
        }
    })
})
function requestScreenStreamId(port,meg){
    const sendMessage = {}
    const tab = port.send.tab;
    tab.url = msg.url;
    chrome.desktopCapture.chooseDesktopMedia(
        ["screen","window","tab"],
        tab,
        streamId => {
            if(streamId) {
                sendMessage.streamId = streamId;
            }else {
                //stream id를 가져오는데 실패한 경우
            }
        }
    )
    port.portMessage(sendMessage)
}