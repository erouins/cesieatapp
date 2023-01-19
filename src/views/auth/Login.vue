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
      <button class="green-button" type="submit">connect</button>
    </form>
    <p>
      Don't have an account ?
      <a href="http://localhost:8080/auth/Register">sign in</a>
    </p>
    <a href="http://localhost:8080/auth/forgot-password"
      >I have forgot my password</a
    >
  </div>
</template>

<script>
import Axios from "@/services/callerService";

import io from "socket.io-client";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
        socket: null,
        messages: [],
      },
    };
  },

  methods: {
    login() {
      fetch("http://localhost:3001/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(this.user),
      })
        .then((blob) => blob.json())
        .then((data) => {
          localStorage.clear();
          localStorage.setItem("token", data["tokens"]["access"]["token"]);
          localStorage.setItem(
            "refreshToken",
            data["tokens"]["refresh"]["token"]
          );
          localStorage.setItem("userId", data["user"]["id"]);
          localStorage.setItem("accountType", data["user"]["accountType"]);
          console.log("1er : ", localStorage.getItem("userId"))
          const userUrl =
            "http://localhost:3001/users/" + localStorage.getItem("userId");
          Axios.get(userUrl).then((response) => {   
            if (response.status == 200) {
              localStorage.setItem("userId" , response.data.id)
              console.log("2eme : ", localStorage.getItem("userId"))
              if (response.data.isEmailVerified == false) {
                this.$router.push("/auth/send-verification");
              } else {
                fetch("http://localhost:3001/users/find", {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + data["tokens"]["access"]["token"],
                  },
                  method: "POST",
                  body: JSON.stringify({
                    accountType: localStorage.getItem("accountType"),
                    userId: localStorage.getItem("userId"),
                  }),
                })
                  .then((blob) => blob.json())
                  .then((data) => {
                    console.log("3eme : ", localStorage.getItem("userId"))
                    localStorage.setItem("mongoUserId", data["id"]);
                    console.log("1er mongo : ", localStorage.getItem("mongoUserId"))
                    const route =
                      "/" + localStorage.getItem("accountType") + "s/";
                    if (data["response"] == "true") {
                      if ((route == "/restaurants/")) {
                        this.$router.push(route + "home/menus");
                      } else {
                        this.$router.push(route + "home");
                      }
                    } else {
                      this.$router.push(route + "register");
                    }
                  });
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
          if (
            confirm(
              "an error has occurred, please check that your email and password are correct"
            )
          ) {
          }
        });
    },
  },

  mounted() {
    if (localStorage.getItem("token") != null) {
      console.log("déja connecté");
      this.$router.push("/" + localStorage.getItem("accountType") + "s/home");
    } else {
      console.log("non connecté");
    }
    this.socket = io("http://localhost:3001");
    this.socket.on("connect", () => {
      console.log("connected");
    });
    this.socket.on("welcome", (message) => {
      console.log("yeaahhhh");
    });
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
</style>