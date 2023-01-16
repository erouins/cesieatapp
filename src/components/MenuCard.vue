<template>
  <div class = "menu_card_all">
    <div class = "menu_card_items">
      <h2 class="card-name">{{ this.menu["name"] }}</h2>
      <p class="card-price">{{ this.menu["price"] }}$</p>
      <p class="card-description">{{ this.menu["description"] }}</p>
    </div>
    <div class = "menu_card_image">
      <img :src="this.img" alt="restaurant image" />
    </div>
  </div>
</template>

<script>
import imgUtils from '@/utils/imgUtils.js'
export default {
  props: {
    menu:Object,
  },
  data(){
    return {
      img:this.menu["image"]
    }
  },
  name: 'MenuCard',
  methods:{
    async handleImageChange(e) {
      this.menu.image = await imgUtils.handleImageChange(e);
    },
  }
}
</script>

<style>
  .menu_card_all {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
</style>