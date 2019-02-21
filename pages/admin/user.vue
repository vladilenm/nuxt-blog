<template>
  <el-form
    @submit.native.prevent="onSubmit"
    :model="controls"
    :rules="rules"
    ref="form"
  >
    <h1>Создать пользователя</h1>

    <div class="mb">
      <el-form-item label="Логин" prop="login">
        <el-input
          v-model.trim="controls.login"
        />
      </el-form-item>
    </div>

    <div class="mb2">
      <el-form-item label="Пароль" prop="password">
        <el-input
          v-model.trim="controls.password"
          type="password"
        />
      </el-form-item>
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
    title: `Создать пользователя | ${process.env.appName}`
  },
  data() {
    return {
      loading: false,
      controls: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: 'Логин не может быть пустым', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Пароль не может быть пустым', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch('auth/create', {
              login: this.controls.login,
              password: this.controls.password
            })
            this.$message.success('Пользователь создан')
            this.controls.login = ''
            this.controls.password = ''
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
    width: 600px;
  }
</style>
