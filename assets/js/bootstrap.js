import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)

//Initialize Vuex
import store from './store'
//Initialize VueRouter
import routes from './routes.js'

// Load configuration in router
const router = new VueRouter({
    routes
})

import App from './app.vue'

//Mount the app
const app = new Vue({
    router,
    el: '#app',
    store,
    render: h => h(App)
})