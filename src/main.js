// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import componentObj from './components/js/component'
import 'element-ui/lib/theme-chalk/index.css';
import "bootstrap/dist/css/bootstrap.css"
import 'font-awesome/css/font-awesome.min.css'
import store from './store/index'
import router from './router/index'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(componentObj)

// 不打印项目启动的详细提示信息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
