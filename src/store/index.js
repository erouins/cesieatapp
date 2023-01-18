import { getTransitionRawChildren } from 'vue';
import { createStore } from 'vuex'

export default createStore({
  state: {
    article: Object,
    menu: Object,
    restaurant: Object,
    cart: Array,
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
    getCart(state){
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
    addToCart(state, item) {
      if (typeof state.cart === 'function') {
        state.cart = [[],[]]
      }
      if (typeof item.articles === 'undefined') { // if it's an article
        state.cart[0].push(item.id)
      } else {
        state.cart[1].push(item.id) // if it's a menus
      }
      console.log(state.cart)
    },
    removeToCart(state, item, type) {
      if (typeof state.cart === 'Object') {
        if (state.cart[type] != []) {
          state.cart[type].splice(state.cart.indexOf(item), 1);
        } 
        console.log(state.cart)
      }
    },
    clearCart(state) {
      state.cart = [[],[]]
      console.log(state.cart)
    }
  },
  actions: {
  },
  modules: {
  }
});
