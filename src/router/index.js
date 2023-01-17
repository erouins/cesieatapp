import { createRouter, createWebHistory } from 'vue-router'
import AuthRegister from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import OrdersPage from '@/components/Orders.vue'
import ClientMain from '@/views/clients/Main.vue'
import ClientHome from '@/views/clients/components/Home.vue'
import ClientRegister from '@/views/clients/Register.vue'
import ClientProfil from '@/views/clients/components/Profil.vue'
import ClientUpdateProfil from '@/views/clients/components/UpdateProfil.vue'
import ClientRestaurantPage from '@/views/clients/RestaurantPage.vue'
import DelivererMain from '@/views/deliverers/Main.vue'
import DelivererRegister from '@/views/deliverers/Register.vue'
import DelivererProfil from '@/views/deliverers/components/Profil.vue'
import Deliveries from '@/views/deliverers/components/Deliveries.vue'
import DelivererUpdateProfil from '@/views/deliverers/components/UpdateProfil.vue'
import RestaurantMain from '@/views/restaurants/Main.vue'
import RestaurantRegister from '@/views/restaurants/Register.vue'
import RestaurantCardContent from '@/views/restaurants/components/CardContent.vue'
import RestaurantProfil from '@/views/restaurants/components/Profil.vue'
import RestaurantUpdateProfil from '@/views/restaurants/components/UpdateProfil.vue'
import RestaurantUpdateArticle from '@/views/restaurants/components/UpdateArticle.vue'
import RestaurantUpdateMenu from '@/views/restaurants/components/UpdateMenu.vue'
import CreateArticle from '@/views/restaurants/components/CreateArticle.vue'
import CreateMenu from '@/views/restaurants/components/CreateMenu.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import UpdatePassword from '@/views/auth/UpdatePassword.vue'
import VerifyEmail from '@/views/auth/VerifyEmail.vue'
import SendVerificationEmail from '@/views/auth/SendVerificationEmail.vue'

import RestaurantsOrders from '@/views/restaurants/components/RestaurantsOrders.vue'

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
      if (localStorage.getItem('accountType') == 'client') return true;
      this.$router.push('/auth/login');
    },
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            name: 'ClientHome',
            component:  ClientHome,
          },
          {
            path: 'restaurant',
            name: 'restaurantPage',
            children: [
              {
                name: 'menusList',
                path: ':id/menus',
                component: ClientRestaurantPage,
                props: true,
              },
              {
                name: 'articlesList',
                path: ':id/articles',
                component: ClientRestaurantPage,
                props: true,
              },

            ]
          }
        ]
      },
      {
        path:'order',
        component: OrdersPage
      },
      {
        path:'historical',
        component: OrdersPage
      },
      {
        path: 'profil',
        children: [
          {
            path: 'update',
            component: ClientUpdateProfil
          },
          {
            path: '',
            component: ClientProfil,
          }
        ]
      },
      {
        path: "/:pathMatch(.*)*", redirect: "/clients/home"
      }
    ]
  },
  {
    path: '/deliverers',
    name: 'deliverers',
    component: DelivererMain,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if (localStorage.getItem('accountType') == 'deliverer') return true;
      this.$router.push('/auth/login');
    },
    children: [
      {
        path: 'home',
        name: 'delivererMain',
        component: Deliveries
      },
      {
        path:'historical',
        component: OrdersPage
      },
      {
        path: 'profil',
        children: [
          {
            path: 'update',
            component: DelivererUpdateProfil
          },
          {
            path: '',
            component: DelivererProfil
          }
        ]
      },
      {
        path: "/:pathMatch(.*)*", redirect: "/deliverers/home"
      }
    ]
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantMain,
    beforeEnter: (to, from) => {
      console.log(localStorage);
      if (localStorage.getItem('accountType') == 'restaurant') return true;
      this.$router.push('/auth/login');
    },
    children: [
      {
        path: 'home',
        name: 'restaurantMain',
        children:[
          {
            path: 'menus',
            children: [
              {
                path: '',
                component: RestaurantCardContent,
              },
              {
                path: ':id/update',
                name: 'menuUpdate',
                component: RestaurantUpdateMenu,
                props: true
              },
              {
                path: 'create',
                component: CreateMenu
              }
            ]
          },
          {
            path: 'articles',
            children: [
              {
                path: '',
                component: RestaurantCardContent,
              },
              {
                path: ':id/update',
                name: 'articleUpdate',
                props: true,
                component: RestaurantUpdateArticle
              },
              {
                path: 'create',
                component: CreateArticle
              }
            ]
          },
        ]
      },
      {
        path:'historical',
        component: OrdersPage
      },
      {
        path: 'profil',
        children: [
          {
            path: 'update',
            component: RestaurantUpdateProfil
          },
          {
            path: '',
            component: RestaurantProfil
          }
        ]
      },
      {
        path: 'order',
        component: RestaurantsOrders
      },
      {
        path: "/:pathMatch(.*)*", redirect: "/restaurants/home/menus"
      }
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
      {
        path : "forgot-password",
        name : "forgot-password",
        component : ForgotPassword,
      },
      {
        path : "reset-password",
        name : "reset-password",
        component : UpdatePassword,
        props: true
      },
      {
        path : "send-verification",
        name : "send-verification",
        component : SendVerificationEmail,
        props: true
      },
      {
        path : "verify-email",
        name : "verify-email",
        component : VerifyEmail,
        props: true
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*", redirect: "/restaurants/login", component: Login
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
