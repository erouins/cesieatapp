<template>
<div class="container" >
     <div class="card2 rounded-border">
    <form @submit.prevent="udpateData">
      <div class="form-row">
        <div class="form-col">
          <label for="name">Nom :</label>
          <input type="text" id="name" v-model="form.name">
          
          <label for="address">Adresse :</label>
          <input type="text" id="address" v-model="form.address">
        </div>
        <div class="form-col">
          <label for="city">Ville :</label>
          <input type="text" id="city" v-model="form.city">
          
          <label for="zipcode">Code postal :</label>
          <input type="text" id="zipcode" v-model="form.zipCode">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label for="description">Description :</label>
          <textarea id="description" v-model="form.description"></textarea>
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
const url = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");
const urlToSend = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId") + "/update";
const currentPage = "restaurants"

import axios from 'axios';

export default {
    name: 'RestaurantUpdateProfil',

    data() {
    return {
      form: {
        name: '',
        address: '',
        city: '',
        zipCode: '',
        description: '',
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
      this.form.name = response.data.name;
      this.form.address = response.data.address;
      this.form.city = response.data.city;
      this.form.zipCode = response.data.zipCode;
      this.form.description = response.data.description;
      this.form.image = response.data.image;
      console.log("results" + this.form)
    });
  },
  methods:{
     convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
},
    async handleImageChange (e)  {
       let file = e.target.files[0];
        const base64 = await this.convertToBase64(file);
     
       this.form.image = base64
          console.log(base64)
    },

    udpateData(){
        console.log(JSON.stringify({profil: this.form}))
        axios.post(urlToSend,
        {profil: this.form},
    {
  headers: {
    'Authorization': `bearer ${localStorage.getItem("token")}` 
  },
   }
  ).then((response) => {
    console.log(response.status)
      this.form.name = response.data.name;
      this.form.address = response.data.address;
      this.form.city = response.data.city;
      this.form.zipCode = response.data.zipCode;
      this.form.description = response.data.description;
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


.rounded-black-border-button {
  border-radius: 10px;
  border: 2px solid black;
  color: white;
  background-color:  green;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
}

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

.form-col input, .form-col textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.form-col img{
  width:100%;
  max-width:200px;
}
</style>

