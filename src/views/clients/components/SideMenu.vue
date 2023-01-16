<template>
    <button id="button-home" class="button-sidemenu" @click="handleClickHome">
        <img class="icon-button" src="@/assets/house-door-fill.svg"/>
        <label for="button-home">Home</label>
    </button>
    <button id="button-order" class="button-sidemenu">
        <img class="icon-button" src="@/assets/basket2-fill.svg"/>
        <label for="button-order">Order</label>
    </button>
    <button id="button-historical" class="button-sidemenu">
        <img class="icon-button" src="@/assets/book-fill.svg"/>
        <label for="button-historical">Historical</label>
    </button>
    <button id="button-settings" class="button-sidemenu" @click="handleClickProfile">
        <img class="icon-button" src="@/assets/person-fill.svg"/>
        <label for="button-settings">Profile</label>
    </button>
    <div class="footer-button">
        <button id="button-exit" class="button-sidemenu " @click="handleLogout">
            <img class="icon-button" src="@/assets/arrow-left-circle-fill.svg"/>
            <label for="button-exit">Disonnect</label>
        </button>
    </div>
</template>

<script>

import Axios from '@/services/callerService';
const url = "http://localhost:3001/auth/logout";

export default {
    name: 'ClientSideMenu',

     methods:{

        handleClickProfile(){
              this.$router.push("/clients/profil");
        },
        handleClickHome(){
              this.$router.push("/clients/main");
        },
        handleLogout(){
            
            Axios.post(url,
                  {refreshToken : localStorage.getItem('refreshToken')}).then((response) => {
              console.log(response.data)
              if (response.status == 204){
                  console.log("Logout")
                  
                }
              })
             this.$router.push("/login");
             localStorage.clear();
        }
    }
}
</script>