import { createStore } from 'vuex'

export default createStore({
  state: {
    article: Object,
    menu: Object,
    restaurant: Object
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
    }
  },
  actions: {
  },
  modules: {
  }
});
