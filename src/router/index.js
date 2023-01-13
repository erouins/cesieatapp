import { createRouter, createWebHistory } from 'vue-router'
import AuthRegister from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import ClientMain from '@/views/clients/Main.vue'
import ClientHome from '@/views/clients/components/Home.vue'
import ClientRegister from '@/views/clients/Register.vue'
import ClientProfil from '@/views/clients/components/Profil.vue'
import ClientUpdateProfil from '@/views/clients/components/UpdateProfil.vue'
import DelivererMain from '@/views/deliverers/Main.vue'
import DelivererRegister from '@/views/deliverers/Register.vue'
import DelivererProfil from '@/views/deliverers/components/Profil.vue'
import DelivererUpdateProfil from '@/views/deliverers/components/UpdateProfil.vue'
import RestaurantMain from '@/views/restaurants/Main.vue'
import RestaurantRegister from '@/views/restaurants/Register.vue'
import RestaurantCardContent from '@/views/restaurants/components/CardContent.vue'
import RestaurantProfil from '@/views/restaurants/components/Profil.vue'
import RestaurantUpdateProfil from '@/views/restaurants/components/UpdateProfil.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  { 
    path: '/clients/register',
    name: 'clientRegister',
    component: ClientRegister,
    beforeEnter: (to, from) => {
      //TODO BLOQUER SI PAS FROM AUTH/LOGIN
    },
  },
  { 
    path: '/deliverers/register',
    name: 'delivererRegister',
    component: DelivererRegister,
    beforeEnter: (to, from) => {
      //TODO BLOQUER SI PAS FROM AUTH/LOGIN
    },
  },
  { 
    path: '/restaurants/register',
    name: 'restaurantRegister',
    component: RestaurantRegister,
    beforeEnter: (to, from) => {
      //TODO BLOQUER SI PAS FROM AUTH/LOGIN
    },
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientMain,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'client') return true;
      this.$router.push('auth/login');
    },
    children: [
      { 
        path: 'main',
        name: 'ClientHome',
        component: ClientHome,
      },
      {
        path: 'profil',
        
        children:[
          {
            path:'update',
            component: ClientUpdateProfil
          },
          {
            path: '',
            component: ClientProfil,
          }
        ]
      },
    ]
  },
  {
    path: '/deliverers',
    name: 'deliverers',
    component: DelivererMain,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'deliverer') return true;
      this.$router.push('auth/login');
    },
    children: [
      { 
        path: 'main',
        name: 'delivererMain',
        component: DelivererMain
      },
      
      {
        path: 'profil',
        children:[
          {
            path:'update',
            component: DelivererUpdateProfil
          },
          {
            path:'',
            component: DelivererProfil
          }
        ]
      },
    ]
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantMain,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if(localStorage.getItem('accountType') == 'restaurant') return true;
      this.$router.push('auth/login');
    },
    children: [
      { 
        path: 'main',
        name: 'restaurantMain',
        component: RestaurantCardContent
      },
      {
        path: 'cards',
        component: RestaurantCardContent,
        children:[
          {
            path:'menus',
            component: 'MenuCard',
            children: [
              {
                path: ':id/update'
              }
            ]
          },
          {
            path:'articles',
            component: 'ArticleCard',
            children: [
              {
                path: ':id/update'
              }
            ]
          },
        ]
      },
      {
        path: 'profil',
        children:[
          {
            path:'update',
            component: RestaurantUpdateProfil
          },
          {
            path:'',
            component: RestaurantProfil
          }
        ]
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
    path: "/:pathMatch(.*)*", redirect :"/auth/login", component: Login
  }
  
]

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
//component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

export default router
