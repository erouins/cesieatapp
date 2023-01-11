<template>
    <div class="main-contener">
        <div class="main-content">
            <slot name="main-content"></slot>
        </div>
    </div>
    <div class='header-bar'>
        <button id="button-active-sidebar" class="button-active-sidebar">
            <img  class="icon-button" src="../assets/list.svg"/>
        </button>
        <div class="logo-titre">
            <img class="logo-top-left" src="../assets/logo-cesi-eat.svg" alt="logo cesi eat"/>
            <p>CesiEAT</p>
        </div>
        <div class="search-bar">
            <input class="input-search-bar">
            <!-- <button clas="search-button">
                <img class="icon-search" src="../assets/search.svg"/>
            </button> -->
        </div>
    </div>
    <div class="side-bar">
        <slot name="side-menu"></slot>
    </div>
</template>

<script>
export default {
    name: "Layout",

}
</script>

<style>
    body {
        margin: 0px;
        max-height: 500px;
        background-color: #eee;
        color: #212529;
        font-family: 'Roboto', 'Open Sans', Arial, Helvetica, sans-serif;
        text-align: center;
        font-size: 1em;
    }

    .main-contener {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
    }

    .main-content {
        margin-top: 56px;
        margin-left: 78px;
        padding: 16px;
    }
    .header-bar {
        width: 100%;
        height: 56px;
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        padding: 0 16px;
        background-color: red;
        
    }

    .logo-titre {
        text-align: left;
        display: flex;
    }

    .logo-top-left {
        height: 2.7em;
    }

    .search-bar {
        margin: 0 30%; 
        width: 40%;
        position: absolute;   
        font-size: 1.2em;
        border-width: 3px;
        border-color: #93b721;
    }

    .input-search-bar {
        max-width: 750px;
        width: 100%;
        font-size: 1.2em;
        border-radius: 5px;
        border-width: 3px;
        border-color: #93b721;
        box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
    }

    .button-active-sidebar {
        outline: none;
        background: none;
        margin-right: 20px;
        border: none;
        padding: 0;
        line-height: 0;
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
        transition: 0.5s;
    }

    .button-active-sidebar:hover {
        background-color: blue;
        transition: 0.5s;
    }
    
    .icon-button{
        height: 2.7em;
    }
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
        width: 70px;
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