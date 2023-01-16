<template>
  <div class="card">
    <div class="card-title">Login</div>
    <form @submit.prevent="login">
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
      <div class="input-label"><label>Password</label></div>
      <input
        class="input-field-auth"
        type="password"
        id="user_password"
        v-model="user.password"
        required
      />
      <button class="submit-button" type="submit">connect</button>
    </form>
    <p>
      Don't have an account ?
      <a href="http://localhost:8080/auth/Register">sign in</a>
    </p>
    <a href="http://localhost:8080/auth/forgot-password">I have forgot my password</a>
    </div>
</template>

<script>



import Axios from '@/services/callerService';
  
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      fetch("http://localhost:3001/auth/login", {
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(this.user),
      })
        .then((blob) => blob.json())
        .then((data) => {
          localStorage.clear();
          localStorage.setItem("token", data["tokens"]["access"]["token"]);
          localStorage.setItem("refreshToken", data["tokens"]["refresh"]["token"]);
          localStorage.setItem("userId", data['user']['id']);
          localStorage.setItem("accountType", data['user']['accountType']);
          const userUrl = "http://localhost:3001/users/" + localStorage.getItem('userId')
            Axios.get(userUrl).then((response) => {
             
              if (response.status == 200){
                  if (response.data.isEmailVerified == false){
                       
                         this.$router.push("/auth/send-verification");
                  }else{
                       
                        fetch("http://localhost:3001/users/find", {
                      headers: {
                        'Accept': "application/json",
                        "Content-Type": "application/json",
                        'Authorization': "Bearer " + data["tokens"]["access"]["token"],
                      },
                      method: "POST",
                      body: JSON.stringify({
                        accountType: localStorage.getItem('accountType'),
                        userId: localStorage.getItem('userId'),
                      }),
                    })
                      .then((blob) => blob.json())
                      .then((data) => {
                      
                        localStorage.setItem('mongoUserId', data["id"]);
                        const route = '/' + localStorage.getItem('accountType') + 's/';
                        if (data["response"] == "true") {
                             switch(localStorage.getItem('accountType')){
                              case 'deliverer':{
                                this.$router.push('/deliverers/home');
                                break;
                              }
                              case'client':{
                                this.$router.push('/clients/home');
                                break;
                              }
                              case'restaurant':{
                                this.$router.push('/restaurants/home/menus');
                                break;
                              }
                              default:{
                                this.$router.push('/auth/login');
                                break;
                              }
                             }
                        }else {
                           console.log("icciiiii")
                          this.$router.push(route + 'register');
                        }
                      });
                              
                  }

                }
              })
  
        })
        .catch((err) => {
          console.log(err);
        });
    },
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