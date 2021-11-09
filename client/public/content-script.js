const port = chrome.runtime.connect(chrome.runtime.id)
port.onMessage.addListener(msg => {
    // Background Script에서 받은 메시지를 웹 페이지에 전달
    window.portMessage(msg,"*")
})
window.addEventListener("message",event=> {
    const type = event.data.type
    if (type === "REQUEST_SCREEN_STREAM_ID") {
        port.postMessage(event.data); // 웹 페이지에서 받은 메시지를 Backgournd Script에 전달
      }
})