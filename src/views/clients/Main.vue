<template>    
    <layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
        <template v-slot:main-content>
            <router-view/>
        </template>
    </layout>
    
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/clients/components/SideMenu.vue";
import ClientProfil from "@/views/clients/components/Profil.vue"

export default {
    
    name: 'ClientMain',
    components: {
        Layout,
        SideMenu,
        ClientProfil
    }
}
</script>