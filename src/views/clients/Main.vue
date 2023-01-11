<template>    
    <layout>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
    </layout>
    
</template>

<script>
import Layout from "@/components/Layout.vue";
import SideMenu from "@/views/clients/components/SideMenu.vue";

export default {
    name: 'ClientMain',
    components: {
        Layout,
        SideMenu
    }
}
</script>