<template>
    <body>
        <div class='header'>
            <button class="button-sidebar">
                <img class="icon-sidebar" src="../../assets/list.svg" alt="button sidebar"/>
            </button>
            <div class="logo-titre">
                <img class="logo-top-left" src="../../assets/logo-cesi-eat.svg" alt="logo cesi eat"/>
                <p>CesiEAT</p>
            </div>
            <div class="search-bar">
                <input class="input-search-bar">
            </div>
        </div>
        <div class='main-content'>
            <p>test layout</p>
        </div>
        <router-view />
    </body>
    <footer>

    </footer>
</template>

<script>
import PublicNav from '@/components/PublicNav.vue'
export default {
    name: "PublicLayout",
    components: {
        PublicNav
    }
}
</script>

<style>
    body {
        margin: 0px;
        background-color: #eee;
        color: #212529;
        font-family: 'Roboto', 'Open Sans', Arial, Helvetica, sans-serif;
        text-align: center;
        font-size: 1em;
    }

    .header {
        width: 100%;
        height: 3.6em;
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        padding: 0 16px;
        background-color: red;
        
    }

    .main-content {
        margin-top: 4.6em;
        width: 100%;
    }

    .logo-titre {
        text-align: left;
        display: flex;
    }

    .logo-top-left {
        height: 2.7em;
    }

    .button-sidebar {
        outline: none;
        background: none;
        margin-right: 16px;
        border: none;
        padding: 0;
        line-height: 0;
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
        transition: 0.5s;
    }

    .button-sidebar:hover {
        background-color: blue;
        transition: 0.5s;
    }
    
    .icon-sidebar {
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

</style>