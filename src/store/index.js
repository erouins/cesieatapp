import { getTransitionRawChildren } from 'vue';
import { createStore } from 'vuex'

export default createStore({
  state: {
    article: Object,
    menu: Object,
    restaurant: Object,
    cart: Array
  },
  getters: {
    getArticle(state){
      return state.article;
    },
    getMenu(state){
      return state.menu;
    },
    getRestaurant(state){
      return state.restaurant;
    },
    getcart(state){
      return state.cart;
    }
  },
  mutations: {
    setArticle(state, article){
      state.article = article;
    },
    setMenu(state, menu){
      state.menu = menu;
    },
    setRestaurant(state, restaurant){
      state.restaurant = restaurant;
    }, 
    addTocart(state, item) {
      if (typeof state.cart === 'function') {
        state.cart = []
      }
      state.cart.push(item)
      console.log(state.cart)
    },
    removeTocart(state, item) {
      if (typeof state.cart === 'Object' && state.cart != []) {
        state.cart.splice(state.cart.indexOf(item), 1);
        console.log(state.cart)
      }
    },
    clearcart(state) {
      state.cart = []
      console.log(state.cart)
    }
  },
  actions: {
  },
  modules: {
  }
});
