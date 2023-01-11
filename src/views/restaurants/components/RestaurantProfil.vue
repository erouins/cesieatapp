<template>
  <div>
    <UserCard :name="this.results.name" :address="this.results.address" :description="this.results.description"/>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import axios from 'axios';

const url = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");
console.log(url)
export default {
  name: "RestaurantProfil",
  components: {
    UserCard,
  },

  data() {
    return {
      results: {},
    };
  },
  mounted() {
    console.log("results")
    axios.get(url,
    {
  headers: {
    'Authorization': `bearer ${localStorage.getItem("token")}` 
  }}
  ).then((response) => {
      this.results = response.data;
      console.log("results" + this.results)
    });
  },

  methods: {},
};
</script>