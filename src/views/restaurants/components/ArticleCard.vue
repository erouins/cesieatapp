<template>
  <div class="menu_article_card">
    <ArticleCard v-bind:article="this.item" />
    <button type='button' @click="goToUpdatePage">
      <img src="@/assets/modify.png" alt="" />
    </button>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import axios from "axios";

export default {
  name: "RestaurantArticleCard",
  props: {
    item: Object,
  },
  methods: {
    goToUpdatePage() {
      this.$store.commit('setArticle', this.item);
      console.log('in store : ', this.$store.getters.getArticle);
      this.$router.push({ name: 'articleUpdate', params: { id: this.item["id"].slice(-5)}});
    }
  },
  components: {
    ArticleCard,
  },
};
</script>

<style>

</style>