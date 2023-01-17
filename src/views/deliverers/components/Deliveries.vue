<template>
<div v-if="this.noOrder"><h1>No order available</h1></div>
<div v-else>
  <div v-show="!alreadyHaveOrder" class="order-container">
     <OrderCard 
      v-for="(order, index) in results" 
      :key="index" 
      :title="order.id" 
      :deliveryAddress="order.client.address + ' - ' + order.client.zipCode+ ' - ' + order.client.city"  
      :pickupAddress="order.restaurant.address + ' - ' + order.restaurant.zipCode+ ' - ' + order.restaurant.city" 
      :restaurantName="order.restaurant.name" 
      :clientName="order.client.firstName+ ' ' +order.client.lastName" 
    />
    
   
  </div>
   <div v-show="alreadyHaveOrder" class="order-container">
    <CurrentOrderCard /> 
  </div>
</div>
  
  
</template>

<script>
import OrderCard from "@/components/OrderCard.vue";
import CurrentOrderCard from "@/views/deliverers/components/CurrentOrderCard.vue"
import Axios from '@/services/callerService';

const url = "http://localhost:3001/deliverer/pending";
const firstRequestUrl = "http://localhost:3001/deliverer/"+ localStorage.getItem("mongoUserId") +"/orders";
export default {
  name: "Deliveries",
  components: {
    OrderCard,
    CurrentOrderCard,
  },

  data() {
    return {
      alreadyHaveOrder: true,
      noOrder:true,
      results: {},
     
    };
  },
  async mounted() {
    await Axios.get(firstRequestUrl).then((response) => {
      if(response.data == ''){
        this.noOrder = false
        
      }
      else{
        console.log(response.data == '');
        if(response.status == 200) {
        this.alreadyHaveOrder = true
     }else{
          Axios.get(url).then((response) => {
                this.results = response.data;
                console.log("results" + this.results)
              });
              }
      }
      
    });
   
   
   
  },

  methods: {},
};
</script>

<style scoped>

.order-container {
  display: flex;
  flex-wrap: wrap;
  
}

</style>