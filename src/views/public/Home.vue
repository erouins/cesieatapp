<template>
    <div>
        <header>Bienvenue </header>
        <p>
            <router-link to='auth/login'>login</router-link> | 
            <router-link to='auth/register'>register</router-link>
        </p>
        
    </div>
</template>

<script>
export default {
    name: "Home",
}
</script>