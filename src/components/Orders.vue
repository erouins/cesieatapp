<template>
    <div class="orders-contener" v-if="this.$route.path == '/clients/order'">
        <div v-for="(item, index) in orderList" :key="index" class="order_card">
            <OrderCard v-if="item['status'] != 'rejected' && item['status'] != 'done'" v-bind:order="item" />
        </div>
    </div>
    <div v-else-if="this.$route.path == '/clients/historical' || this.$route.path == '/deliverers/historical' || this.$route.path == '/restaurants/historical'">
        <div v-for="(item, index) in orderList" :key="index" class="order_card">
            <OrderCard v-if="item['status'] == 'rejected' || item['status'] == 'done'" v-bind:order="item" />
        </div>
    </div>
    <div>
        <p v-if="emptyOrders" > There is nothing here at the moment  </p>
    </div>
</template>

<script>
let getOrderUrl = "http://localhost:3001/" + localStorage.getItem("accountType") + "/" + localStorage.getItem("mongoUserId") + '/';

import Axios from '@/services/callerService';
import OrderCard from '@/views/clients/components/OrderCard.vue'
import io from 'socket.io-client';

export default {
    name: 'OrdersPage',
    data() {
        return {
            emptyOrders: false,
            title: '',
            socket: null,
            orderList:this.orderList2
        }
    },
    props:{
        orderList2: []
    },
    mounted() {
        this.getOrders()
        console.log('mhhm Ok')
        
        this.socket = io('http://localhost:3001');
        this.socket.on('connect', () => {
            console.log('connected')
        });
        this.socket.on('orderModified', (message) => {
            console.log("orderModified")
            this.getOrders();
        });
    },
    beforeRouteLeave(to){
     this.getOrdersOnClick(to)
    },
    methods: {
        getOrders() {
            console.log('show me: ', '/' + localStorage.getItem("accountType") + 's/historical')
            if (this.$route.path == '/' + localStorage.getItem("accountType") + 's/historical') {
                getOrderUrl = "http://localhost:3001/" + localStorage.getItem("accountType") + "/" + localStorage.getItem("mongoUserId") + '/historical'
                console.log('url: ', getOrderUrl)
            } else {
                getOrderUrl = "http://localhost:3001/" + localStorage.getItem("accountType") + "/" + localStorage.getItem("mongoUserId") + '/orders'
                console.log('url: ', getOrderUrl)
            }
            console.log(getOrderUrl)
            Axios.get(getOrderUrl).then((data) => {
                if (Object.keys(data['data']).length == 0){
                    this.emptyOrders = true
                }
                console.log('list of orders:', data['data'])
                this.orderList = data['data'];
            })
        },
        async getOrdersOnClick(to){
            console.log('TO:', to)
            console.log('show me: ', '/' + localStorage.getItem("accountType") + 's/historical')
            if (to == '/' + localStorage.getItem("accountType") + 's/historical') {
                getOrderUrl = "http://localhost:3001/" + localStorage.getItem("accountType") + "/" + localStorage.getItem("mongoUserId") + '/historical'
                console.log('url: ', getOrderUrl)
            } else {
                getOrderUrl = "http://localhost:3001/" + localStorage.getItem("accountType") + "/" + localStorage.getItem("mongoUserId") + '/orders'
                console.log('url: ', getOrderUrl)
            }
            console.log(getOrderUrl)
            await Axios.get(getOrderUrl).then((data) => {
                if (Object.keys(data['data']).length == 0){
                    this.emptyOrders = true
                }
                console.log('list of orders:', data['data'])
                this.orderList = data['data'];
            })
        }
    },
    components: {
        OrderCard
    }
}

</script>

<style>
    .orders-contener {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }
</style>