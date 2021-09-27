import Vue from 'vue'
import { Slider } from 'element-ui'
import 'leaflet/dist/leaflet.css'
import App from './App.vue'
import './index.scss'

Vue.use(Slider)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
