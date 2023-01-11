import { createRouter, createWebHistory } from 'vue-router'
import AuthRegister from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Home from '@/views/public/Home.vue'
import ClientMain from '@/views/clients/Main.vue'
import ClientRegister from '@/views/clients/Register.vue'
import DelivererMain from '@/views/deliverers/Main.vue'
import DelivererRegister from '@/views/deliverers/Register.vue'
import RestaurantMain from '@/views/restaurants/Main.vue'
import RestaurantRegister from '@/views/restaurants/Register.vue'
import RestaurantCardContent from '@/views/restaurants/components/CardContent.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
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
        name: 'ClientMain',
        component: ClientMain,
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
        path: 'register',
        name: 'delivererRegister',
        component: DelivererRegister
      },
    ]
  },
  { 
    path: '/restaurants/register',
    name: 'restaurantRegister',
    component: RestaurantRegister
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
                path: ':id/edit'
              }
            ]
          },
          {
            path:'articles',
            component: 'ArticleCard',
            children: [
              {
                path: ':id/edit'
              }
            ]
          },
        ]
      }
      
      // {
      //   path: 'profile',
      //   component: RestaurantProfile,
      //   children:[
      //     {
      //       path:'edit',
      //       component: RestaurantEditProfile
      //     }
      //   ]
      // },
      
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
