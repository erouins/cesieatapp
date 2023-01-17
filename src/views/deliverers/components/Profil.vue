<template>
<UserCard :lastName="this.results.lastName" :address="this.results.address" :firstName="this.results.firstName" :zipCode="this.results.zipCode" :city="this.results.city" :image="this.results.image"/>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import Axios from '@/services/callerService';

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
    const url = "http://localhost:3001/deliverer/" + localStorage.getItem("mongoUserId");
    console.log("results")
    await Axios.get(url).then((response) => {
      this.results = response.data;
      console.log("results" + this.results)
    });
  },

  methods: {},
};
</script>