<template>
    <button id="button-home" class="button-sidemenu">
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
    <button id="button-settings" class="button-sidemenu">
        <img class="icon-button" src="@/assets/gear-fill.svg"/>
        <label for="button-settings">Settings</label>
    </button>
    <div class="footer-button">
        <button id="button-exit" class="button-sidemenu ">
            <img class="icon-button" src="@/assets/arrow-left-circle-fill.svg"/>
            <label for="button-exit">Disonnect</label>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ClientSideMenu'
}
</script>