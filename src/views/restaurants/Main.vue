<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
        <template v-slot:main-content>
            <RestaurantProfil/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/restaurants/components/SideMenu.vue";
import RestaurantProfil from "@/views/restaurants/components/RestaurantProfil.vue"

export default {
    name: 'restaurantMain',
    components: {
        Layout,
        SideMenu,
        RestaurantProfil
    }
}
</script>