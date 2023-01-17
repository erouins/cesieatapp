<template>
    <div v-if="this.$route.path ==  '/clients/order'">
<div 
    v-for="(item, index) in this.orderList"
    :key="index"
    class="order_card"
  >
    <OrderCard v-if="item['status'] != 'rejected' && item['status'] != 'done'" v-bind:order="item" />
  </div>
    </div>
    <div v-else-if="this.$route.path ==  '/clients/historical' || this.$route.path ==  '/deliverers/historical' || this.$route.path ==  '/restaurants/historical'">
        <div 
    v-for="(item, index) in this.orderList"
    :key="index"
    class="order_card"
  >
    <OrderCard v-if="item['status'] == 'rejected' || item['status'] == 'done'" v-bind:order="item" />
  </div>
    </div>
    
</template>

<script>
let getOrderUrl = "http://localhost:3001/"+ localStorage.getItem("accountType") +"/" + localStorage.getItem("mongoUserId")+'/';

import axios from 'axios';
import OrderCard from '@/views/clients/components/OrderCard.vue'

export default {
    name: 'OrdersPage',
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
            console.log('show me: ', '/'+localStorage.getItem("accountType")+'s/historical')
            if(this.$route.path == '/'+localStorage.getItem("accountType")+'s/historical'){
                getOrderUrl= "http://localhost:3001/"+ localStorage.getItem("accountType") +"/" + localStorage.getItem("mongoUserId")+'/historical'
                console.log('url: ',getOrderUrl)
            }else{
                getOrderUrl="http://localhost:3001/"+ localStorage.getItem("accountType") +"/" + localStorage.getItem("mongoUserId")+'/orders'
            }
            console.log(getOrderUrl)
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