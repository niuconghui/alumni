<template>
  <div class="header">
    <ul class="header-ul">
      <li><router-link to="/news">新闻中心</router-link></li>
      <li><router-link to="/exchange">校友交流</router-link></li>
      <li><router-link to="/class">关注班级</router-link></li>
      <li><router-link to="/demeanor">校友风采</router-link></li>
      <li><router-link to="/scenery">校园风光</router-link></li>
      <li class="avatar"  v-if="isLogin">
        <div class="drop">
          <div>
            <img :src=showAvatar alt="" v-if="showAvatar !== undefined">
            <img src="~assets/img/avatar.png" alt="" v-else>
          </div>
          <div class="drop-menu">
            <div 
              class="drop-menu-item" 
              v-for="item in dropOptions"
              @click="dropClick(item.path)">
              <i :class="item.icon"></i> {{item.text}}
            </div>
          </div>
        </div>
      </li>
      <li class="avatar" v-else>
        <router-link to="/login" class="login">登录</router-link>
        <el-divider direction="vertical"></el-divider>
        <router-link to="/register" class="login">注册</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'NavBar',
    data() {
      return {
        dropOptions: [
          { text: '写交流', icon: 'el-icon-edit', path: '/exchange/new' },
          { text: '我的主页', icon: 'el-icon-user-solid', path: '/user/center' },
          { text: '设置', icon: 'el-icon-setting', path: '/user/settings/profile' },
          { text: '关于', icon: 'el-icon-warning', path: '/save' },
          { text: '登出', icon: 'el-icon-d-arrow-right', path: '/logout' },
        ]
      }
    },
    computed: {
      ...mapGetters(["isLogin"]),
      showAvatar() {
        return this.$store.state.userAvatar
      }
    },
    methods: {
      ...mapActions(["setUserId"]),
      dropClick(path) {
        if (path === '/logout') {
          this.$confirm('确认登出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (localStorage.token) {
              localStorage.clear()
              this.$store.state.userAvatar = ''
              this.$store.state.isLogin = false
              this.$router.push('/')
            }
            this.$message({
              type: 'success',
              message: '注销成功!'
            });
          })
        } else if (path === '/user/center') {
          this.$router.push(`/user/center/${this.$store.state.userId}`)
        } else {
          this.$router.push(path)
        }
        
      },
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 4vw;
    background-color: #fff;
    font-size: 1.0rem;
    line-height: 4vw;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1);
    .header-ul {
      display: flex;
      width: 70vw;
      margin: 0 auto;
      padding: 0;
      li {
        width: 7vw;
        height: 4vw;
        list-style: none;
        text-align: left;
        line-height: 4vw;
      }

      .avatar{
        flex: 1;
        position: relative;
        text-align: right;
        .drop {
          position: absolute;
          right: 0;
          width: 3vw;
          height: 4vw;
          cursor: pointer;
          img {
            width: 3vw;
            height: 3vw;
            margin: 0.7vw 0 0vw 0;
            border-radius: 50%;
          }

          .drop-menu {
            display: none;
            position: absolute;
            right: 0;
            top: 4vw;
            padding: 1vw 0 1vw 0 ;
            min-width: 9vw;
            min-height: 14vw;
            background-color: $white;
            border: 2px solid $gray-1;
            border-radius: 2px;

            .drop-menu-item {
              margin: .2vw 0 0 0;
              padding: 0 0 0 1vw;
              width: 100%;
              height: 2.5vw;
              line-height: 2.5vw;
              text-align: left;
              background-color: #fff;
              
            }
            .drop-menu-item:hover {
              background-color: $blue-light;
              color: $primary;
            }
          }
        }

        .drop:hover {
          .drop-menu {
            display: block;
          }
        }
      }

      a {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 7vw;
        height: 100%;
      }

      .login {
        width: 3vw;
        text-align: center;
      }
    }

   
  }
  a {
    display: inline;
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: $gray-5;
  }

  a:hover {
    color: $primary;
  }

  .router-link-active {
    color: $primary;
  }

 
</style>
