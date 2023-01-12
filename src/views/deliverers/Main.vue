<template>
    <Layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
        <template v-slot:main-content>
            <router-view/>
        </template>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/deliverers/components/SideMenu.vue";
import DelivererProfil from "@/views/deliverers/components/Profil.vue"

export default {
    name: 'DelivererMain',
    components: {
        Layout,
        SideMenu,
        DelivererProfil
    }
}
</script>