<template>
  <div class="select-button-container">
    <button class='green-button' type="button" @click="redirectMenus">Menu</button>
    <button class='green-button' type="button" @click="redirectArticles">Article</button>
  </div>
  <div class='card-contener'>
    <div v-for="(item, index) in this.listToBeDisplayed" :key="index" class="card_restau">
      <component v-bind:is="component" v-bind:item="item" />
    </div>
  </div>
  <div class="space-buttom">
    <button class='green-button' @click="createFct">create new {{this.$route.path =="/restaurants/home/articles" ? 'article' : 'menu'}}</button>
  </div>
</template>

<script>
import RestaurantMenuCard from "@/views/restaurants/components/MenuCard.vue";
import RestaurantArticleCard from "@/views/restaurants/components/ArticleCard.vue";
import Axios from '@/services/callerService';
import io from 'socket.io-client';

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
      this.getRestaurants()
      this.socket = io('http://localhost:3001');
      this.socket.on('connect', () => {
      console.log('connected')
      });
      this.socket.on('articleModified', (message) => {
          console.log("articleModified")
          this.getRestaurants()
      });
      this.socket.on('menuModified', (message) => {
          console.log("menuModified")
          this.getRestaurants()
      });
  },
  methods: {
    getRestaurants (){
      const url = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");//
      console.log(url)
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

    createFct(){
      if(this.$route.path == "/restaurants/home/articles")
        this.$router.push("/restaurants/home/articles/create");
      else {
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
.card_restau {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>