<template>
  <div class = "article_card_all">
    <div class = "article_card_items">
      <h2 class="card-name">{{ this.article["name"] }}</h2>
      <p class="card-price">{{ this.article["price"] }}$</p>
      <p class="card-description">{{ this.article["description"] }}</p>
    </div>
    <div class = "article_card_image">
      <img :src="this.img" alt="restaurant image" />
    </div>
  </div>
</template>

<script>
import imgUtils from '@/utils/imgUtils.js'
export default {
  props: {
    article:Object,
  },
  data(){
    return {
      img:this.article["image"]
    }
  },
  name: 'ArticleCard',
  methods:{
    async handleImageChange(e) {
      this.article.image = await imgUtils.handleImageChange(e);
    },
  }
}
</script>

<style>
  .article_card_all {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
</style>