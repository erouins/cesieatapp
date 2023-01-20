<template>
  <div class="user-card">
    <div class="user-card-content">
        <div class="user-card-title"><h2>{{ name }} {{ firstName }} {{ lastName }}</h2></div>
        <img class="user-card-img" :src="this.image" alt="user-card Image">
        <div class="user-card-text">
          <p class="user-card-address">Adress : {{ address }}</p>
          <p class="user-card-zipcode">Zipcode : {{ zipCode }}</p>
          <p class="user-card-city">City : {{ city }}</p>
          <p class="user-card-description">Description: {{ description }}</p>
        </div>
    </div>
    <div class="edit-account-buttons">
      <button class="green-button" @click="handleClick">update my account</button>
      <button class="red-button" @click="handleClickDelete">Delete my account</button>
    </div>
  </div>
</template>


<script>

import Axios from '@/services/callerService';

export default {
  name: "UserCard",

  methods: {
    handleClick() {
      console.log(this.$route.path + "/update")
      this.$router.push(this.$route.path + "/update");
    },
    handleClickDelete() {
      const url = "http://localhost:3001/users/" + localStorage.getItem('mongoUserId');

      if (confirm('Are you sure you want to delete your account')) {
        Axios.delete(url).then((response) => {
          console.log(response.data)
          if (response.status == 200) {
            console.log("delete")
            this.$router.push("/auth/login");
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

<style>
.user-card {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 350px;
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

.user-card-title {
  text-align: center;
  padding: 10px;
}

.user-card-text {
  text-align: left;
}

.user-card-img {
  width: 100%;
}

.user-card-name {
  font-weight: bold;
}
</style>
