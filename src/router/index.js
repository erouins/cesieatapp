import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import UserHome from '@/views/consumers/Home.vue'
import UserLayout from '@/views/consumers/Layout.vue'
import AdminLayout from'@/views/admin/Layout.vue'

import { authGuard } from '@/_helpers/auth-guard'
const routes = [
  {
    path: '/'?
    name: 'root',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    children: [
      {
        path : "login",
        name : "login",
        component : Login,
        
      },
      {
        path : "register",
        name : "register",
        component : Register,
      },
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: UserLayout,
    children: [
      {
        path: ':id(\\d+)',
        props: true,
        component: UserHome
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", redirect :"/home", component: Home
  }
  
]

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
//component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

export default router