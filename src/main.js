// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import componentObj from './components/js/component'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
Vue.use(ElementUI)
Vue.use(componentObj)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
