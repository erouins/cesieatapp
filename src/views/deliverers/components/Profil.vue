<template>
  <div>
    <UserCard :lastName="this.results.lastName" :address="this.results.address" :firstName="this.results.firstName" :zipCode="this.results.zipCode" :city="this.results.city" :image="this.results.image"/>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import axios from 'axios';

const url = "http://localhost:3001/deliverer/" + localStorage.getItem("mongoUserId");
console.log(url)
export default {
  name: "DelivererProfil",
  components: {
    UserCard,
  },

  data() {
    return {
      results: {},
    };
  },
  async mounted() {
    console.log("results")
    await axios.get(url,
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