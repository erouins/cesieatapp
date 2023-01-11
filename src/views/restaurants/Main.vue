<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>            
        </template>
        <template v-slot:main-content><router-view/></template>
        
        
        <!-- <template v-slot:main-content>
            <component v-bind:is="this.component"/>
        </template> -->
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/restaurants/components/SideMenu.vue";

export default {
    name: 'restaurantMain',
    components: {
        Layout,
        SideMenu,
    }
}
</script>