<template>
  <div>
    Clearing data...
  </div>
</template>

<script>
export default {
  middleware: ['admin-auth'],
  layout: 'admin',
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/admin/login')
  }
}
</script>

<style lang="scss" scoped>

</style>
