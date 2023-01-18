<template>
  <div class="card">
    <div class="card-title">Reset password</div>
    <form @submit.prevent="reset">
      <div class="input-label"><label>E-mail</label></div>
      <input
        class="input-field-auth"
        type="text"
        id="user_mail"
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$"
        title="Enter a valid email"
        v-model="user.email"
        required
        autocomplete
      />
      <p>
         {{textConfirm}}
    </p>
      <button class="green-button " type="submit">
        <img  v-if="loading" class="loading" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" >
        <span v-if="loading" class="" > loading</span>
         <span v-else >Reset</span>

      </button>
      
    </form>
    </div>
</template>

<script>
import Axios from '@/services/callerService';

const url = "http://localhost:3001/auth/forgot-password"
  
export default {
  name: "ForgotPassword",
  data() {
    return {
      loading : false,
      textConfirm: '',
      user: {
        email: "",
      },
    };
  },

  methods: {
    reset(){
      this.loading = true
      Axios.post(url,
                  this.user).then((response) => {
              console.log(response.data)
              if (response.status == 200){
                  this.loading = false
                  console.log("envoyé")
                  this.textConfirm = "We have sent you an email to renew your password"
                }
              })
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

.loading{
  width: 20px;
  height: 20px;
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