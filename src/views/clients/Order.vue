<template>
    <div
    v-for="(item, index) in this.orderList"
    :key="index"
    class="order_card"
  >
    <OrderCard v-bind:order="item" />
  </div>
</template>

<script>
const getOrderUrl = "http://localhost:3001/client/" + localStorage.getItem("mongoUserId")+'/orders';

import axios from 'axios';
import OrderCard from '@/views/clients/components/OrderCard.vue'

export default {
    name: 'ClientOrder',
    data(){
        return{
            orderList:[],
            title:'',
        }
    },
    mounted(){
        this.getOrders();
    },
    methods:{
        getOrders(){
            console.log(getOrderUrl)
            console.log('wtf')
            axios.get(getOrderUrl,{
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }).then((data) => {
            console.log('list of orders:' ,data['data'])
                this.orderList = data['data'];
            })
        }
    },
    components:{
        OrderCard
    }
}

</script>

<style>
</style>