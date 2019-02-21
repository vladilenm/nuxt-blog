<template>
  <div>
    <h1 class="mb">Аналитика</h1>
    <app-analytics-chart
      :labels="comments.labels"
      :data="comments.data"
      title="Количество комментариев"
    />

    <app-analytics-chart
      :labels="views.labels"
      :data="views.data"
      title="Количество просмотров"
    />
  </div>
</template>

<script>
import AppAnalyticsChart from '@/components/admin/AnalyticsChart'

export default {
  head: {
    title: `Статистика | ${process.env.appName}`
  },
  middleware: ['admin-auth'],
  layout: 'admin',
  async asyncData({store}) {
    const {comments, views} = await store.dispatch('post/getAnalytics')
    return {comments, views}
  },
  components: {
    AppAnalyticsChart
  }
}
</script>

<style lang="scss" scoped>

</style>
