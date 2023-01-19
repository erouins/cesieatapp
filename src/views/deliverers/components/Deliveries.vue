<template>
<div>
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
  <div>
        <p v-if="emptyOrders" > There is nothing here at the moment  </p>
  </div>
</div>
  
  
</template>

<script>
import OrderCard from "@/components/OrderCard.vue";
import CurrentOrderCard from "@/views/deliverers/components/CurrentOrderCard.vue"
import Axios from '@/services/callerService';
import io from 'socket.io-client';

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
      socket: null,
      emptyOrders: false,
      alreadyHaveOrder: false,
  
      results: {},
    };
  },
  async mounted() {
        this.getOrders()
        this.socket = io('http://localhost:3001');
        this.socket.on('connect', () => {
        console.log('connected')
        });
        this.socket.on('orderModified', (message) => {
            console.log("orderModified")
            this.getOrders()
        });
   
   
   
   
  },

  methods: {
   async getOrders (){
       await Axios.get(firstRequestUrl).then((response) => {
      
        if(response.status == 200) {
        this.alreadyHaveOrder = true
     }else{
          Axios.get(url).then((response) => {
                this.results = response.data;
                if(this.results == ''){
                  this.emptyOrders = true;
                  console.log("pas de commandes")
                }else{
                   this.emptyOrders = false;
                }
              });
              }
      
      
    });
    }

  },
};
</script>

<style scoped>

.order-container {
  display: flex;
  flex-wrap: wrap;
  
}

</style>