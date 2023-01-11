<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
        <template v-slot:main-content>
            <component v-bind:is="this.component"/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/restaurants/components/SideMenu.vue";
import RestaurantProfil from "@/views/restaurants/components/RestaurantProfil.vue"
import CardContent from "@/views/restaurants/components/CardContent.vue"

export default {
    data() {
        return {
            component : "RestaurantProfil"
        }
    },
    name: 'restaurantMain',
    props:{
        component: String
    },
    components: {
        Layout,
        SideMenu,
        RestaurantProfil,
        CardContent
    }
}
</script>