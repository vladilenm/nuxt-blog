import Vue from 'vue'
import ElementUI from 'element-ui'
import VueMarkdown from 'vue-markdown'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(ElementUI, { locale })
Vue.component('vue-markdown', VueMarkdown)
