<template>
 <div class="order-card">
  <div class="card-header">Order in progress</div>
  <div class="card-body">
    <div class="delivery-column">
      <div class="column-header">Delivery address</div>
      <div class="customer-name">{{clientName}}</div>
      <div class="customer-address">{{deliveryAddress}}</div>
    </div>
    <div class="restaurant-column">
      <div class="column-header">Restaurant</div>
      <div class="restaurant-name" >{{restaurantName}}</div>
      <div class="restaurant-address">{{pickupAddress}}</div>
    </div>
  </div>
  <div class="order-buttons">
    <button v-bind:style="{ display: OrderDeivered ? 'none' : 'block' }" class="green-button"  @click="handleTake" >Order taken over</button>
    <button v-bind:style="{ display: OrderDeivered ? 'block' : 'none' }" class="green-button" @click="handleDelivered">Order Delivered</button>
  </div>
</div>
</template>

<script>


const getDataUrl = "http://localhost:3001/deliverer/"+ localStorage.getItem("mongoUserId") +"/orders";
const url = "http://localhost:3001/deliverer/"+ localStorage.getItem("mongoUserId") +"/update-order";
import Axios from '@/services/callerService';

export default {

name: "CurrentOrderCard",

data() {
    return {
      OrderDeivered: false,
      clientName:'',
      deliveryAddress:'',
      restaurantName:'',
      pickupAddress:'',
     form :{ 
      orderId: '',
      action :'',
      deliveryId :  localStorage.getItem("mongoUserId"),}
    };
  },
  methods:{
    handleTake(){
      this.form.action = 'take-from-restaurant'
          Axios.put(url,
                  this.form).then((response) => {
              console.log(response.data)
              if (response.status == 200){
                  this.$router.go();
                }
              })
    },
     handleDelivered(){
      this.OrderDeivered = true
      this.form.action = 'deliver'
          Axios.put(url,
                  this.form).then((response) => {
              console.log(response.data)
              if (response.status == 200){
                   this.$router.go();
                }
              })
    }
  },

mounted(){
   Axios.get(getDataUrl).then((response) => {
    console.log('data: ',response.data);
                this.clientName = response.data.client.firstName +" " +response.data.client.lastName;
                this.deliveryAddress = response.data.client.address +" " +response.data.client.zipCode+" " +response.data.client.city;
                this.restaurantName = response.data.restaurant.name;
                this.pickupAddress = response.data.restaurant.address +" " +response.data.restaurant.zipCode+" " +response.data.restaurant.city;
                this.form.orderId = response.data.id;
                response.data.status == 'deliver' ? this.OrderDeivered = true : this.OrderDeivered =false;
                 
                console.log("results" + this.results)
              });
}

}
</script>

<style>

#delivery-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
}
.card-header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: auto;
  margin-bottom: 50px;
}
.card-body {
  display: flex;
  justify-content: space-between;
}
.delivery-column, .restaurant-column {
  width: 45%;
}
.column-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.restaurant-name{
  margin-bottom: 20px;
}
.customer-name{
  margin-bottom: 20px;
}
</style>
