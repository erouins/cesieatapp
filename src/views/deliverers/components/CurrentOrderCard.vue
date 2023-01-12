<template>
 <div class="order-card">
  <div class="card-header">Commande en cours de livraison</div>
  <div class="card-body">
    <div class="delivery-column">
      <div class="column-header">Adresse de livraison</div>
      <div class="customer-name">{{clientName}}</div>
      <div class="customer-address">{{deliveryAddress}}</div>
    </div>
    <div class="restaurant-column">
      <div class="column-header">Restaurant</div>
      <div class="restaurant-name" >{{restaurantName}}</div>
      <div class="restaurant-address">{{pickupAddress}}</div>
    </div>
  </div>
  <div class="card-footer">
    <button class="green-button"  @click="handleDelivered" >Order Delivered</button>
  </div>
</div>
</template>

<script>


const getDataUrl = "http://localhost:3001/deliverer/"+ localStorage.getItem("mongoUserId") +"/orders";
const url = "http://localhost:3001/deliverer/"+ localStorage.getItem("mongoUserId") +"/update-order";
import axios from 'axios';

export default {

name: "CurrentOrderCard",

data() {
    return {
      clientName:'',
      deliveryAddress:'',
      restaurantName:'',
      pickupAddress:'',
     form :{ 
      orderId: '',
      action :'deliver',
      deliveryId :  localStorage.getItem("mongoUserId"),}
    };
  },
  methods:{
    handleDelivered(){
          axios.put(url,
                  this.form,
              {
            headers: {
              'Authorization': `bearer ${localStorage.getItem("token")}` 
            },
            }
            ).then((response) => {
              console.log(response.data)
              if (response.status == 200){
                  this.$router.go();
                }
              })
    }
  },

mounted(){
   axios.get(getDataUrl,
              {
            headers: {
              'Authorization': `bearer ${localStorage.getItem("token")}` 
            }}
            ).then((response) => {
                this.clientName = response.data.client.firstName +" " +response.data.client.lastName;
                this.deliveryAddress = response.data.client.address +" " +response.data.client.zipCode+" " +response.data.client.city;
                this.restaurantName = response.data.restaurant.name;
                this.pickupAddress = response.data.restaurant.address +" " +response.data.restaurant.zipCode+" " +response.data.restaurant.city;
                this.form.orderId = response.data.id;
                 
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
.green-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.restaurant-name{
  margin-bottom: 20px;
}
.customer-name{
  margin-bottom: 20px;
}
</style>
