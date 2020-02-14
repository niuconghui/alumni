<template>
  <div class="wrapper">
    <div class="header">
      <nav-header />
      <nav-bar />
    </div>
    <div class="main d-flex">
      <div class="left">
        <div class="author d-flex">
          <div class="avatar">
            <img src="~assets/img/avatar-logout.jpg" alt="" v-if="user == null">
            <img src="~assets/img/avatar.png" alt="" v-else-if="!user.avatar">
            <img :src="user.avatar" alt="" v-else>
          </div>
          <div class="info flex-1">
            <div class="author-name">{{user !== null ? user.studentName : '账户已注销'}}</div>
            <div class="time">{{exchange.created_time}}</div>
          </div>
        </div>

        <div>
          <h2>{{exchange.title}}</h2>
        </div>

        <div class="content" > 
          <el-card v-html="exchange.content" shadow="never"></el-card>
        </div>

        <div class="comment-list" id="comment-list">
          <div class="comment-list-title text-c">评论列表</div>
          <div class="comment-text">
            <el-row :gutter="20">
              <el-col :span="2">
                <div class="avatar">
                  <img src="~assets/img/avatar.png" alt="" v-if="!this.$store.state.userAvatar">
                  <img :src="this.$store.state.userAvatar" alt="" v-else>
                </div>
              </el-col>
              <el-col :span="18">
                <el-input v-model="content" placeholder="输入评论...."></el-input>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="handleSavaComment">评论</el-button>
              </el-col>
            </el-row>
          </div>

          <div class="comment-line">
            <el-timeline>
              <el-timeline-item 
                :timestamp='item.created_time'
                placement="top"
                v-for="item in comments"
                :key="item._id"
              >
                <div class="comment-user">
                  <img src="~assets/img/avatar.png" alt="" v-if="!item.user.avatar">
                  <img :src="item.user.avatar" alt="" v-else>
                  <span>{{item.user.studentName}}</span>
                </div>
                <div class="comment-content">
                  {{item.content}} &nbsp;
                  <div 
                    class="delete-comment-btn" 
                    @click="deleteComment(item._id)"
                    v-if="isShowDeleteCommentBtn"
                  >
                    删除
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="alumni" v-if="user !== null">
          <el-card>
            <div slot="header" class="clearfix">
              <span>想对你说</span>
            </div>
            <div>
              <div>{{user.motto !== '' ? user.motto : '这个人很懒，什么都没说~~~'}} </div>
            </div>
          </el-card>
        </div>
        
        <Adcard class="ad-card"/>
      </div>
     
      <feed-button class="feed-back"/>
    </div>

    <div class="star d-flex" @click="handleStarClick">
        <img src="~assets/img/zan.svg" alt="" v-if="exchange.canStar">
        <img src="~assets/img/zan-active.svg" alt="" v-else>
        <div 
          class="star-badge"
          :class="{'active': !exchange.canStar}"
          >
          {{exchange.starNum}}
        </div>
    </div>
    
    <div class="comment">
      <img src="~assets/img/comment.svg" alt="">
      <div class="comment-badge">{{exchange.commentNum}}</div>
    </div>

  </div>
</template>

<script>
  import NavHeader from 'components/header/NavHeader'
  import NavBar from 'components/navbar/NavBar'
  import FeedButton from 'components/feedback/FeedButton'

  import Adcard from './childComps/Adcard'

  export default {
    name: 'ExchangeDetail',
    props: { id: {} },
    components: {
      NavHeader,
      NavBar,
      FeedButton,
      Adcard
    },
    created() {
      this._getExchangeDetail()
      this._getComments()
    },
    data() {
      return {
        user: {},
        exchange: {},
        content: '', // 提交的评论
        comments: [], // 评论列表
        isShowDeleteCommentBtn: false
      }
    },
    methods: {
      // ---------------------------- 网络请求 --------------------------
      async _getExchangeDetail() {
        const res = await this.$api.exchange.getExchangeDetail(this.id)
        if (res.data.code === 0) {
          this.exchange = res.data.data.items
          this.user = res.data.data.items.userId
          console.log(this.user._id, this.$store.state.userId)
          if (this.user._id === this.$store.state.userId) {
            this.isShowDeleteCommentBtn = true
          }
        }
      },

      async _getComments() {
        const res = await this.$api.exchange.getComments(this.id)
        if (res.data.code === 0) {
          this.comments = res.data.data
        }
      },

      // ---------------------------- 事件监听 --------------------------
      async handleStarClick() {
        if (this.exchange.canStar == false) return this.$message.warning('您已赞过')
        const res = await this.$api.exchange.postStar(this.id)
        if (res.data.code === 0) {
          this.exchange.canStar = false
          this.exchange.starNum ++
          this.$message.success('点赞成功')
        }
      },

      async handleSavaComment() {
        if(this.content.trim() === '') return this.$message.warning('评论内容不能为空！')
        const res = await this.$api.exchange.saveComment({id: this.id, content: this.content})
        if(res.data.code === 0) {
          this.$message.success('评论成功')
          this.content = ''
          this.exchange.commentNum ++
          this._getComments()
        }
      },

      async deleteComment(id) {
        const res = await this.$api.exchange.deleteComment(id)
        if (res.data.code === 0) {
          this.$message.success('删除成功')
          this.exchange.commentNum --
          this._getComments()
        }
      }
    },
  }
