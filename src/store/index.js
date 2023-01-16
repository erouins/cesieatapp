import { createStore } from 'vuex'

export default createStore({
  state: {
    article: Object,
    menu: Object,
  },
  getters: {
    getArticle(state){
      return state.article;
    },
    getMenu(state){
      return state.menu;
    }
  },
  mutations: {
    setArticle(state, article){
      state.article = article;
    },
    setMenu(state, menu){
      state.menu = menu;
    }
  },
  actions: {
  },
  modules: {
  }
});
