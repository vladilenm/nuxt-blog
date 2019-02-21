const pkg = require('./package')


module.exports = {
  mode: 'universal',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#409eff' },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.scss'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios',
    {src: '@/plugins/no-ssr', ssr: false}
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  axios: {
  },

  env: {
    appName: 'My Nuxt'
  }
}
