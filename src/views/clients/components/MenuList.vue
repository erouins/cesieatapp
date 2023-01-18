<template>
  <div class="menu_article_card">
    <MenuCard v-bind:menu="this.item" />
    <div class="add-to-order">
      <button class="normal-font-size green-button" @click="addToCart()">Add to cart</button>
    </div>
  </div>
</template>

<script>
import MenuCard from "@/components/MenuCard.vue";
export default {
  props: {
    item: Object,
  },
  mounted() {

  },
  methods: {
    addToCart(){
      console.log("Added item :" + this.item);
      this.$store.commit('addToCart', this.item);
    }
  },
  components: {
    MenuCard,
  },
};
</script>

<style>
.menu_article_card {
  width: 300px;
  cursor: pointer;
  padding: 12px;
  margin: 10px;
  border-radius: 10px;
  font-size: 1em;
  color: #2c3e50;
  background: #fefefe;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
  transition: 0.5s;
}
</style>