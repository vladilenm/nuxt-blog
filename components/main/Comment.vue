<template>
  <el-card class="comment">
    <div class="header">
      <span class="name">{{comment.name}}</span>
      <span class="date">{{new Date(comment.date).toLocaleString()}}</span>
    </div>
    <div class="text">
      {{comment.text}}
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['comment']
}
</script>

<style lang="scss" scoped>
  .comment {
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    margin-bottom: .5rem;
    justify-content: space-between;
    font-size: .8rem;
  }

  .text {
    white-space: pre-line;
  }
</style>
