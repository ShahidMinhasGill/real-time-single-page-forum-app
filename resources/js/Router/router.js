import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import login from '../components/login/Login'
import signup from '../components/login/signup'
import forum from '../components/forum/forum'
import Read from '../components/forum/read'
import Create from '../components/forum/create'
import Logout from '../components/login/Logout'
const routes = [
    { path: '/login', component: login},
    { path: '/signup', component: signup},
    { path: '/forum', component: forum},
    { path: '/logout', component: Logout},
    { path: '/question/:slug', component: Read},
    { path: '/ask', component: Create},
    // { path: '/bar', component: Bar }
]

const router = new VueRouter({
    routes, // short for `routes: routes`'

    mode:'history'
})

export default router