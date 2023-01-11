<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/restaurants/components/SideMenu.vue";

export default {
    name: 'restaurantMain',
    components: {
        Layout,
        SideMenu
    }
}
</script>