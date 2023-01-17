<template>
  <div class="orderCard">
    <div class="orderNumber">
      <h2>Order n°{{ order["id"].slice(-5) }}</h2>
      <div>
        <button v-if="order['status'] == 'rejected' || order['status'] == 'done'" id='btnRemove' type="button">Remove from archives</button>
      </div>
    </div>
    <div class="order-body">
      <ul>
        <li class="item_row" v-for="menu in this.menus" :key="menu.id">
          <p>{{ menu['name'] }}&emsp;{{ menu['price'] }}$</p>
        </li>
      </ul>
      <ul>
        <li class="item_row" v-for="article in this.articles" :key="article.id">
          <p>{{ article['name'] }}&emsp;{{ article['price'] }}$</p>
        </li>
      </ul>
      <div>Total price : {{ this.totalPrice }}$</div>
    </div>
    <br />
    <div class="order-footer">
      <OrderFooter :orderState="this.order['status']" :isPayed="this.order['isPayed']" />
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
    removeFromHistorical(){
      console.log('idd: ',this.order['id']);
      const removeFromHistoricalUrl = "http://localhost:3001/restaurant/"+this.order['id']+"/order/delete";
      Axios.delete(removeFromHistoricalUrl).then((response) =>{
        this.$router.go();
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

.orderNumber {
  display: grid;
  grid-template-columns: 3fr 3fr;
}

.orderCard {
  text-align: left;
  left: 50%;
  width: 50%;
  height: 20%;
  margin: 5%;
  align-items: center;
  padding: 1em;
  border-radius: 15px;
  background: #fefefe;
  transition: box-shadow 0.5s;
  box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
}
</style>