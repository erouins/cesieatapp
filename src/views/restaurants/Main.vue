<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
        <template v-slot:main-content>
            <CardContent/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/restaurants/components/SideMenu.vue";
import CardContent from "@/views/restaurants/components/CardContent.vue"

export default {
    name: 'restaurantMain',
    components: {
        Layout,
        SideMenu,
        CardContent
    }
}
</script>