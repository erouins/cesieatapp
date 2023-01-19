<template>
  <div class="orderCard">
    <div class="orderNumber">
      <h2>Order n°{{ this.order["id"].slice(-5) }}</h2>
    </div>
    <div class="order-body">
      <ul>
        <li class="item_row" v-for="menu in this.menus" :key="menu.id">
          <p>{{ menu['name'] }}</p>
          <p>price: {{ menu['price'] }}$</p>
        </li>
      </ul>
      <ul>
        <li class="item_row" v-for="article in this.articles" :key="article.id">
          <p>{{ article['name'] }}</p>
          <p>price: {{ article['price'] }}$</p>
        </li>
      </ul>
      <div>Total price : {{ this.totalPrice }}$</div>
    </div>
  </div>

</template>

<script>
import Axios from '@/services/callerService';

export default {
  name: "OrderDetails",

  props: {
    order: Object,
  },
  data() {
    return {
      menus: Array,
      articles: Array,
      totalPrice: 0,
      orderId: '',
    };
  },
  mounted() {
      console.log("order", this.order)
      this.caculateTotalPrice();
      this.menus = this.order["menus"];
      this.articles = this.order["articles"];
      this.orderId = this.order['id'];
  },
 
  methods: {
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
};
</script>

<style>
.orderCard {
  text-align: center;
  justify-content: center;
  left: 50%;
  width: 30%;
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