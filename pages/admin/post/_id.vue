<template>
  <div class="block">
    <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/list">Список</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      @submit.native.prevent="onSubmit"
      :model="controls"
      :rules="rules"
      ref="form"
    >
      <div class="mb2">
        <el-form-item label="Текст в формате .md или .html" prop="text">
          <el-input
            type="textarea"
            v-model="controls.text"
            resize="none"
            :rows="10"
          />
        </el-form-item>
      </div>

      <div class="mb">
        <small>
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ new Date(post.date).toLocaleString() }}</span>
        </small>
      </div>


      <el-button
        type="primary"
        round
        native-type="submit"
        :loading="loading"
      >
        Изменить
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  middleware: ['admin-auth'],
  layout: 'admin',
  head() {
    return {title: `Пост | ${this.post.title}`}
  },
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchAdminById', params.id)
    return {post}
  },
  validate({params}) {
    return Boolean(params.id)
  },
  data() {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        text: [
          { required: true, message: 'Текст поста не может быть пустым', trigger: 'blur' },
        ]
      },
    }
  },
  mounted() {
    this.controls.text = this.post.text
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch('post/update', {
              text: this.controls.text,
              id: this.post._id
            })
            this.$message.success('Пост обновлен')
          }
          catch (e) {
            this.loading = false
          }
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .block {
    width: 600px;
  }
</style>
