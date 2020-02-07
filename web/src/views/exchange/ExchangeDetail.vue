<template>
  <div id="main-view" class="wrapper">
    <div class="header">
      <nav-header />
      <nav-bar />
    </div>
    <div class="main d-flex">
      <div class="left">
        <div class="author d-flex">
          <div class="avatar">
            <img src="~assets/img/demean.png" alt="" v-if="user == null">
            <img :src="user.avatar" alt="" v-else>
          </div>
          <div class="info flex-1">
            <div class="author-name">{{user !== null ? user.studentName : '账户已注销'}}</div>
            <div class="time">{{exchange.created_time}}</div>
          </div>
        </div>

        <div class="content" v-html="exchange.content"> </div>
      </div>

      <div class="right">
        <div class="alumni">
          <el-card>
            <div slot="header" class="clearfix">
              <span>想对你说</span>
            </div>
            <div>
              <div>{{user !== null ? user.motto : '这个人很懒，什么都没说~~~'}} </div>
            </div>
          </el-card>
        </div>
        
        <Adcard class="ad-card"/>
      </div>
     
      <feed-button class="feed-back"/>
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
      console.log(this.user)
    },
    data() {
      return {
        user: {},
        exchange: {}
      }
    },
    methods: {
      // ---------------------------- 网络请求 --------------------------

      // ---------------------------- 事件监听 --------------------------

      async _getExchangeDetail() {
        const res = await this.$api.exchange.getExchangeDetail(this.id)
        if (res.data.code === 0) {
          this.exchange = res.data.data
          this.user = res.data.data.userId
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
    min-height: 40vw;
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
            color: $gray-2
          }
        }
      }

      .content {
        margin: 1vw 0 0 0 ;
      }
    }

    .right {
      margin: 0 0 0 2%;
      width: 28%;
      // background-color: yellow;

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

</style>