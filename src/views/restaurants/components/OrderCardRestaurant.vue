<template>
  <div class="order-card" @click="handleTest">
    <h2>Order N° : {{ title.slice(-5) }}</h2>
    <div class="order-details">
      <p>Client : {{ clientName }}</p>
      <p>Menus : {{ menusNumber }}</p>
      <p>Articles : {{ articlesNumber }}</p>
      <p>Status : {{ status }}</p>
    </div>
     <div class="order-buttons">
      <button v-bind:style="{ display: buttonVisible ? 'block' : 'none' }" class="green-button" @click="handleAccept">Accept</button>
       <button v-bind:style="{ display: buttonVisible ? 'block' : 'none' }" class="red-button" @click="handleReject">Reject</button>
    </div>
  </div>
</template>

<script>



const url = "http://localhost:3001/restaurant/"+ localStorage.getItem("mongoUserId") +"/update-order";
import axios from 'axios';


export default {

name: "OrderCardRestaurant",

 data() {
    return {
       buttonVisible: false,
      form: {
        action :'',
        orderId : this.title,
      }
    }
  },

  props: {
    title: {
      type: String,
      required: true
    },
    menusNumber: {
      type: String,
      required: true
    },
    articlesNumber: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    clientName: {
      type: String,
      required: true
    }
  },
  mounted(){
    if (this.status == 'pending'){
       this.buttonVisible = true
    }
  },
   methods: {
    handleAccept() {
      this.form.action = 'restaurantAccepted'
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
    },
    handleReject() {
       this.form.action = 'restaurantRejected'
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
    },
    handleTest() {
       console.log('test')
    },
  }
}
</script>

<style>
.order-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;

  overflow: hidden;
  
  width: 15em;


  margin: auto;
  padding: 1em;
  border-radius: 15px;
  background: #fefefe;
  transition: box-shadow 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}


</style>
