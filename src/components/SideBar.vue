<template>
    <div class="side-bar">
        <slot name="side-menu"></slot>
    </div>
</template>
<script>
export default {
    name: 'SideBar',
}
</script>

<style>
    .side-bar {
        width: 70px;
        height: 100%;
        margin-top: 56px;
        position: fixed;
        display: table-column;        
        padding: 4px;
        background-color: red;
    }

    .button-sidemenu {
        height: 74px;
        width: 64px;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 5%;
        padding: 5px;
        margin-bottom: 6px;
        transition: 0.5s;
    }
    
    .footer-button {
        bottom: 0;
        position: fixed;
    }

    .button-sidemenu:hover {
        background-color: blue;
        transition: 0.5s;
    }
</style>