<template>
  <div class="menu_article_card">
    <ArticleCard v-bind:article="this.item" />
    <div class="add-to-order">
      <button class="green-button normal-font-size" @click="addToCart(this.item)">Add to cart</button>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  props: {
    item: Object,
  },
  methods: {
    addToCard(item){
      console.log("Added item :" + item);
      this.$store.commit('addToCard', item);
    }
  },
  components: {
    ArticleCard,
  },
};
</script>

<style>

</style>