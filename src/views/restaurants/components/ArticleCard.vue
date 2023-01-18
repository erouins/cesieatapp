<template>
  <div class="menu_article_card">
    <ArticleCard v-bind:article="this.item" />
    <button type="button" @click="goToUpdatePage">
      <img src="@/assets/modify.png" alt="" />
    </button>
    <button type="button" @click="removeArticle">
      <img src="@/assets/remove.png" alt="" />
    </button>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import Axios from "@/services/callerService";

const deleteArticleUrl =
  "http://localhost:3001/restaurant/" +
  localStorage.getItem("mongoUserId") +
  "/article/delete";
export default {
  name: "RestaurantArticleCard",
  props: {
    item: Object,
  },
  methods: {
    goToUpdatePage() {
      this.$store.commit("setArticle", this.item);
      console.log("in store : ", this.$store.getters.getArticle);
      this.$router.push({
        name: "articleUpdate",
        params: { id: this.item["id"].slice(-5) },
      });
    },
    removeArticle() {
      console.log('article id: ',this.item["id"])
      Axios.delete(deleteArticleUrl, {data:{
        articleId: this.item["id"],
        userId: localStorage.getItem("userId"),
      }
      }).then((response) => {
        console.log("article deleted");
      });
    },
  },
  components: {
    ArticleCard,
  },
};
</script>

<style>
</style>