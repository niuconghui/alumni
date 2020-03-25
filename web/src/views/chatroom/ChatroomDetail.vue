<template>
  <div id="wrapper">
    <div id="left">
      <div class="title">当前会话</div>
      <ul>
        <li 
          class="d-flex"
          v-for="item in onLineUsers"
          @click="changeChannel(item)">
          <img :src="item.avatarUrl" alt="">
          <chatroom-user 
            :user=item
            :messages="threads[item.id]?threads[item.id]:[]"
           />
        </li>
      </ul>
      
    </div>
    <div id="right">
      <div class="title d-flex just-between">
        <div>
          <span>
            {{menu }} 
            <template v-if="channel.type=='room'">
              ({{onLineUsers.length - 1}})
            </template>
          </span>
        </div>
        <div>欢迎您 | {{this.$store.state.userName}}</div>
      </div>

      <div class="message-list">
        <ul ref="messageList">
           <li 
            v-for="(item, index) in messages"
            :key="index"
            >
            <template>
              <div class="user-info d-flex" v-if="item.from.id!=loginUser.id">
                <div>
                  <img :src="item.from.avatarUrl" alt="">
                </div>
                <div class="chat-msg">
                  <div>{{item.time | time}}</div>
                  <div>{{item.content}}</div>
                  <div class="tri1"></div>
                  <div class="tri2"></div>
                </div>
              </div>

              <div class="user-info-my d-flex" v-else>
      
                <div class="chat-msg-my">
                  <div>{{item.time | time}}</div>
                  <div>{{item.content}}</div>
                  <div class="tri1-my"></div>
                  <div class="tri2-my"></div>
                </div>
                <div>
                  <img :src="item.from.avatarUrl" alt="">
                </div>
              </div>
            </template>
          </li>  
        </ul>
      </div>

      <div class="enter">
        <el-row :gutter="10">
          <el-col :span="2" class="img-upload">
            <el-button icon="el-icon-search" circle></el-button>
          </el-col>
          <el-col :span="18">
            <el-input v-model="text" @keyup.enter.native="send(text)"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="send(text)">发送</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <audio :src="audioSrc" ref="myAudio" ></audio>
  </div>
</template>

