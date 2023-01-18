<template>
  <div class="card">
    <div class="card-title">Reset password</div>
    <form @submit.prevent="send">
      <div class="input-label"><label for="new_password">Password</label></div>
        <input class="input-field-auth" type="password" id="new_password" v-model="user.password" @input="inputPassword" required />
        <div class="input-label"><label for="confirm_password">Confirm password</label></div>
        <input class="input-field-auth" type="password" id="confirm_password" @input="inputConfirmPassword" required />
      <button class="green-button " type="submit">Send</button>
    </form>
    </div>
</template>

<script>
import Axios from '@/services/callerService';



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const token = urlParams.get('token')

const url = "http://localhost:3001/auth/reset-password?token="+token
console.log(url)
  
export default {
  name: "UpdatePassword",
  data() {
    return {
      user: {
        password: "",
      },
    };
  },
props:{
  token:''
},
  methods: {
    send(){
      Axios.post(url,
                  this.user).then((response) => {
                  console.log("good")
              if (response.status == 204){
                  console.log("good")
                  this.$router.push("/auth/login");
                }
              })
    },
   inputPassword() {
            let new_password = document.querySelector("#new_password");
            
            if(!/^(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W+).*$/.test(new_password.value)) {
                new_password.setCustomValidity('The password must contain at leat: \n- 8 characters\n- one upper case letter\n- one lower case letter\n- one number\n- one special character');
            } else {
                new_password.setCustomValidity("");
            }
        },

    inputConfirmPassword() {
            let new_password = document.querySelector("#new_password");
            let confirm_password = document.querySelector("#confirm_password");

            if(new_password.value != confirm_password.value) {
                confirm_password.setCustomValidity('Confirm password do not match');
            } else {
                confirm_password.setCustomValidity('');
            }
        }
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

.green-button :enabled {
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

.green-button :focus,
.green-button :hover {
  outline: none;
  background-color: #a2c924;
  transition: 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}

.green-button :active {
  background-color: #8aa923;
  box-shadow: 5px 0px 40px rgba(0, 0, 0, 30%);
}
</style>