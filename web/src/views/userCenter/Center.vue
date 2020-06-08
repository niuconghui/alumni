<template>
  <div class="center">
    <div class="info d-flex">
      <img :src=user.avatar alt="" v-if="user.avatar">
      <img src="~assets/img/avatar.png" alt="" v-else>
      <div class="info-base flex-1">
        <div>{{user !== null ? user.studentName : ''}}</div>
        <div v-if="user.trueName">真实姓名：{{user.trueName}}</div>
        <div v-if="user.gender">性别：{{user.gender}}</div>
        <div v-if="user.studentID">学号：{{user.studentID}}</div>
        <div v-if="user.email">邮箱：{{user.email}}</div>
        <div v-if="user.phoneID">手机号：{{user.phoneID}}</div>
        <div v-if="isShowDepartment">
          院系班级：<span v-for="item in user.department">{{item}} &nbsp;</span>
        </div>
        <div v-if="user.grade">年级：{{user.grade}}</div>
        <div v-if="isShowAddress">
          家庭地址：<span v-for="address in user.address">{{address}} &nbsp;</span>
        </div>
        <div v-if="user.birthday">生日：{{user.birthday}}</div>
        <div v-if="user.motto">我的座右铭：{{user.motto}}</div>
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
    computed: {
      isShowDepartment(el) {
        return el.user.department && el.user.department.length > 0
      },

      isShowAddress(el) {
        return el.user.address && el.user.address.length > 0
      },

      showGrade(el) {
        console.log(el);
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
      div {
        margin-top: 1vw;
      }

      div:first-child {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
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
    min-height: 30vw;
    background-color: #fff;

    .nav {
      width: 100%;
      line-height: 3.5vw;
      border-bottom: 1px solid $gray-2;
      background: $white;
      cursor: pointer;
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        padding: .5vw 2vw 0 2vw;
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
