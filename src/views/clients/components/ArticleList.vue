<template>
  <div class="menu_article_card">
    <ArticleCard v-bind:article="this.item" />
    <div class="add-to-order">
      <button class="green-button normal-font-size" @click="addToCart()">Add to cart</button>
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
    addToCart(){
      console.log("Added item :" + this.item.id);
      this.$store.commit('addToCart', this.item);
    }
  },
  components: {
    ArticleCard,
  },
};
</script>

<style>

</style>