</script>


<style lang="scss" scoped>
  .wrapper {
    position: relative;
    background-color: $global-bgc;
  }
 

  .header {
    position: sticky;
    top: 0;
    z-index: 999;
    margin:  0 auto;
    width: 100%;
  }

  .main {
    margin: 1vw auto ;
    width: 70vw;
    .left {
      padding: 2%;
      width: 70%;
      background-color: $white;
      
      .author {
        height: 4vw;
        background-color: $white;
        .avatar img{
          margin: 0.5vw 0 0.5vw 1vw;
          width: 3vw;
          height: 3vw;
          border-radius: 50%;
        }

        .info {
          margin: 0 0 0 1vw;
          .author-name {
            margin: 0.5vw 0 0.5vw 0;
            font-size: 1.2rem;
            color: $gray-4
          }

          .time {
            font-size: 0.9rem;
            color: $gray-3
          }
        }
      }
      
      h2 {
        color: $gray-5;
      }

      .content {
        margin: 1vw 0 0 0 ;
        width: 100%;
        min-height: 30vw;
        img {
          min-width: 50vw;
        }
      }

      .comment-list {
        .comment-list-title {
          font-size: 1.1rem;
          line-height: 2.5rem;
        }

        .comment-text {
          height: 60px;
          line-height: 60px;
          background-color: $gray-1;
          .avatar {
            height: 80px;
            // line-height: 85px;
            img {
              margin: 10px 0 0 8px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            
          }
        }


      }

      .comment-line {
        margin-top: 10px;
        .comment-user {
          display: flex;
          align-items: center;
          height: 30px;
          line-height: 30px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }

          span {
            margin-left: 10px;
          }
        }

        .comment-content {
          margin: 10px 0 0 35px;
          padding-right: 15px;
          line-height: 30px;
          font-size: 13px;
          .delete-comment-btn {
            margin: 0;
            padding: 0;
            display: none;
            // font-size: 0.5rem;
          }

          .delete-comment-btn:hover {
            cursor: pointer;
            color: $primary
          }
        }
      }

      .el-timeline-item:hover {
        .delete-comment-btn {
          display: block;
        }
      }
    }

    .right {
      margin: 0 0 0 2%;
      width: 28%;

      .alumni{
        background-color: $white;
      }

      .ad-card {
        margin: 1vw 0 0 0;
      }
    }
  }


  .feed-back {
    position: fixed;
    bottom: 1%;
    left: 95%;
  }

  .el-card {
    padding: 0;
    margin: 0;
    border: none;
  }

  .star {
    position: fixed;
    left: 110px;
    top: 250px;
    width: 38px;
    height: 38px;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    img {
      position: absolute;
      top: 8px;
      left: 10px;
      width: 20px;
      height: 20px;
    }

    .star-badge {
      position: absolute;
      top: 0;
      left: 30px;
      min-width: 13px;
      height: 13px;
      line-height: 13px;
      border-radius: 5px;
      font-size: 0.8rem;
      background-color: #B2BAC2;
      color: $white
    }

    .active {
      background-color: #6CBD45;
    }
  }

  .comment {
    position: fixed;
    left: 110px;
    top: 300px;
    width: 38px;
    height: 38px;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    cursor: pointer;
    img {
      position: absolute;
      top: 8px;
      left: 10px;
      width: 20px;
      height: 20px;
    }

    .comment-badge {
      position: absolute;
      top: 0;
      left: 30px;
      min-width: 13px;
      height: 13px;
      line-height: 13px;
      border-radius: 5px;
      font-size: 0.8rem;
      background-color: #B2BAC2;
      color: $white
    }
  }


  
</style>