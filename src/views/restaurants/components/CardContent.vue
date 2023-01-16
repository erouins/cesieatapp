<template>
  <div>
    <button class='select-button' type="button" @click="redirectMenus">Menu</button>
    <button class='select-button' type="button" @click="redirectArticles">Article</button>
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
  <button class='select-button' @click="createFct">create new {{this.$route.path == "/restaurants/articles"?'article':'menu'}}</button>
  </div>
  
</template>

<script>
import RestaurantMenuCard from "@/views/restaurants/components/MenuCard.vue";
import RestaurantArticleCard from "@/views/restaurants/components/ArticleCard.vue";
import axios from "axios";
const url =
  "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");
export default {
  data() {
    return {
      listToBeDisplayed: [],
      menusList : [],
      articlesList : [],
      component: "",
    };
  },
  mounted() {
    axios
      .get(url, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        this.menusList = data["data"]["menus"];
        this.articlesList = data["data"]["articles"];
        if (this.$route.path == "/restaurants/articles") {
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
      if(this.$route.path == "/restaurants/articles")
        this.$router.push("/restaurants/article/create");
      else{
        this.$router.push("/restaurants/menus/create");
      }
    },
    
    redirectMenus() {
      this.$router.push("/restaurants/menus");
      this.component = "RestaurantMenuCard";
      this.listToBeDisplayed = this.menusList;
      this.createFct = 'gotoCreateMenu';
    },
    redirectArticles() {
      this.$router.push("/restaurants/articles");
      this.component = "RestaurantArticleCard";
      this.listToBeDisplayed = this.articlesList;
      this.createFct = 'gotoCreateArticle';
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
.cards{
  margin: 10%;
  height: 60vh;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.card_restau {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>