<template>
    <body>
        <div class='header'>
            <p>test header</p>
            
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
        height: 3.5em;
        position: fixed;
        top: 0;
        background-color: red;
    }

    .main-content {
        margin-top: 4.5em;
        width: 100%;
    }
</style>