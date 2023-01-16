<template>
    <button id="button-home" class="button-sidemenu" @click="handleClickHome">
        <img class="icon-button" src="@/assets/house-door-fill.svg"/>
        <label for="button-home">Home</label>
    </button>
    <button id="button-delivery" class="button-sidemenu" @click="handleClickDeliveries">
        <img class="icon-button" src="@/assets/compass-fill.svg"/>
        <label for="button-delivery">Deliveries</label>
    </button>
    <button id="button-historical" class="button-sidemenu">
        <img class="icon-button" src="@/assets/book-fill.svg"/>
        <label for="button-historical">Historical</label>
    </button>

    <button id="button-settings" class="button-sidemenu" @click="handleClickProfile">
        <img class="icon-button" src="@/assets/person-circle.svg"/>
        <label for="button-settings">Profile</label>

    </button>
    <div class="footer-button">
        <button id="button-exit" class="button-sidemenu">
            <img class="icon-button" src="@/assets/arrow-left-circle-fill.svg"/>
            <label for="button-exit">Disonnect</label>
        </button>
    </div>
</template>

<script>
export default {
    name: 'DelivererSideMenu',

            methods:{
        handleClickProfile(){
              this.$router.push("/deliverers/profil");
        },
        handleClickHome(){
              this.$router.push("/deliverers/main");
        },
        handleClickDeliveries(){
              this.$router.push("/deliverers/deliveries");
        }
    }
}
</script>