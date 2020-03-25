module.exports = http => {

  const io = require('socket.io')(http)

  users = []

  let kit = {
    //判断用户是否存在
    isHaveUser(user) {
      let flag = false
      users.forEach(function (item) {
        if (item.name == user.name) {
          flag = true
        }
      })
      return flag
    },
    //删除某一用户
    delUser(id) {
      users.forEach(function (item, index) {
        if (item.id == id) {
          users.splice(index, 1)
        }
      })
    },
  }

  io.sockets.on('connection',(socket)=>{
    //创建用户链接
    socket.on('login', (user)=> {
      if (kit.isHaveUser(user)) {
        socket.emit('loginFail', "登录失败,昵称已存在!")
      } else {
        user.id = socket.id
        user.roomId=socket.id
        user.address = socket.handshake.address.replace(/::ffff:/,"")
        user.loginTime=new Date().getTime()
        socket.user = user  // socket 实例本身带上 user
        users.push(user)
        socket.emit('loginSuccess', user, users)
        socket.broadcast.emit('system', user, 'join')
      }
    })
    //用户注销链接
    socket.on('disconnect',()=> {
    })
    socket.on('logout',()=> {
      if (socket.user != null) {
        kit.delUser(socket.user.id)
        socket.broadcast.emit('system', socket.user, 'logout')
      }
    })
    //群发消息
    socket.on('groupMessage',(from, to,message,type)=>{
      //用户登录状态掉线，重置用户登录状态
      // console.log('收到群聊消息', from, to, message, type)
      if (!socket.user) {
        from.roomId = socket.id
        socket.user = from
        users.push(from)
        socket.broadcast.emit('system', from, 'join')
        socket.emit('loginSuccess', from, [])
      }
      socket.broadcast.emit('groupMessage', socket.user, to, message, type)
    })
    //发送私信
    socket.on('message',(from, to,message,type)=> {
      //用户登录状态掉线，重置用户登录状态
      if (!socket.user) {
        from.roomId = socket.id
        socket.user = from
        users.push(from)
        socket.broadcast.emit('system', from, 'join')
        socket.emit('loginSuccess', from, [])
      }
      socket.broadcast.to(to.roomId).emit('message', socket.user, to,message,type)
    })
    //判断用户重新连接
    if(socket.handshake.query.User){
      let user=JSON.parse(socket.handshake.query.User)
      socket.user = user
      user.roomId = socket.id
      user.address = socket.handshake.address.replace(/::ffff:/,"")
      // console.log("重新连接成功！", user)
      socket.emit('loginSuccess', user, users)
      users.push(user)
      socket.broadcast.emit('system', user, 'join')
    }
  })

}