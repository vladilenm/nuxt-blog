<template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="card"
  >
    <div slot="header" class="card-header">

      <h3>{{post.title}}</h3>

      <small>{{new Date(post.date).toLocaleString()}}</small>

    </div>
    <div class="card-body">
      <img class="card-img" :src="post.imageUrl" alt="img">
    </div>
    <div class="card-footer">
      <el-button
        @click="openPost"
        round
      >
        Открыть
      </el-button>

      <span>
        <i class="el-icon-message"></i>

        {{post.comments.length}}
      </span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    openPost() {
      this.$router.push('/post/' + this.post._id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 1.5rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-body {
    padding: 0;
  }

  .card-img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  .card-footer {
    display: flex;
    padding: 1rem;
    height: 60px;
    align-items: center;
    justify-content: space-between;
  }
</style>
