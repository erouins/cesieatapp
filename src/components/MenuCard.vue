<template>
  <div class="card">
    <div class="card-left">
      <h2 class="card-name">{{ name }}</h2>
      <h3 class="card-price">{{ price }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
    <div class="card-right">
      <img class="card-img" :src="imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
    props: {
    name: String,
    price: String,
    description: String,
    imgSrc: String,
  },
    name: 'MenuCard'
}
</script>

<style>
.card {
  display: flex;
}

.card-left {
  flex: 1;
  padding: 10px;
}

.card-right {
  flex: 1;
}
</style>