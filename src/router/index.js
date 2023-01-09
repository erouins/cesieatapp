import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import Layout from '@/views/public/Layout.vue'
import Customer from '@/views/customers/Home.vue'
import Deliverer from '@/views/deliverers/Home.vue'
import Restaurant from '@/views/restaurants/Home.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: '/customers',
    name: 'customers',
    component: Layout,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'customer') return true;
      return false
    },
    children: [
      { 
        path: 'home',
        name: 'customerHome',
        component: Customer,
      },
    ]
    
  },
  {
    path: '/deliverers',
    name: 'deliverers',
    component: Layout,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'deliverer') return true;
      return false
    },
    children: [
      { 
        path: 'home',
        name: 'delivererHome',
        component: Deliverer
      },
    ]
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Layout,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'restaurant') return true;
      return false
    },
    children: [
      { 
        path: 'home',
        name: 'restaurantHome',
        component: Restaurant
      },
    ]
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
