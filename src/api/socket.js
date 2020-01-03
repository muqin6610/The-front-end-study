/**
*websocket的封装
*@host websocket服务器地址
*/

//创建websocket连接  
const connectSocket = host => {  
    
  let timeoutID = ''
  window.webSocket = new WebSocket(host)
  /*建立连接*/  
  webSocket.onopen = evt => {  
    console.log("webSocket连接成功")
    let data = {type: 'bind'}
    let json = JSON.stringify(data)
    webSocket.send(json)
    console.log('第一次发送数据')
    // 连接后,定时发送,否则一段时间不通信会自动断连(时间长短一般是服务端指定的)
    timeoutID = setInterval(() => {
        webSocket.send(JSON.stringify({'type': 0, 'msg': 'ping'}))
        console.log('发送数据给websocket服务器')
    }, 35000)
  }
  //监听当前页面关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function () {
      webSocket.close()
  }
  /*连接关闭*/  
  webSocket.onclose = evt => {  
    console.log("webSocket连接关闭")  
    // 清除心跳包
    console.log('清除心跳包')
    clearInterval(timeoutID)
  }
  /*接收服务器推送消息*/  
  webSocket.onmessage = evt => {  
    if(evt.data === '连接成功') {
	  console.log(evt.data + '接收到的登录消息')
    }else {
      let dataJson = JSON.parse(evt.data)
      console.log(evt.data,'接收到的具体消息')
      // 保存消息到全局
      window.getMessage = dataJson
     // 获取报警页面按钮ID
      let socketID = document.querySelector('#getSocket')
      // 触发此ID的点击事件
      if(socketID) {
        socketID.click()
      }
    }
  }
  /*连接发生错误时*/  
  webSocket.onerror = (evt,e) => {  
    console.log(evt)  
  }  
} 

export {
    connectSocket,
}