## Synopsis

---

WebRTC 통신을 위한 React 페이지입니다. 해당 realtime-client가 실행되기위해서는 realtime-server가 작동해야합니다.
## Quick Start

```bash
git clone https://github.com/pass-ta/PaaS-TA_Realtime-Client
cd client
npm install
npm start
```
* npm 환경에서 돌아가는 서비스 입니다. 실행 전 npm이 설치되어 있는지 확인해야 합니다.
## 🎨 Preview
[https://www.youtube.com/watch?v=NjNh38PI3P4](https://www.youtube.com/watch?v=NjNh38PI3P4)
## 📽️WebRTC
![undefined (3)](https://user-images.githubusercontent.com/48875061/142192307-818cfbed-69ea-4977-b628-ab9b01b5f8da.jpg)  
- Peer Connection  
`RTCPeerConnection` 인터페이스는 로컬 컴퓨터와 원격 피어 간의 WebRTC 연결을 담당하며 원격 피어에 연결하기 위한 메서드들을 제공하고, 연결을 유지하고 연결 상태를 모니터링하며 더 이상 연결이 필요하지 않을 경우 연결을 종료합니다.  
- ScreenShare  
`navigator.mediaDevices.getDisplayMedia()`를 통해 화면 콘텐츠를 가져오고
임시 피어를 생성하여 원격 피어 간 연결 유지합니다.  
## 🖋Features  
필기모드            |  PDF 변환
:-------------------------:|:-------------------------:
![pencil](https://user-images.githubusercontent.com/48875061/142193568-bdda8084-8c90-4945-b9c5-a2aacc0fa179.PNG)  |  ![image](https://user-images.githubusercontent.com/48875061/142193909-fe82fcc5-530b-4b47-a4e0-e0ab4b778da6.png)  
수업 중 필기를 할 경우를 대비해 헤더와 본문을 구분 짓고 다양한 기능을 제공하는 Markdown 언어를 이용하여 작성할 수 있습니다. PDF 변환을 통해 자신의 필기를 저장하는 기능을 제공합니다. javascripts의 eidtor를 담당하는 구성 요소 `codemirror`를 통해서 마크 다운형식으로 필기형식을 가능하게 구현했습니다.|nodejs 모듈인 `html-to-pdfmake`을 이용하여 해당 필기 내용을 pdf 형식을 전환하여 저장하는 기능을 구현했습니다.


실시간 음성인식            |  번역
:-------------------------:|:-------------------------:
![unnamed (1)](https://user-images.githubusercontent.com/48875061/142206008-0f420da5-9ea7-4544-a58f-85920ac1c2ed.png)  |  ![unnamed (2)](https://user-images.githubusercontent.com/48875061/142206015-220090c1-e963-4eda-b95e-0511198d713b.png)  
JavaScript 오픈소스 ( Web Speech API )를 사용하여 React의 실시간 시그널링 서버와 통신하는 Section.js에서 각 사용자의 오디오를 인식하여 적용시켜줍니다.|한국어 처리에 특화되어 있는 NaverCloudPlatform API 인 Papago Translation을 사용하여 STT로 만든 자막을 번역합니다. 이후 실시간 수업 번역 기능을 통해 다문화 가정 학생들의 비대면 수업 이해도를 높여줍니다.

### 채팅모드
- `Redux`  
![Chatting V2](https://user-images.githubusercontent.com/48875061/142204562-7343036e-acde-47b5-b513-e68503263663.jpg)

기존 연결된 IO를 통해 채팅 기능을 제공합니다. 또한 Redux를 통해 메시지 상태 관리를 분리하여 저장, 유지합니다.  
서버로부터 메세지를 전달받게 되면, Dispatch를 통해 스토어에 저장됩니다.  
UI Component에서 state가 필요하다 판단되면, 스토어로부터 저장된 state값을 불러옵니다.  
### 🐹API

RealTime-Client

/component

- ChatTemplate
    - 실시간 채팅을 통신 연결
    - 채팅 on/off 슬라이드 기능
- PencilTemplate
    - Markdown 언어를 이용한 필기모드 페이지
    - PDF 변환 기능
- ErrorTemplate
    - 에러 Catch를 위한 페이지
    - 새로고침/Userdata불일치 등
- RenderTemPlate
    - Django서버로 Data를 받아 해당하는 Room으로 입장하는 페이지
    - 해당 방이 없으면 방을 생성
- SectionTemplate
    - 화상통화 연결 페이지
    - 화면공유 페이지
    - 실시간 음성인식 기능
    - 번역 기능
- VideoTemplate
    - 자신을 제외한 연결 요청을 받은 사용자 연결
- Home
    - 관리자, 채팅 슬라이드, 필기 슬라이드 포함
    - 참여자 퇴장 시 알림기능
- store
    - 채팅 상태관리
    - (마이크,비디오,채팅,필기) on/off 상태관리

### 🙋‍♂️Role
 @김준영 
 - *전체 Layout 구축*
 - *WebSocket token을 활용한 peer connection*
 - *화면 공유 기능 구축*
 - *Chat 기능 구축*
 - *필기 기능 구축*
 - *백엔드 실시간 통신 구축*
 - *Redux를 활용한 상태 관리*

 @김혜원 
 - *실시간 음성인식 구축*
 - *번역 기능 구축*

### License
```
MIT License

Copyright (해몽유식) [2021-11-19] [JunYoung Kim,HyeWon Kim]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
