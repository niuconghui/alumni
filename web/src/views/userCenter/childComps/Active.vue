<template>
  <div class="active">
    <active-item 
      class="active-item"
      v-for="(item, index) in exchanges"
      :key="item._id"
      :exchange="item"
      :index="index"
      @starClick="handleStarClick"
      @exchangeTitleClick="handleExchangeTitleClick"
      :isShowEditAndDeleteBtn="isShowEditAndDeleteBtn"
      @userExchangeEditClick="handleUserExchangeEditClick"
      @userExchangeDeleteClick="handleUserExchangeDeleteClick"
    />
  </div>
</template>

<script>
  import ActiveItem from './ActiveItem'

  export default {
    name: '',
    props: {
      id: { type: String }
    },
    data() {
      return {
        exchanges: [],
      }
    },
    components: {
      ActiveItem
    },
    computed: {
      isShowEditAndDeleteBtn() {
        return this.id === this.$store.state.userId
      }
    },
    created() {
      this._getUserExchanges()
    },
    methods: {
      async _getUserExchanges() {
        const res = await this.$api.exchange.getUserExchanges(this.id)
        if (res.data.code === 0) {
          this.exchanges = res.data.data.items
        }
      },

      async handleStarClick(id, star, index) {
        if (star == false) return this.$message.warning('您已赞过')
        const res = await this.$api.exchange.postStar(id)
        if (res.data.code === 0) {
          this.exchanges[index].canStar = false
          this.exchanges[index].starNum ++
          this.$message.success('点赞成功')
        }
      },

      async handleExchangeTitleClick(id) {
        let routeData = this.$router.resolve({
          path: `/exchange/detail/${id}`
        })
        window.open(routeData.href, '_blank')
      },

      handleUserExchangeEditClick(id) {
        this.$router.push(`/exchange/update/${id}`)
      },

      async handleUserExchangeDeleteClick(id, title) {
        this.$confirm(`此操作将删除交流《${title}》!`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$api.exchange.deleteExchange(id)
          if (res.data.code === 0) {
            this.$message.success('删除成功了')
            this._getUserExchanges()
          }
        })
      }
    },
  }
</script>

<style  lang="scss" scoped>
.active {
  color: #fff;
  .active-item {
    margin: 0 0 1vw 0;
  }

}
 
</style>
