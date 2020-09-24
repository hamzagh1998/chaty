import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/css/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
          faUserSecret, faHome, faSignInAlt, faSignOutAlt,
          faUserPlus, faUsers, faComment, faInfo, faCircleNotch,
          faPaperPlane, faBan, faTrashAlt, faUnlock
       } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faHome, faSignInAlt, faUserPlus, faUsers, faComment, faSignOutAlt, faInfo, faCircleNotch, faPaperPlane, faBan, faTrashAlt, faUnlock)

// Font awesome component
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
