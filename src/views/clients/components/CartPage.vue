<template>
    <div class="card">
        <div class="basket-list">
            <h2>Menus :</h2>
            <div class="item-row" v-for="(menu, index) in menusList" :key="index">
                <div class="start-of-line">
                    <li>{{ menu['name'] }}</li>
                </div>
                <div class="end-of-line">
                    <div>{{ menu['price'] }}$</div>
                    <button class="delete-to-basket" @click="removeItem(index,menusList,1)">
                        <img src="@/assets/trash-fill.svg" alt="button delete to basket">
                    </button>
                </div>
            </div>
            <h2>Articles :</h2>
            <div class="item-row" v-for="(article, index) in articlesList" :key="index">
                <div class="start-of-line">
                    <li>{{ article['name'] }}</li>
                </div>
                <div class="end-of-line">
                    <div>{{ article['price'] }}$</div>
                    <button class="delete-to-basket" @click="removeItem(index,articlesList,0)">
                        <img src="@/assets/trash-fill.svg" alt="button delete to basket">
                    </button>
                </div>
            </div>
        </div>
        <div class="order-button-container">
            <button class="green-button" @click="createOrder()" v-bind:disabled="isDisabled">Order</button>
        </div>
    </div>
</template>

<script>
import Axios from '@/services/callerService';
const createOrderUrl = "http://localhost:3001/client/" + localStorage.getItem("mongoUserId") + "/create-order";
export default {
    props: {
        isDisabled: Boolean,
        restaurantID: String,
        articlesList: Object,
        menusList: Object
    },
    mounted() {
    },
    methods: {
        updateDisabled() {
            this.$emit('update:isDisabled', true); 
        },
        removeItem(index,list,type) {
            list.splice(index,1)
            this.$store.commit('removeToCart', list[index], type);

            if(this.menusList.length == 0 && this.articlesList.length == 0) {
                this.updateDisabled()      
            }
        },
        createOrder() {
            this.menus = this.$store.getters.getCart[1]
            this.articles = this.$store.getters.getCart[0]
            this.articlesID = []
            this.menusID = []

            this.articles.forEach(element => {this.articlesID.push(element['id'])});
            this.menus.forEach(element => {this.menusID.push(element['id'])});

            this.body = {
                order: {
                    restaurant: this.restaurantID,
                    client: localStorage.getItem("mongoUserId"),
                    menus: this.menusID,
                    articles: this.articlesID
                }
            }
            console.log(this.body)
            Axios.post(createOrderUrl, this.body)
            .then((response) => {
                this.results = response.data;
                console.log("results" + this.results)
                this.$store.commit('clearCart')
                this.$router.push("/clients/order");
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style>
.basket-list {
    width: 100%;
    text-align: left;
}

.end-of-line {
    display: flex;
}

.delete-to-basket {
    cursor: pointer;
    background-color: #fefefe;
    outline: none;
    border: none;
}
</style>