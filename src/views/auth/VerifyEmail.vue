<template>
  <div class="card">
    <div class="card-title">Verify Email</div>
    <form @submit.prevent="resend">
     
      <p>
         Please wait, we check yor email
    </p>
    <p>
   
    </p>
  
      
    </form>
    </div>
</template>

<script>

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const token = urlParams.get('token')

const url = "http://localhost:3001/auth/verify-email?token="+token
const userUrl = "http://localhost:3001/users/" + localStorage.getItem('userId')

import Axios from '@/services/callerService';
  
export default {
  name: "VerifyEmail",

  data() {
    return {
      textConfirm: '',
      user: {
        id: 0,
        email : ""
      },
    };
  },
 mounted(){
        Axios.get(userUrl).then((response) => {
              console.log(response.data.email)
              if (response.status == 200){
                  this.user.id = response.data.id 
                   this.user.email = response.data.email 
                }
              })
              setTimeout(() => {
                  Axios.post(url,
                  {user : this.user}).then((response) => {
              console.log(response.data)
              if (response.status == 204){
                  console.log("envoyé")
                 this.$router.push("/auth/login");
                }
              })
              }, 2000);
 },

 methods: {
   
  },
  
};
</script>

<style>

</style>