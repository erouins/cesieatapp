<template>
  <div  v-if="showDiv">
    <div class="containerr" >
      <h2>{{ container1Title }}</h2>
      <div class="cards-containerr">
        <OrderCardRestaurant 
      v-for="(card, index) in pendingOrders" 
       :key="index" 
      :title="card.id"
      :clientName="card.client.firstName + ' '+card.client.lastName"
      :menusNumber="Object.keys(card.menus).length"
      :articlesNumber="Object.keys(card.articles).length"
      :status="card.status"
     @click="handleTest(card.id)" 
    />
      </div>
    </div>
    <div class="containerr" >
      <h2>{{ container6Title }}</h2>
      <div class="cards-containerr">
        <OrderCardRestaurant 
      v-for="(card, index) in restaurantAcceptedOrders" 
       :key="index" 
      :title="card.id"
      :clientName="card.client.firstName + ' '+card.client.lastName"
      :menusNumber="Object.keys(card.menus).length"
      :articlesNumber="Object.keys(card.articles).length"
      :status="card.status"
     @click="handleTest(card.id)" 
    />
      </div>
    </div>
    <div class="containerr" >
      <h2>{{ container2Title }}</h2>
      <div class="cards-containerr">
        <OrderCardRestaurant 
      v-for="(card, index) in acceptedOrders" 
       :key="index" 
      :title="card.id"
      :clientName="card.client.firstName + ' '+card.client.lastName"
      :menusNumber="Object.keys(card.menus).length"
      :articlesNumber="Object.keys(card.articles).length"
      :status="card.status"
     @click="handleTest(card.id)" 
    />
      </div>
    </div>
    <div class="containerr" >
      <h2>{{ container4Title }}</h2>
      <div class="cards-containerr">
        <OrderCardRestaurant 
      v-for="(card, index) in deliverOrders" 
       :key="index" 
      :title="card.id"
      :clientName="card.client.firstName + ' '+card.client.lastName"
      :menusNumber="Object.keys(card.menus).length"
      :articlesNumber="Object.keys(card.articles).length"
      :status="card.status"
      @click="handleTest(card.id)" 
    />
      </div>
    </div>
    <div class="containerr" >
      <h2>{{ container5Title }}</h2>
      <div class="cards-containerr" >
        <OrderCardRestaurant 
      v-for="(card, index) in doneOrders" 
      :key="index" 
      :title="card.id"
      :clientName="card.client.firstName + ' '+card.client.lastName"
      :menusNumber="Object.keys(card.menus).length"
      :articlesNumber="Object.keys(card.articles).length"
      :status="card.status"
      @click="handleTest(card.id)" 
    />
      </div>
    </div>
    <div class="containerr">
      <h2>{{ container3Title }}</h2>
      <div class="cards-containerr"  >
        <OrderCardRestaurant 
      v-for="(card, index) in rejectedOrders" 
       :key="index" 
      :title="card.id"
      :clientName="card.client.firstName + ' '+card.client.lastName"
      :menusNumber="Object.keys(card.menus).length"
      :articlesNumber="Object.keys(card.articles).length"
      :status="card.status"
     @click="handleTest(card.id)" 
    />
      </div>
    </div>
  </div>
  <div v-if="!showDiv">
      <OrderDetails :order="this.order"/>
      <div>
         <button class="green-button" @click="GoBack">Back</button>
      </div>
  </div>
</template>



<script>
import OrderCardRestaurant from "@/views/restaurants/components/OrderCardRestaurant.vue";
import OrderDetails from "@/views/restaurants/components/OrderDetails.vue";

import Axios from '@/services/callerService';
import io from 'socket.io-client';

export default {

  components: {
    OrderCardRestaurant,
    OrderDetails,
  },

  mounted(){
    
        this.getdatas()
        this.socket = io('http://localhost:3001');
        this.socket.on('connect', () => {
        console.log('connected')
        });
        this.socket.on('orderModified', (message) => {
            console.log("orderModified")
            this.getdatas()
        });
  },

  data() {
    return {
      socket: null,
      showDiv: true,
      container1Title: "Pending Orders",
      pendingOrders: [],
      container2Title: "To do Orders",
      acceptedOrders: [],
      container3Title: "Rejected Orders",
      rejectedOrders: [],
      container4Title: "Delivered Orders",
      deliverOrders: [],
      container5Title: "Orders Done",
      doneOrders: [],
      container6Title: "Waiting for a delivery person",
      restaurantAcceptedOrders: [],
      order: Object,
    }
  },

  methods:{
    getdatas(){
      const url = 'http://localhost:3001/restaurant/'+localStorage.getItem('mongoUserId')+'/orders'
           this.pendingOrders = []
            this.acceptedOrders = []
            this.rejectedOrders = []
            this.deliverOrders = []
            this.doneOrders = []
            this.restaurantAcceptedOrders = []
          Axios.get(url).then((response) => {
                      console.log(response)
                    for (let i = 0; i < Object.keys(response.data).length ; i++){
                        if (response.data[i].status == 'pending'){
                            this.pendingOrders.push(response.data[i])
                        }else if (response.data[i].status == 'accepted'){
                            this.acceptedOrders.push(response.data[i])
                        }else if (response.data[i].status == 'rejected'){
                            this.rejectedOrders.push(response.data[i])
                        }else if (response.data[i].status == 'deliver'){
                            this.deliverOrders.push(response.data[i])
                        }else if (response.data[i].status == 'done'){
                            this.doneOrders.push(response.data[i])
                        }else if (response.data[i].status == 'restaurantAccepted'){
                            this.restaurantAcceptedOrders.push(response.data[i])
                        }
                    }
                      
                      });
    },
    handleTest(idOforder) {
       console.log("results", idOforder )
      const Url = "http://localhost:3001/restaurant/"+ localStorage.getItem("mongoUserId") +"/orders"
      Axios.get(Url).then((response) => {
      
       for (let i = 0; i < Object.keys(response.data).length ; i++){
              if (response.data[i].id == idOforder){
                    this.order = response.data[i]
                    console.log("results", this.order )
                       this.showDiv = false
                }
       }

      // this.caculateTotalPrice();
      // this.menus = this.order["menus"];
      // this.articles = this.order["articles"];
      // this.orderId = this.order['id'];
    });
      
    },
    GoBack(){
       this.showDiv = true
    }
  }
}
</script>

<style scoped>
.containerr {
  margin: 16px 0;
}

.cards-containerr {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 8px;
 
}

.cards {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
  height: 200px;
}
</style>