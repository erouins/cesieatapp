<template>
   <div class="boutons-menu-articles">
    <button class='select-button menu-articles' type="button" @click="redirectMenus">Menu</button>
    <button class='select-button menu-articles' type="button" @click="redirectArticles">Article</button>
  </div>
  <div class='cards'>
    <div
    v-for="(item, index) in this.listToBeDisplayed"
    :key="index"
    class="card_restau"
  >
    <component v-bind:is="component" v-bind:item="item" />
  </div>
  </div>
  <div>
  <button class='select-button new' @click="createFct">create new {{this.$route.path == "/restaurants/home/articles"?'article':'menu'}}</button>
  </div>
  
</template>

<script>
import RestaurantMenuCard from "@/views/restaurants/components/MenuCard.vue";
import RestaurantArticleCard from "@/views/restaurants/components/ArticleCard.vue";
import Axios from '@/services/callerService';
const url = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");//
export default {
  data() {
    return {
      listToBeDisplayed: [],
      menusList: [],
      articlesList: [],
      component: "",
    };
  },
  mounted() {
    Axios.get(url)
      .then((data) => {
        this.menusList = data["data"]["menus"];
        this.articlesList = data["data"]["articles"];
        if (this.$route.path == "/restaurants/home/articles") {
          this.listToBeDisplayed = this.articlesList;
          this.component = "RestaurantArticleCard";
        } else {
          this.listToBeDisplayed = this.menusList;
          this.component = "RestaurantMenuCard";
        }
      });
  },
  methods: {
    createFct(){
      if(this.$route.path == "/restaurants/home/articles")
        this.$router.push("/restaurants/home/articles/create");
      else{
        this.$router.push("/restaurants/home/menus/create");
      }
    },
    
    redirectMenus() {
      this.$router.push("/restaurants/home/menus");
      this.component = "RestaurantMenuCard";
      this.listToBeDisplayed = this.menusList;
   
    },
    redirectArticles() {
      this.$router.push("/restaurants/home/articles");
      this.component = "RestaurantArticleCard";
      this.listToBeDisplayed = this.articlesList;
    },
  },
  name: "RestaurantCardContent",
  components: {
    RestaurantMenuCard,
    RestaurantArticleCard,
  },
};
</script>

<style>

.new{
        position: fixed;
        bottom: 0;
    margin-bottom: 20px;
}
.menu-articles{
        
       
        margin-top: 20px;
}

.boutons-menu-articles{
        position: fixed;
        display: inline-flex;
      
}


.cards{
  margin: 10%;
  height: 60vh;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-gap: 8px;
}

.card_restau {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>