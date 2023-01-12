<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
        <template v-slot:main-content>
            <DelivererProfil/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/deliverers/components/SideMenu.vue";
import DelivererProfil from "@/views/deliverers/components/DelivererProfil.vue"

export default {
    name: 'DelivererMain',
    components: {
        Layout,
        SideMenu,
        DelivererProfil
    }
}
</script>