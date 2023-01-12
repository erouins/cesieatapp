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
     
    </div>
     <button class="rounded-black-border-button" @click="handleClick">
    update my data
  </button>
  </div>
</template>


<script>
export default {
  name: "UserCard",

  methods:{
    handleClick(){
        this.$router.push(this.$route.path + "/update");
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

.rounded-black-border-button {
  border-radius: 10px;
  border: 2px solid black;
  color: white;
  background-color:  green;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
}
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
