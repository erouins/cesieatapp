<template>
    <div>
        <button type="button" @click="redirectMenus">Menu</button>
        <button type="button" @click="redirectArticles">Article</button>
    </div>
    <div v-for="(item, index) in this.listToBeDisplayed" :key="index" class="card_restau">
        <component v-bind:is="component" v-bind:item="item" />
    </div>
</template>

<script>
import ArticleList from "@/views/clients/components/ArticleList.vue";
import MenuList from "@/views/clients/components/MenuList.vue";
import axios from "axios";
export default {
    name: "RestaurantPage",
    data() {
        return {
            restaurantID: this.$store.getters.getRestaurant['id'],
            url: "http://localhost:3001/restaurant/" + this.$store.getters.getRestaurant['id'],
            menusList: [],
            articlesList: [],
            component: "",
            listToBeDisplayed: '',
        }
    },
    props: {id:''},
    mounted() {
        console.log('test', this.$store.getters.getRestaurant['id']),
        axios
            .get(this.url, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((data) => {
                console.log('Data:', data['data']);
                this.menusList = data["data"]["menus"];
                this.articlesList = data["data"]["articles"];

                if (this.$route.path == "/restaurant/", this.restaurantID.slice(-5),"/articles") {
                    this.listToBeDisplayed = this.articlesList;
                    this.component = "ArticleList";
                } else {
                    this.listToBeDisplayed = this.menusList;
                    this.component = "MenuList";
                }
            });
    },
    methods: {
        redirectMenus() {
            console.log("test");
            this.$router.push({ name: 'menusList' });
            this.component = "MenuList";
            this.listToBeDisplayed = this.menusList;
        },
        redirectArticles() {
            this.$router.push({ name: 'articlesList' });
            this.component = "ArticleList";
            this.listToBeDisplayed = this.articlesList;
        },
    },
    components: {
        ArticleList,
        MenuList
    }
}

</script>

<style>

</style>
