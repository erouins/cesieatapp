<template>
  <div class="order-card">
    <h2>Order N° : {{ title.slice(-5) }}</h2>
    <div class="order-details">
      <p>Delivery Address : {{ deliveryAddress }}</p>
      <p>Pickup Address : {{ pickupAddress }}</p>
      <p>Restaurant Name : {{ restaurantName }}</p>
      <p>Client Name : {{ clientName }}</p>
    </div>
     <div class="order-buttons">
      <button class="green-button" @click="handleAccept">Accept</button>
    </div>
  </div>
</template>

<script>



const url = "http://localhost:3001/deliverer/"+ localStorage.getItem("mongoUserId") +"/update-order";

import Axios from '@/services/callerService';

export default {

name: "OrderCard",

 data() {
    return {
      form: {
        action :'',
        orderId : '',
        deliveryId :  '',
      }
    }
  },

  props: {
    title: {
      type: String,
      required: true
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    pickupAddress: {
      type: String,
      required: true
    },
    restaurantName: {
      type: String,
      required: true
    },
    clientName: {
      type: String,
      required: true
    }
  },
   methods: {
    handleAccept() {
        this.form.action = "accept",
        this.form.deliveryId = localStorage.getItem("mongoUserId"),
        this.form.orderId = this.title
      console.log( this.form)
       Axios.put(url,this.form).then((response) => {
    console.log(response.data)
    if (response.status == 200){
        this.$router.go();
      }
    })
    },
  }
}
</script>

<style>
.order-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 50%;
  overflow: hidden;
  
  width: 20em;


  margin: auto;
  padding: 1em;
  border-radius: 15px;
  background: #fefefe;
  transition: box-shadow 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}

.order-buttons {
  display: flex;
  justify-content: space-around;
}


.red-button {
  color: white;
  background-color: red;
  padding: 10px 20px ;
  margin: 5px  ;
  border-radius: 5px;

}
</style>
