import home from './home/home.vue'
import search from './search/search.vue'
import repo from './repo/repo.vue'


export default [
    { path: '/home', component: home },

    { path: '/search/:query/:pageCount', component: search},

    { path: '/repo/:owner/:name', component: repo},

    //Catch all undefined paths and redirect to /search
    { path: '*', redirect: '/home' }
]