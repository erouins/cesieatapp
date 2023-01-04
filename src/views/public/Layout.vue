<template>
    <div class = 'public'>
        <PublicNav/>
    </div>
    <router-view/>
</template>

<script>
import PublicNav from '@/components/PublicNav.vue'
export default {
    name: "PublicLayout",
    components:{
        PublicNav
    }
}
</script>

<style>

</style>