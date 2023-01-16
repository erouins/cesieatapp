<template>
  <div class="orderCard">
    <div class="order number">
      <h2>Command n°{{ order["id"].slice(-5) }}</h2>
    </div>
    <div class="order-body">
      <ul>
        <li class="item_row" v-for="menu in this.menus" :key="menu.id">
          <p>{{ menu['name'] }}</p>
          <p>{{ menu['price'] }}</p>
        </li>
      </ul>
      <ul>
        <li class="item_row" v-for="article in this.articles" :key="article.id">
          <p>{{ article['name'] }}</p>
          <p>{{ article['price'] }}</p>
        </li>
      </ul>
      <div>Total price : {{ this.totalPrice }}</div>
    </div>
    <div class="order-footer">
      <OrderFooter :orderState="this.order['state']" />
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    caculateTotalPrice() {
      this.order['menus'].forEach((element) => {
        this.totalPrice += element["price"];
      });
      this.order['articles'].forEach((element) => {
        this.totalPrice += element["price"];
      });
    },
  },
  mounted() {
    this.caculateTotalPrice();
    this.menus = this.order["menus"];
    this.articles = this.order["articles"];
  },
};
</script>

<style>
.item_row {
  display: flex;
  flex-wrap: nowrap;
}

.orderCard {
  width: 300px;
  margin: 0 auto;
}
</style>