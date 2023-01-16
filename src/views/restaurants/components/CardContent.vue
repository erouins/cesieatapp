<template>
  <div>
    <button type="button" @click="redirectMenus">Menu</button>
    <button type="button" @click="redirectArticles">Article</button>
  </div>
  <div v-for="(item, index) in this.listToBeDisplayed" :key="index" class="card_restau">
    <component v-bind:is="component" v-bind:item="item" />
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
    redirectMenus() {
      this.$router.push("/restaurants/menus");
      this.component = "RestaurantMenuCard";
      this.listToBeDisplayed = this.menusList;
    },
    redirectArticles() {
      this.$router.push("/restaurants/articles");
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