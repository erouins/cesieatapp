<template>
  <div>
    <UserCard :lastName="this.results.lastName" :address="this.results.address" :firstName="this.results.firstName" :zipCode="this.results.zipCode" :city="this.results.city" :image="this.results.image"/>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import Axios from '@/services/callerService';


export default {
  name: "ClientProfil",
  components: {
    UserCard,
  },

  data() {
    return {
      results: {},
    };
  },
  mounted() {
    const url = "http://localhost:3001/client/" + localStorage.getItem("mongoUserId");
    console.log("results")
    Axios.get(url,
  ).then((response) => {
      this.results = response.data;
      console.log("results" + this.results)
    });
  },

  methods: {},
};
</script>