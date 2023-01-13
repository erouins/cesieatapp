<template>
    <div class="restaurant-card-content">
        <div class="card-image-contener">
            <img class="restaurant-card-image" :src="this.img" alt="restaurant image" />
        </div>
        <div class="restaurant-card-text">
            <div class="restaurant-card-title">{{ this.restaurant["name"] }}</div>
            <div class="restaurant-card-description">{{ this.restaurant["description"] }}</div>
            <div class="restaurant-card-address"> Address: {{ this.restaurant["address"] }}<br>{{ this.restaurant["city"] }}</div>
        </div>
    </div>
</template>

<script>
import imgUtils from '@/utils/imgUtils.js'
export default {
  props: {
    restaurant: Object,
  },
  data(){
    return {
      img:this.restaurant["image"]
    }
  },
  name: 'ArticleCard',
  methods:{
    async handleImageChange(e) {
      this.restaurant.image = await imgUtils.handleImageChange(e);
    },
  }
}

</script>

<style>
    .restaurant-card-text {
        text-align: left;
    }

    .card-image-contener {
        border-radius: 10px;
        width: 300px;
        height: 150px;
        overflow: hidden;
    }

    .restaurant-card-image {
        width: 100%;
    }

    .restaurant-card-title {
        font-size: 1.5em;
        padding-top: 5px;
        font-weight: bold;
    }

    
    .restaurant-card-description {
        padding-top: 5px;
    }

    .restaurant-card-address {
        padding-top: 5px;
        font-size: 0.9em;
    }

    
</style>