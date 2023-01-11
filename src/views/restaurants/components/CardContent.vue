<template>
  <div>
    <button>Menu</button>
    <button>Article</button>
  </div>
  <div>
    <RestaurantMenuCard name="LOLrr" price = "NICE" articles="OK" imgSrc=""/>
  </div>
</template>

<script>
import RestaurantMenuCard from "@/views/restaurants/components/MenuCard.vue";
import axios from "axios";
const url = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");
export default {
  data(){
    return {
      restaurantMenus:[],
      restaurantArticles:[],
    }
  },
  mounted() {
    axios
      .get(url, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        this.restaurantMenus = data["data"]["menus"];
        this.restaurantArticles = data["data"]["articles"];
      });
  },
  methods: {
  },
  name: "RestaurantCardContent",
  components: {
    RestaurantMenuCard,
  },
};
</script>