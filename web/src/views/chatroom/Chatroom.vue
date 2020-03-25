<template>
  <div class="chat">
    <div class="chat-room d-flex">
      <div class="chat-room-total">
        <div class="title d-flex just-between">
          <div>当前所有群聊(1)</div> 
          <div>当前在线人数：100</div>
        </div>

        <ul class="total-list d-flex">
          <li class="d-flex">
            <img src="~assets/img/wzn2.jpg" alt="">
            <div class="total-list-info">
              <div class="topic">话题：</div>
              <div class="author">发起人：</div>
            </div>
            <div class="total-join">
              <el-button type="primary" @click="joinChat">加入</el-button>
            </div>
          </li>

          <li class="d-flex">
            <img src="~assets/img/wzn2.jpg" alt="">
            <div class="total-list-info">
              <div class="topic">话题：</div>
              <div class="author">发起人：</div>
            </div>
            <div class="total-join">
              <span>在线人数：100</span>
              <el-button type="primary">加入</el-button>
            </div>
          </li>
        </ul>

      </div>
      <div class="chat-room-mine">
        <div class="title d-flex just-between">
          <div>我的班级群</div> 
          <div>当前在线人数：10</div>
        </div>
        
        <div>
          <el-button @click="createChatroom" >新建群聊</el-button>
          <el-dialog title="新建群聊" :visible.sync="isShowDialog">
          <el-form :model="model" :rules="rules" ref="chatroomForm" >
            <el-form-item label="群聊名称" label-width="80px" prop="name">
              <el-input v-model="model.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="群聊话题" label-width="80px" prop="topic">
              <el-input v-model="model.topic" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveCharroom('chatroomForm')">确 定</el-button>
          </div>
        </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Class',
    data() {
      return {
        isShowDialog: false,
        model: {
          id: Date.now(),
          name: '',
          author: this.$store.state.userName,
          topic: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          topic: [
            { required: true, message: '请输入聊天室话题', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
        },
      }
    },
    created() {
      // console.log(this.$store.state)
    },
    methods: {
      createChatroom() {
        this.isShowDialog = true
      },

      saveCharroom(formname) {
        this.$refs['chatroomForm'].validate(async (valid) => {
          console.log(2222)
          if (valid) {
            this.$socket.emit('createChatroom', this.model)
            this.isShowDialog = false
          } else {
            return this.$message.warning('信息不能为空')
          }
        })
      },

      joinChat() {
        this.$router.push('/chatroom/detail')
      },
    },
    sockets: {
      connect() {
        console.log('这里是 Chatroom.vue')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .chat {
    width: 100%;
    min-height: 30vw;
    background-color: #fff;
  
    .chat-room {
      margin-top: 10px;
      min-height: 30vw;
      .title {
        padding:0 10px 0 10px;
        line-height: 4vw;
        background-color: $blue-light-1;
      }
      .chat-room-total {
        width: 65%;
        background: $blue-light-1;
        .total-list {
          margin: 0;
          padding: 10px;
          background-color: $white;
          display: flex;
          flex-wrap: wrap;
          li {
            margin: 1vw 0.5vw 1vw 0.5vw;
            list-style: none;
            width: 100%;
            img {
              width: 10vw;
              height: 5vw;
            }

            .total-list-info {
              width: 50vw;
            }

            .author {
              margin-top: 1vw;
              padding-left: 10px;
              font-size: 0.8rem;
            }

            .topic {
              padding-left: 10px;

            }

            .total-join {
              display: none;
              font-size: 0.8rem;
              text-align: right;
              width: 20vw;
            }
          }

          li:hover {
            .total-join {
              display: block;
            }
          }
          
        }
      }

      .chat-room-mine {
        margin-left: 2%;
        width: 33%;
        background: #f1f1f1;
      }
    }
  }
 
</style>
