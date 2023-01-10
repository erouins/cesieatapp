<template>
    <div class="main-contener">
        <div class="main-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainContener',
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
        text-align: right;
        top: 0;
    }

    .main-content {
        margin-top: 56px;
        margin-left: 78px;
        padding: 16px;
    }
</style>