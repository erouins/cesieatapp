<template>
    <div class="card">
        <p>test</p>
        <div>

        </div>
        <div>

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
        restaurantID: String
    },
    mounted() {
    },
    methods: {
        createOrder() {
            this.body = {
                order: {
                    restaurant: this.restaurantID,
                    client: localStorage.getItem("mongoUserId"),
                    menus: this.$store.getters.getCart[1],
                    articles: this.$store.getters.getCart[0]
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

</style>