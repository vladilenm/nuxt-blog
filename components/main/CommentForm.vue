<template>
  <el-form
    @submit.native.prevent="onSubmit"
    :model="controls"
    :rules="rules"
    ref="form"
  >
    <h1>Оставить комментарий</h1>
    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model.trim="controls.name" />
    </el-form-item>

    <div class="mb">
      <el-form-item label="Текст комментария" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="2"
        />
      </el-form-item>
    </div>

    <div class="mb">
      <el-button
        type="primary"
        round
        native-type="submit"
        :loading="loading"
      >
        Добавить комментарий
      </el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  props: ['postId'],
  data() {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Введите имя', trigger: 'blur' },
        ],
        text: [
          { required: true, message: 'Введите кооментарий', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$refs.form.validate(async valid => {
        if (valid) {
          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: this.postId
          }

          try {
            const newComment = await this.$store.dispatch('comment/create', formData)
            this.$message.success('Комменатрий добавлен')
            this.$emit('created', newComment)
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

</style>
