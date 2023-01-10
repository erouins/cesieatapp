<template>
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
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderBar",

}
</script>

<style>
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

</style>