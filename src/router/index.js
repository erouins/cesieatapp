import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import UserHome from '@/views/consumers/Home.vue'
import UserLayout from '@/views/consumers/Layout.vue'
import DelivererHome from '@/views/deliverers/Home.vue'

const routes = [
  {
    path: '/',
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
    path: '/deliverers',
    name: 'deliverers',
    component: DelivererHome,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'deliverer') return true;
      return false
    },
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
