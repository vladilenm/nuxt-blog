<template>
  <div class="wrap">
    <el-container :style="{height: '100%'}">
      <el-aside width="250px" :style="{height: '100%'}">
        <app-aside />
      </el-aside>
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppAside from '@/components/admin/Aside'

export default {
  components: {AppAside},
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
  .wrap {
    width: 100%;
    height: 100vh;
  }
</style>
