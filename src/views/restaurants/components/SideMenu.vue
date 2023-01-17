<template>
    <button id="button-home" class="button-sidemenu">
        <img class="icon-button" src="@/assets/house-door-fill.svg" @click="handleClickHome"/>
        <label for="button-home">Home</label>
    </button>
     <button id="button-historical" class="button-sidemenu" @click="handleClickOrders">
        <img class="icon-button" src="@/assets/book-fill.svg"/>
        <label for="button-historical">Orders</label>
    </button>

    <button id="button-historical" class="button-sidemenu" @click="handleClickHistorical">
        <img class="icon-button" src="@/assets/book-fill.svg"/>
        <label for="button-historical">Historical</label>
    </button>

    <button id="button-settings" class="button-sidemenu"  @click="handleClickProfile">
        <img class="icon-button" src="@/assets/person-circle.svg"/>
        <label for="button-settings">Profile</label>

    </button>
    <div class="footer-button">
        <button id="button-exit" class="button-sidemenu" @click="handleLogout">
            <img class="icon-button" src="@/assets/arrow-left-circle-fill.svg"/>
            <label for="button-exit">Disonnect</label>
        </button>
    </div>
</template>

<script>

import Axios from '@/services/callerService';
const url = "http://localhost:3001/auth/logout";

export default {
    name: 'RestaurantSideMenu',

        methods:{
        handleClickProfile(){
              this.$router.push("/restaurants/profil");
        },
        handleClickHome(){
              this.$router.push("/restaurants/home/menus");
        },
        handleClickOrders(){
              this.$router.push("/restaurants/order");
        },
        handleClickHistorical(){
              this.$router.push("/restaurants/historical");
        },
        handleLogout(){
            
            Axios.post(url,
                  {refreshToken : localStorage.getItem('refreshToken')}).then((response) => {
              console.log(response.data)
              if (response.status == 204){
                  console.log("Logout")
                  
                }
              })
             this.$router.push("/auth/login");
             localStorage.clear();
        }
    }
}
</script>