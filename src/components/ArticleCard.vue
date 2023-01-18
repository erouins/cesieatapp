<template>
  <div class="menu_article_content">
    <div class="card-image-contener">
      <img class="menu_article_image" :src="this.img" alt="image of article" />
    </div>
    <div class="menu_article_text">
      <div class="menu-article-name">{{ this.article["name"] }}</div>
      <div class="menu-article-price">{{ this.article["price"] }}$</div>
      <div class="menu-article-description">{{ this.article["description"] }}</div>
    </div>
  </div>
</template>

<script>
import imgUtils from '@/utils/imgUtils.js'
export default {
  props: {
    article: Object,
  },
  data() {
    return {
      img: this.article["image"]
    }
  },
  name: 'ArticleCard',
  methods: {
    async handleImageChange(e) {
      this.article.image = await imgUtils.handleImageChange(e);
    },
  }
}
</script>

<style>

</style>