<template>
<div>
    <div class = 'users'>
        <PublicNav/>
    </div>
</div>
<router-view/>
</template>

<script>
import PublicNav from '@/components/PublicNav.vue'
export default {
    name: "UserLayout",
    components:{
        PublicNav
    }
}
</script>

<style>

</style>