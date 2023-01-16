<template>
    <UserCard :name="this.results.name" :address="this.results.address" :description="this.results.description" :zipCode="this.results.zipCode" :city="this.results.city" :image="this.results.image"/>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import Axios from '@/services/callerService';

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
  async mounted() {
    console.log("results")
    await Axios.get(url).then((response) => {
      this.results = response.data;
      console.log("results" + this.results)
    });
  },

  methods: {},
};
</script>