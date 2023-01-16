<template>
  <div class="article_card">
    <ArticleCard v-bind:article="this.item" />
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
      this.$router.push({ name: 'articleUpdate', params: { id: this.item["id"][0] + this.item["id"][1] + this.item["id"][2] } });
    }
  },
  components: {
    ArticleCard,
  },
};
</script>

<style>
.article_card {
  align-items: center;
  left: 50%;
  display: flex;
  grid-template-columns: 5fr 1fr;
  width: 50%;
  height: 20%;
  margin: 20px;
  align-items: center;
  padding: 1em;
  border-radius: 15px;
  background: #fefefe;
  transition: box-shadow 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}
</style>