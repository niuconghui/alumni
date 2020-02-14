<template>
  <div class="center">
    <div class="info d-flex">
      <img :src=user.avatar alt="" v-if="user.avatar">
      <img src="~assets/img/avatar.png" alt="" v-else>
      <div class="info-base flex-1">
        <div>{{user !== null ? user.studentName : ''}}</div>
        <div>我是：{{user !== null ? user.trueName : '宁理校友'}}</div>
        <div>{{user !== null ? user.motto : ''}}</div>
      </div>
      <div class="edit" v-if="this.$store.state.userId == id">
        <el-button @click="editProfile">编辑个人资料</el-button>
      </div>
    </div>

    <div class="content">
      <div class="nav">
        <ul class="d-flex">
          <li 
            v-for="(item, index) in navOptions"
            :key="index"
            @click="navClick(index, item.type, item.path)"
            :class="{'active' : index === currentIndex }"
            >
            {{item.type}}
          </li>
        </ul>
      </div>
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Center',
    props: {
      id: {}
    },
    data() {
      return {
        user: {},
        navOptions: [
          { type: '动态', path: `activities`},
          { type: '评论', path: 'activities'},
          { type: '点赞', path: 'activities'},
        ],
        currentIndex: 0,
        currentType: 'active',
      }
    },
    created() {
      this._getUser()
    },
    methods: {
    // -------------------------网络请求-----------------------------------
      async _getUser() { 
        // 根据路径 id 和 vuex 中的 id 判断当前组件显示什么信息
        if (this.$store.state.userId === this.id) { 
          this._getCurrentLoginUser()
        } else {
          this._getOtherUserInfo()
        }
        
      },

      async _getCurrentLoginUser() { // 获取当前登录用户的个人信息---交流列表信息等
        const res = await this.$api.user.getUserInfo()
        if (res.data.code === 0) {
          this.user = res.data.data.user
        }
      },

      async _getOtherUserInfo() { // 查看其它用户的个人信息
        const res = await this.$api.user.getOtherUserInfo(this.id)
        if (res.data.code === 0) {
          this.user = res.data.data.user
        }
      },

    // ------------------------ 事件监听 ----------------------------------
      editProfile() {
        this.$router.push('/user/settings/profile')
      },

      navClick(index, type, path) {
        this.currentIndex = index
        this.currentType = type
        console.log(this.currentIndex, this.currentType)
        this.$router.push(path)
      }
    },
    beforeRouteUpdate(to, from, next) {
      this._getCurrentLoginUser()
      next()
    } 
  }
</script>

<style lang="scss" scoped>
.center {
  background-color: $global-bgc;
  .info {
    padding: 1.8vw;
    width: 100%;
    background-color: $white;
    border-radius: 5px;
    img {
      width: 6vw;
      height: 6vw;
      border-radius: 50%;
    }
    
    .info-base {
      margin: 0 0 0 1.5vw;
      div:nth-child(1) {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
      }

      div:nth-child(2) {
        margin-top: 1vw;
      }

      div:nth-child(3) {
        margin-top: 1vw;
      }
    }

    .edit {
      display: flex;
      // background-color: #999;
      align-items: flex-end;

    }
  }

  .content {
    margin: 1vw 0 0 0 ;
    width: 100%;
    // height: 30vw;
    // background-color: #fff;

    .nav {
      width: 100%;
      line-height: 3.5vw;
      border-bottom: 1px solid $gray-2;
      background: $white;
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        padding: 0 2vw 0 2vw;
        list-style-type: none;
        font-size: 1.1rem;
      }
      .active {
        color: $primary;
        border-bottom: 2px solid $primary
      }
    }
  }
}
 
</style>
