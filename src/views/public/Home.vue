<template>
    <div class="header-home">
        <div class="logo-titre">
            <img class="logo-top-left" src="@/assets/logo-cesi-eat.svg" alt="logo cesi eat" />
            <p>CesiEAT</p>
        </div>
        <p>
            <router-link to='auth/login'>login</router-link> |
            <router-link to='auth/register'>register</router-link>
        </p>
    </div>
    <div class="main-home">
        <img class="banniere" src="@/assets/baniere.png" alt="bannière cesi eat" />
    </div>
</template>

<script>
export default {
    name: "Home",
}
</script>

<style>
.header-home {
    padding: 0 10px;
    width: calc(100% - 20px);
    height: 56px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    background: #fefefe;
    box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}

.main-home {
    width: 100%;
} 

.banniere {
    width: 100%;
    height: 100%;
}

</style>