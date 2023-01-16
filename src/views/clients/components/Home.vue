<template>
  <div class="card-contener">
    <div v-for="(item, index) in this.restaurantList" :key="index" class="restaurant-card">
      <RestaurantCard v-bind:restaurant="item" />
    </div>
  </div>
</template>

<script>
import RestaurantCard from "@/views/clients/components/RestaurantCard.vue";
import axios from "axios";
const url = "http://localhost:3001/restaurant/"

export default {
  name: "ClientHome",
  data() {
    return {
      restaurantList: []
    };
  },
  mounted() {
    axios
      .get(url, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        this.restaurantList = data['data'];
        console.log('Data:', data['data']);
      });
  },
  methods: {

  },
  components: {
    RestaurantCard
  }
};


</script>

<style>
.card-contener {
  height: 100%;
  width: 100%;
  padding-top: 4px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.restaurant-card {
  width: 300px;
  height: 240px;
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

.restaurant-card:hover {
  box-shadow: 5px 0px 40px rgba(0, 0, 0, 40%);
  transition: 0.5s;
}
</style>