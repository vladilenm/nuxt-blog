<template>
  <div class="login-layout">
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-layout {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 4rem;
  }
</style>
