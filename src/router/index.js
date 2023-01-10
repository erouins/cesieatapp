import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import client from '@/views/clients/Main.vue'
import Deliverer from '@/views/deliverers/Main.vue'
import Restaurant from '@/views/restaurants/Main.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: '/clients',
    name: 'clients',
    children: [
      { 
        path: 'main',
        name: 'clientMain',
        component: client,
      },
    ]
    
  },
  {
    path: '/deliverers',
    name: 'deliverers',
    children: [
      { 
        path: 'main',
        name: 'delivererMain',
        component: Deliverer
      },
    ]
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    children: [
      { 
        path: 'main',
        name: 'restaurantMain',
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
