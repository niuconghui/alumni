<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'App',
    created() {
      this._getUserInfo()
    },

    methods: {
      ...mapActions(["setLogin", "setAvatar", "setUserId", "setUsername"]),

      async _getUserInfo() {
        if (localStorage.getItem('token')) {
          const res = await this.$api.user.getUserInfo()
          this.setLogin(true)
          this.setUserId(res.data.data.user._id)
          this.setAvatar(res.data.data.user.avatar)
          this.setUsername(res.data.data.user.studentName)
        } else {
          console.log('未获取到 token');
          this.setAvatar('')
        }
      }
    },
  }
</script>


