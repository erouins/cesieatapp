<template>
  <div class="card">
    <div class="card-title">{{ name }} {{ firstName }} {{ lastName }}</div>
    <div class="card-content">
      <div class="card-left">
        <img class="card-img" :src="this.image" alt="Card Image">
      </div>
      <div class="card-right">
        <p class="card-address">{{ address }}</p>
        <p class="card-zipcode">{{ zipCode }}</p>
        <p class="card-city">{{ city }}</p>
        <p class="card-description">{{ description }}</p>
      </div>
     
    </div >
    <div class="order-buttons">
     <button class="green-button" @click="handleClick">
    update my data
  </button>
  <button class="red-button" @click="handleClickDelete">
   Delete my account 
  </button>
  </div>
  </div>
</template>


<script>

import Axios from '@/services/callerService';

export default {
  name: "UserCard",

  methods:{
    handleClick(){
      console.log(this.$route.path+ "/update")

        this.$router.push(this.$route.path + "/update");
    },
    handleClickDelete(){
      const url = "http://localhost:3001/users/" + localStorage.getItem('mongoUserId');

      if (confirm('Are you sure you want to delete your account')){
        Axios.delete(url).then((response) => {
              console.log(response.data)
              if (response.status == 200){
                  console.log("delete")
                  this.$router.push("/login");
                  localStorage.clear();
                }
              })
             
      }

    }
  },

  props: {
    name: {
      type: String,
    
    },
     firstName: {
      type: String,
  
    },
     lastName: {
      type: String,
     
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
     
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
     image: {
      type: String,
   
    },
  },
};
</script>

<style scoped>


.card {
  border-radius: 10px;
  width: 50%;
  overflow: hidden;
}

.card-title {
  text-align: center;
  padding: 10px;
  background-color: #f8f8f8;
}

.card-content {
  display: flex;
}

.card-left {
  width: 35%;
}

.card-img {
  width: 100%;
}

.card-right {
  width: 65%;
  padding: 0px 20px;
}

.card-name {
  font-weight: bold;
}
</style>
