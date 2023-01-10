import { createRouter, createWebHistory } from 'vue-router'
import AuthRegister from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import Layout from '@/views/public/Layout.vue'
import Client from '@/views/clients/Home.vue'
import ClientRegister from '@/views/clients/Register.vue'
import Deliverer from '@/views/deliverers/Home.vue'
import DelivererRegister from '@/views/deliverers/Register.vue'
import Restaurant from '@/views/restaurants/Home.vue'
import RestaurantRegister from '@/views/restaurants/Register.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: '/clients',
    name: 'clients',
    component: Layout,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'client') return true;
      return false
    },
    children: [
      { 
        path: 'main',
        name: 'ClientMain',
        component: Client,
      },
      { 
        path: 'register',
        name: 'clientRegister',
        component: ClientRegister
      },
    ]
  },
  {
    path: '/deliverers',
    name: 'deliverers',
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'deliverer') return true;
      return false
    },
    children: [
      { 
        path: 'main',
        name: 'delivererMain',
        component: Deliverer
      },
      { 
        path: 'register',
        name: 'delivererRegister',
        component: DelivererRegister
      },
    ]
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'restaurant') return true;
      return false
    },
    children: [
      { 
        path: 'main',
        name: 'restaurantMain',
        component: Restaurant
      },
      { 
        path: 'register',
        name: 'restaurantRegister',
        component: RestaurantRegister
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
        component : AuthRegister,
      },
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
