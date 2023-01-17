<template>
  <div class="menu_article_content">
    <div class="card-image-contener">
      <img class="menu_article_image" :src="this.img" alt="image of menu" />
    </div>
    <div class="menu_article_text">
      <div class="menu-article-name">{{ this.menu["name"] }}</div>
      <div class="menu-article-price">{{ this.menu["price"] }}$</div>
      <div class="menu-article-description">{{ this.menu["description"] }}</div>
    </div>
  </div>
</template>

<script>
import imgUtils from '@/utils/imgUtils.js'
export default {
  props: {
    menu: Object,
  },
  data() {
    return {
      img: this.menu["image"]
    }
  },
  name: 'MenuCard',
  methods: {
    async handleImageChange(e) {
      this.menu.image = await imgUtils.handleImageChange(e);
    },
  }
}
</script>

<style>
.menu_article_image {
  height: 100%;
}

.menu_article_text {
  text-align: left;
}

.menu-article-name {
  font-size: 1.5em;
  padding-top: 5px;
  font-weight: bold;
}

.menu-article-description {
  padding-top: 5px;
}

.menu-article-price {
  padding-top: 5px;
  font-size: 0.9em;
}
</style>