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
body {
  background-color: #eee;
  color: #212529;
  font-family: "Roboto", "Open Sans", Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 1em;
}

form {
  width: 100%;
}

a {
  color: #93b721;
}

a:active {
  color: #0091ff;
}

.input-label {
  font-size: 1.2em;
  color: #212529;
  text-align: left;
}

[title]:before {
  content: attr(title);
  white-space: pre-wrap;
  position: absolute;
  background: black;
  color: white;
  padding: 0.25em;
  z-index: 1;
  visibility: hidden;
  border-radius: 3px;
}

[title]:hover:before,
[title]:focus:before {
  visibility: visible;
}

.card {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 20em;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  margin: auto;
  padding: 1em;
  border-radius: 15px;
  background: #fefefe;
  transition: box-shadow 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}

.card-title {
  color: #212529;
  font-size: 2em;
  font-weight: 600;
  margin: 1em 0 1em 0;
}

.input-field-auth {
  width: 97%;
  font-size: 1.2em;
  margin-bottom: 2em;
  border-radius: 5px;
  border-width: 3px;
  border-color: #93b721;
  box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
}

.input-select-auth:focus,
.input-field-auth:focus {
  outline: none;
  border-color: #0091ff;
  box-shadow: 2px 0px 5px rgb(0 0 0 / 30%);
}

.input-select-auth {
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 2em;
  border-radius: 5px;
  border-width: 3px;
  border-color: #93b721;
  box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
}

.input-select-auth:focus {
  outline: none;
  border-color: #0091ff;
  box-shadow: 2px 0px 5px rgb(0 0 0 / 30%);
}

.submit-button:enabled {
  cursor: pointer;
  color: #212529;
  background-color: #93b721;
  font-size: 1.2em;
  font-weight: 600;
  padding: 0.7em 1em;
  border-radius: 5px;
  border: 0;
  transition: 0.5s;
}

.submit-button:focus,
.submit-button:hover {
  outline: none;
  background-color: #a2c924;
  transition: 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}

.submit-button:active {
  background-color: #8aa923;
  box-shadow: 5px 0px 40px rgba(0, 0, 0, 30%);
}
</style>