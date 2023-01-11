<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/deliverers/components/SideMenu.vue";

export default {
    name: 'DelivererMain',
    components: {
        Layout,
        SideMenu
    }
}
</script>