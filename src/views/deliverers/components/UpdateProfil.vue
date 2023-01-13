<template>
<div class="container" >
     <div class="card2 rounded-border">
    <form @submit.prevent="udpateData">
      <div class="form-row">
        <div class="form-col">
          <label for="name">First name :</label>
          <input type="text" id="name" v-model="form.firstName">
          
          <label for="address">Adresse :</label>
          <input type="text" id="address" v-model="form.address">
        </div>
        <div class="form-col">
          <label for="city">Last name :</label>
          <input type="text" id="city" v-model="form.lastName">
          
          <label for="zipcode">Code postal :</label>
          <input type="text" id="zipcode" v-model="form.zipCode">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
            <label for="city">Ville :</label>
          <input type="text" id="city" v-model="form.city">
        </div>
        <div class="form-col">
          <label for="image">Image :</label>
          <input type="file" id="image" @change="handleImageChange">
          <img :src="form.image" alt="restaurant image">
        </div>
      </div>
     <div class="button-container">
    <button class="rounded-black-border-button" type="submit">Send</button>
    <button class="rounded-black-border-button" @click="GoBack">Back</button>
  </div>
    </form>
  </div>
  </div>
</template>

<script>
const url = "http://localhost:3001/deliverer/" + localStorage.getItem("mongoUserId");
const urlToSend = "http://localhost:3001/deliverer/" + localStorage.getItem("mongoUserId") + "/update-profil";
const currentPage = "deliverers"

import axios from "axios";
import imgUtils from "@/utils/imgUtils.js";
export default {
  name: "DelivererUpdateProfil",

  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        image: ''
      }
    }
  },
  mounted() {
    console.log("results")
    axios.get(url,
    {
  headers: {
    'Authorization': `bearer ${localStorage.getItem("token")}` 
  }}
  ).then((response) => {
      this.form.firstName = response.data.firstName;
      this.form.lastName = response.data.lastName;
      this.form.address = response.data.address;
      this.form.city = response.data.city;
      this.form.zipCode = response.data.zipCode;
      // this.form.description = response.data.description;
      this.form.image = response.data.image;
      console.log("results" + this.form)
    });
  },
  methods: {
    async handleImageChange(e) {
      this.form.image = await imgUtils.handleImageChange(e);
    },

    udpateData(){
        console.log(JSON.stringify({profil: this.form}))
        console.log(urlToSend)
        axios.put(urlToSend,
        {profil: this.form},
    {
  headers: {
    'Authorization': `bearer ${localStorage.getItem("token")}` 
  },
   }
  ).then((response) => {
    console.log(response.data)
      this.form.firstName = response.data.firstName;
      this.form.lastName = response.data.lastName;
      this.form.address = response.data.address;
      this.form.city = response.data.city;
      this.form.zipCode = response.data.zipCode;
      this.form.image = response.data.image;
      if (response.status == 201){
        this.$router.push("/"+currentPage+"/profil");
      }
    });
    },
    GoBack(){
       this.$router.push("/"+currentPage+"/profil");
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: stretch;
}

.card2 {
  background: white;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
  margin-bottom: 20px;
  overflow: hidden;
  width: 100%;
}

.form-row {
  display: flex;
}

.form-col {
  width: 50%;
  padding: 20px;
}

.form-col label {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.form-col input,
.form-col textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.form-col img {
  width: 100%;
  max-width: 200px;
}
</style>

