/*
 * @Description: 
 * @version: 
 * @Author: 陈楚华
 * @Date: 2019-10-09 17:16:00
 * @LastEditors: 陈楚华
<<<<<<< HEAD
 * @LastEditTime: 2019-11-08 09:10:25
=======
 * @LastEditTime: 2019-10-28 14:54:42
>>>>>>> a87141f006c80aa73f15d8e2282ee55ed3458d14
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routes'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/css/font.css'
<<<<<<< HEAD
import './assets/css/github-markdown.min.css'
import './assets/css/highlight.min.css'
=======

>>>>>>> a87141f006c80aa73f15d8e2282ee55ed3458d14

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs
Vue.prototype.moment = moment
axios.defaults.withCredentials = true
/* Vue.prototype.urlSola = 'http://119.23.34.254:8866'
axios.defaults.baseURL = 'http://10.20.5.49:8866' */
Vue.prototype.urlSola = 'http://localhost:8866'
axios.defaults.baseURL = 'http://localhost:8866'

axios.interceptors.response.use(
  res => {
    if (res.data.code === 3) {
      ElementUI.Message({
        type: "error",
        message: "请先进行登录！"
      })
      router.push("/organization/login")
    } else if(res.data.code === 4) {
      ElementUI.Message({
        type: "error",
        message: "当前服务不可用！"
      })
    }
    return res;
  }
);

/* eslint-disable no-new */
new Vue({
  router,
  //el: '#app',
  components: { App },
  template: '<App/>'
}).$mount("#app")
