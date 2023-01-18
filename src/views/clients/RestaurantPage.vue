<template>
    <div class="select-button-container">
        <button type="button" @click="redirectMenus" class="green-button">Menu</button>
        <button type="button" @click="redirectArticles" class="green-button">Article</button>
    </div>
    <div class="card-contener">
        <div v-for="(item, index) in this.listToBeDisplayed" :key="index" class="menu_article_container">
            <component v-bind:is="component" v-bind:item="item" />
        </div>
    </div>
    <div class="space-buttom"></div>
        <div class="cart-button-container" @click="displayCart()">
        <button class="green-button">Cart</button>
    </div>
    <div class="cart-container" v-bind:style="{display: visibility}">
        <div class="cart-background" @click="displayCart()"></div>
        <CartPage v-bind:isDisabled="isDisabled" @update:isDisabled="updateDisabled" v-bind:restaurantID="restaurantID" v-bind:articlesList="articles" v-bind:menusList="menus"/>
    </div>
</template>

<script>
import ArticleList from "@/views/clients/components/ArticleList.vue";
import MenuList from "@/views/clients/components/MenuList.vue";
import CartPage from "@/views/clients/components/CartPage.vue";
import axios from "axios";
import { thisExpression } from "@babel/types";
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
            visibility: 'none',
            isDisabled: true,
            cart: [],
            articles: [],
            menus: []
        }
    },
    props: {id:''},
    mounted() {
        axios
            .get(this.url, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((data) => {
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
        updateDisabled(bool) {
            this.isDisabled = bool
        },
        redirectMenus() {
            this.$router.push({ name: 'menusList' });
            this.component = "MenuList";
            this.listToBeDisplayed = this.menusList;
        },
        redirectArticles() {
            this.$router.push({ name: 'articlesList' });
            this.component = "ArticleList";
            this.listToBeDisplayed = this.articlesList;
        },
        displayCart() {
            this.menus = this.$store.getters.getCart[1]
            this.articles = this.$store.getters.getCart[0]

            if(this.visibility == "none"){
                this.visibility = ""
                this.cart = this.$store.getters.getCart
                if((this.cart.length == 2) && (this.cart[0].length != 0 || this.cart[1].length != 0)) {
                    this.isDisabled = false;                   
                } else {
                    this.isDisabled = true;
                }
                
            } else {
                this.visibility = "none"
                this.isDisabled = true;
            }
        }
    },
    components: {
        ArticleList,
        MenuList,
        CartPage
    }
}

</script>

<style>
    .menu_article_container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .select-button-container {
        margin: 20px;
    }

    .select-button {
        cursor: pointer;
        color: #212529;
        background-color: #93b721;
        font-size: 1.2em;
        font-weight: 600;
        padding: 0.7em 1em;
        border-radius: 5px;
        border: 0;
        transition: 0.5s;
        box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
    }

    .cart-button-container {
        width: 100%;
        height: 70px;
        position: fixed;
        bottom: 0;
        padding-bottom: 0;
        background: #eeeeee;
    }

    .space-buttom {
        height: 75px;
    }

    .cart-container {
        width: 100%;
        height: calc(100% - 126px);
        position: fixed;
        top: 56px;
    }

    .cart-background {
        width: 100%;
        height: 100%;
        background-color:rgba(238, 238, 238, 0.5);
    }

</style>
