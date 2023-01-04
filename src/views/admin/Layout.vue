<template>
    <div class = 'admin'>
        <PublicNav/>
    </div>
    <router-view/>
</template>

<script>
import PublicNav from '@/components/PublicNav.vue'
export default {
    name: "AdminLayout",
    components:{
        PublicNav
    }
}
</script>

<style>

</style>