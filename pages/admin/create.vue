<template>
  <el-form
    @submit.native.prevent="onSubmit"
    :model="controls"
    :rules="rules"
    ref="form"
  >
    <h1>Создать новый пост</h1>

    <el-form-item label="Название поста" prop="title">
      <el-input v-model.trim="controls.title" />
    </el-form-item>

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
      <el-button type="success" plain @click="preview = true">
        Предпросмотр
      </el-button>
    </div>

    <el-dialog title="Предпросмотр" :visible.sync="preview">
      <div :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </div>
    </el-dialog>

    <div class="mb">
      <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
        <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
      </el-upload>
    </div>

    <el-button
      type="primary"
      round
      native-type="submit"
      :loading="loading"
    >
      Создать
    </el-button>
  </el-form>
</template>

<script>
export default {
  middleware: ['admin-auth'],
  layout: 'admin',
  head: {
    title: `Создать пост | ${process.env.appName}`
  },
  data() {
    return {
      preview: false,
      image: null,
      loading: false,
      controls: {
        title: '',
        text: ''
      },
      rules: {
        title: [
          { required: true, message: 'Название поста не может быть пустым', trigger: 'blur' },
        ],
        text: [
          { required: true, message: 'Текст поста не может быть пустым', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    handleChange(response, files) {
      this.image = files[0].raw
    },
    onSubmit() {
      this.loading = true
      this.$refs.form.validate(async valid => {
        if (valid && this.image) {
          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          }

          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.title = ''
            this.controls.text = ''
            this.image = null
            this.$message.success('Пост создан')
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
  form {
    max-width: 600px;
  }
</style>
