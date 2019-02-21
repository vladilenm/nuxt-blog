<template>
  <div class="block">
    <el-card shadow="always" :style="{width: '500px'}">
      <el-form
        @submit.native.prevent="onSubmit"
        :model="controls"
        :rules="rules"
        ref="form"
      >
        <h2 class="mb">Вход в панель управления</h2>

        <el-form-item label="Логин" prop="login">
          <el-input
            v-model="controls.login"
          />
        </el-form-item>

        <el-form-item label="Пароль" prop="password">
          <el-input
            v-model="controls.password"
            type="password"
          />
        </el-form-item>

        <el-button
          type="primary"
          round
          native-type="submit"
          :loading="submitted"
        >
          Войти
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  layout: 'login',
  head: {
    title: `Войти | ${process.env.appName}`
  },
  data() {
    return {
      controls: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          {required: true, message: 'Введите логин', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Введите пароль', trigger: 'blur'},
          {min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur'}
        ]
      },
      submitted: false
    }
  },
  mounted() {
    const {message} = this.$route.query
    if (message === 'session') {
      this.$message.warning('Ваша сессия истекла')
    } else if (message === 'login') {
      this.$message.info('Для начала войдите в систему')
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.submitted = true
          try {
            await this.$store.dispatch('auth/login', {
              login: this.controls.login,
              password: this.controls.password
            })
            this.$router.push('/admin')
          } catch (e) {
            this.submitted = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .block {
    display: flex;
    justify-content: center;
  }
</style>