<script>
  import avatar from 'assets/img/avatar.png'
  import audio from 'assets/audio/8400.mp3'
  import ChatroomUser from './childComps/ChatroomUser'
  export default {
    name: 'ChatroomDetail',
    components: {
      ChatroomUser
    },
    data() {
      return {
        threads:{},
        loginUser:{
          name: this.$store.state.userName,
          avatarUrl: this.$store.state.userAvatar,
          type:"user"
        },
        onLineUsers:[
          {
            id: "group",
            avatarUrl: avatar,
            name: "聊天室群",
            type: "room"
          }
        ],
        threadId: "group",
        socket:null,
        isOnline:false,
        isLogin: 'false',
        menu:"聊天室  当前在线",
        text:"",
        audioSrc: audio
      }
    },
    filters: {
      time: (value) => {
        if(!value){
          return value;
        }
        function two(str) {
          let s;
          s = "" + str;
          if (s.length === 1) {
            s = "0" + s;
          }
          return s;
        };
        let time=new Date(value);
        let hour=time.getHours();
        let m=time.getMinutes();
        let s=time.getSeconds();
        return two(hour)+":"+two(m)+":"+two(s);
      }
    },
    computed:{
      messages(){
        if(this.threads[this.threadId]){
          return this.threads[this.threadId];
        }else {
          return [];
        }
      },
      channel(){
        let channel = {};
        for (let i = 0; i < this.onLineUsers.length; i++) {
          const item = this.onLineUsers[i];
          if(item.id == this.threadId){
            channel = item;
            break;
          }

        }
        return channel;
      },
    },
    created() {
      this.login(this.loginUser)
    },
    mounted() {
      window.addEventListener('beforeunload', e => {
        this.$socket.emit('logout',{ 
          username: this.username, avatar: this.userAvatar
        })
      })
    },

    beforeRouteLeave(to, from, next) {
      this.$socket.emit('logout',{ 
        username: this.username, avatar: this.userAvatar
      })
      next()
    },
    methods: {
      sendMessage(to, message, type) {
        let from = this.loginUser;
        let tidings = {
          theadId: to.id,
          from: from,
          to: to,
          content: message,
          type: type,
          time: new Date().getTime(),
          isRead: true,
        }
        this.saveMessage(tidings);
        if(to.type!="user"){
          this.$socket.emit("groupMessage", from, to, message, type);
        }else {
          this.$socket.emit("message", from, to, message, type);
        }
      },
      receiveMessage(from, to, message, type) {
        let threadId = from.id;
        if(to.type != "user"){ 
          threadId = to.id;
        }
        let isRead = this.threadId == threadId;
        let tidings = {
          theadId: threadId,
          from: from,
          to: to,
          content: message,
          type: type,
          time: new Date().getTime(),
          isRead: isRead,
        }
        this.saveMessage(tidings)
      },
      saveMessage(tidings){
        if(!this.threads[tidings.theadId]){
          this.$set(this.threads, tidings.theadId, [])
        }
        this.threads[tidings.theadId].push(tidings)

        if(!this.isHave(tidings)){
          this.onLineUsers.push(tidings.from);
        }
        this.playMessageVoice(tidings)
        if(tidings.theadId == this.threadId){
          this.scrollFooter();
        }
      },
      removeUser(user){
        let _this=this;
        _this.onLineUsers.forEach((item,index)=>{
          if(user.id==item.id){
            _this.onLineUsers.splice(index,1);
          }
        })
      },
      addUser(user){
        let _this=this,index=-1;
        _this.onLineUsers.forEach((item,i)=>{
          if(user.id==item.id){
            index=i;
          }
        })
        if(index==-1){
          _this.onLineUsers.push(user);
        }else {
          _this.onLineUsers[index]=user;
        }
      },
      changeChannel(user){
        if (user.name === this.$store.state.userName) return false
        if (user.id != 'group') {
          this.menu = user.name
        } else {
          this.menu = '聊天室  当前在线' 
        }
        this.threadId = user.id;
        this.setChannelReader(user.id);
      },
      send(text){
        if(text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')==''){
          this.text="";
          return ;
        }
        this.sendMessage(this.channel, text, "text");
        this.text = "";
      },
      isHave(tidings){
        let flag = false;
        this.onLineUsers.forEach((item)=>{
          if(tidings.theadId == item.id){
            flag = true;
          }
        })
        return flag;
      },
      setChannelReader(id){
        if(this.threads[id]){
          let messages = this.threads[id];
          messages.forEach((item,index)=>{
            this.threads[id][index].isRead = true;
          })
        }
      },
      login(user){
        this.$socket.emit("login",user)
      },
      playMessageVoice(tidings){
        if(tidings.theadId != this.threadId 
          && tidings.to.type !== "room"
          && tidings.from.id != this.loginUser.id){
            this.$refs.myAudio.play()
        }
      },
      scrollFooter(){
        let $list = this.$refs['messageList'];
        if($list){
          this.$nextTick(()=>{
            $list.scrollTop = $list.scrollHeight
          })
        }
      },
    },
    sockets: {
      message(data) {
        let [from,to,message,type] = data
        this.receiveMessage(from, to, message, type)
      },

      groupMessage(data) {
        let [from,to,message,type] = data
        this.receiveMessage(from,to,message,type)
      },

      system (data) {
        let [user, type] = data
        switch (type) {
          case "join":
            this.addUser(user)
            this.$notify({
              title: '系统消息',
              message: '用户 ' + user.name + ' 加入群聊',
            })
            break;
          case "logout":
            this.removeUser(user)
             this.$notify({
              title: '系统消息',
              message: '用户 ' + user.name + ' 退出群聊',
            })
            break;
          default:
            return;
        }
      },

      error() {
        // console.log('errror');
      },

      connect(data) {
        // console.log("链接成功！",data)
        // _this.saveLog("连接成功！"+JSON.stringify(data),"success");
        this.isOnline=true;
      },

      disconnect(data) {
        this.isOnline=false;
        // console.log(JSON.stringify(data)+ ' - disconnect');
        // _this.saveLog("断开连接！"+JSON.stringify(data)+ ' - disconnect',"warning");
      },

      connect_error(data) {
        this.isOnline=false;
        // console.log(JSON.stringify(data)+ ' - connect_error')
        // _this.saveLog("连接出错了！"+JSON.stringify(data)+ ' - connect_error',"error");
      },
      connect_timeout(data) {
        this.isOnline=false;
        // console.log(JSON.stringify(data)+ ' - connect_timeout')
        // _this.saveLog("连接超时！"+JSON.stringify(data)+ ' - connect_timeout',"warning");
      },
      reconnect(data) {
        // console.log(JSON.stringify(data)+ ' - reconnect')
        // _this.saveLog("重新连接！"+JSON.stringify(data)+ ' - reconnect',"info");
      },
      reconnect_attempt(data) {
        // this.$socket.io.opts.query={
        //   User: this.loginUser.id ? JSON.stringify(this.loginUser) : ''
        // }
        // _this.saveLog("尝试重新连接！"+JSON.stringify(data)+ ' - reconnect_attempt',"info");
      },
      loginSuccess(data) {
        let [user, users, isLogin] = data
        this.loginUser = user;
        this.isLogin = isLogin
        if(users.length > 0) {
          this.onLineUsers=[].concat([this.onLineUsers[0]], users);
        }
      },
     loginFail(message) {
        // console.log('login error', message);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #wrapper {
    display: flex;
    justify-content: space-between;
    margin: 25px auto;
    height: 35vw;
    width: 70vw;
    background-color: #f1f1f1;
  }

  .title {
    display: flex;
    padding: 0 5px 0 5px;
    background-color: $primary;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    border-radius: 10px 10px 0 0 ;
  }

  #left {
    width: 28%;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track{
      background-color: $white;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb{
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: $gray-1;
    }
  }

  #left ul {
    margin: 0;
    padding: 0;
    height: 30vw;
    overflow-y: scroll
    
  }

  #left li {
    margin: 5px 0 0 0px;
    width: 100%;
    background-color: #F8F8FF;
    list-style: none;
  }

  #left li img {
    padding: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  #right {
    position: relative;
    width: 70%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
  }

  .message-list {
    ul {
      margin: 0;
      padding: 0;
      height: 28vw;
      overflow-y: scroll;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track{
      background-color: $white;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb{
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: $gray-1;
    }

    .user-info {
      justify-content: left;
      align-items: center;
      div {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }

    .chat-msg {
      position: relative;
      margin: 0 0 0 15px;
      padding: 5px;
      background-color: #fff;
      max-width: 39vw;
      box-shadow:0 0 2px rgba(0,0,0,.5);
      div:nth-child(1) {
        font-size: 0.8rem;
        line-height: 0.8rem;
        color: #999;
      }
      div:nth-child(2) {
        font-size: 1rem;
      }

      .tri1 {
        position: absolute;
        left: -17px;
        top: 15px;
        border: 8px dashed #999;
        border-color: transparent #999 transparent transparent;
      }

      
      .tri2 {
        position: absolute;
        left: -16px;
        top: 15px;
        border: 8px dashed #808080;
        border-color: transparent #fff transparent transparent;
      }
    }

    .user-info-my {
      justify-content: flex-end;
      align-items: center;
      div {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }

    .chat-msg-my {
      position: relative;
      margin: 0 15px 0 0;
      padding: 5px;
      background-color: #98E165;
      color: #232323;
      max-width: 39vw;
      box-shadow:0 0 2px #98E165;
      div:nth-child(1) {
        padding-right: 8px;
        text-align: right;
        font-size: 0.8rem;
        line-height: 0.8rem;
        color: #232323;
      }
      div:nth-child(2) {
        font-size: 1rem;
      }

      .tri1-my {
        position: absolute;
        right: -17px;
        top: 15px;
        border: 8px dashed #999;
        border-color: transparent transparent transparent #fff;
      }

      
      .tri2-my {
        position: absolute;
        right: -16px;
        top: 15px;
        border: 8px dashed #808080;
        border-color: transparent transparent transparent #98E165;
      }
    }
    
  }

  .message-list li {
    margin: .5vw 0 .5vw 5px;
    list-style: none;
  }

  .enter {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    background-color: $gray-2;
    border-radius: 0 0 10px 10px;
    .img-upload {
      margin-left: 10px;
      text-align: right;
    }
  }

</style>
