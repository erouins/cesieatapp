<template>    
    <MainContener/>
    <HeaderBar/>
    <SideBar>
        <template v-slot:side-menu>
            <SideMenu/>
        </template>
    </SideBar>
</template>

<script>
import MainContener from "@/components/MainContener.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import SideBar from "@/components/SideBar.vue";
import SideMenu from "@/views/deliverers/components/SideMenu.vue";

export default {
    name: 'DelivererHome',
    components: {
        MainContener,
        HeaderBar,
        SideBar,
        SideMenu
    }
}
</script>