<template>
  <div class="order-user-card">
    <div class="orderNumber">
      <h2>Order n°{{ order["id"].slice(-5) }}</h2>
    </div>
    <div class="order-body">
      <div class="list-items">
        <div class="item-row" v-for="menu in this.menus" :key="menu.id">
          <div><li>{{ menu['name'] }}</li></div>
          <div>{{ menu['price'] }}$</div>
        </div>
        <div class="item-row" v-for="article in this.articles" :key="article.id">
          <div><li>{{ article['name'] }}</li></div>
          <div>{{ article['price'] }}$</div>
        </div>
      </div>
      <div class="item-row">
        <div class="bold">Total price :</div>
        <div class="bold">{{ this.totalPrice }}$</div>
      </div>
    </div>
    <div class="order-footer">
      <OrderFooter :orderState="this.order['status']" :isPayed="this.order['isPayed']" :orderId="order['id']"/>
    </div>
     <div>
        <button @click="remove" class="red-button" style="margin-top: 20px" v-if="order['status'] == 'rejected' || order['status'] == 'done'" id='btnRemove' type="button">Remove from archives</button>
      </div>
  </div>
</template>

<script>

import OrderFooter from '@/views/clients/components/OrderFooter.vue'
import Axios from '@/services/callerService';
export default {
  name: "OrderCard",
  props: {
    order: Object,
  },
  data() {
    return {
      menus: Array,
      articles: Array,
      totalPrice: 0,
      orderId:''
    };
  },
  methods: {
    remove(){
      console.log('idd: ',this.order['id']);
      const removeFromHistoricalUrl = "http://localhost:3001/restaurant/"+this.order['id']+"/order/delete";
      Axios.delete(removeFromHistoricalUrl).then((response) =>{
        console.log("order delete")
      });
      
    },
    caculateTotalPrice() {
      this.order['menus'].forEach((element) => {
        this.totalPrice += element["price"];
      });
      this.order['articles'].forEach((element) => {
        this.totalPrice += element["price"];
      });
      this.totalPrice = this.totalPrice.toFixed(2);
    },
  },
  mounted() {
    this.caculateTotalPrice();
    this.menus = this.order["menus"];
    this.articles = this.order["articles"];
    this.orderId = this.order['id'];
  },
  components: {
    OrderFooter
  }
};
</script>

<style>
#btnRemove {
  text-align: center;
}

.list-items{
  margin-bottom: 10px;
}

.order-body{
  justify-content: center;
  margin-bottom: 20px;
}

.orderNumber {
  display: flex;
  grid-template-columns: 3fr 3fr;
  justify-content: center;
}

.order-footer{
  display: flex;
  justify-content: center;
}

.order-user-card {
  width: 350px;
  padding: 12px;
  margin: 10px;
  border-radius: 15px;
  background: #fefefe;
  transition: box-shadow 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);

}
</style>