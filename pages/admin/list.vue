<template>
  <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column
      prop="title"
      label="Название"
    />
    <el-table-column
      label="Дата"
    >
      <template slot-scope="{row: {date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Просмотры"
      prop="views"
    />
    <el-table-column
      label="Комментарии"
    >
      <template slot-scope="{row}">
        <i class="el-icon-tickets"></i>
        <span style="margin-left: 10px">{{ row.comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Действия"
    >
      <template slot-scope="{row}">
        <el-tooltip effect="dark" content="Редактировать" placement="top-start">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="open(row._id)"
          />
        </el-tooltip>
        <el-tooltip effect="dark" content="Удалить" placement="top-start">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="remove(row._id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  middleware: ['admin-auth'],
  layout: 'admin',
  head: {
    title: `Посты | ${process.env.appName}`
  },
  async asyncData({store}) {
    const posts = await store.dispatch('post/fetchAdmin')
    return {posts}
  },
  methods: {
    async remove(id) {
      try {
        await this.$confirm(`Удалить пост?`, 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отменить',
          type: 'warning'
        })
        await this.$store.dispatch('post/remove', id)
        this.posts = this.posts.filter(p => p._id !== id)
        this.$message.success('Пост удален')
      } catch (e) {
      }
    },
    open(id) {
      this.$router.push(`/admin/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
