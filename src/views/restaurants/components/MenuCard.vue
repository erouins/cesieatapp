<template>
  <div class="menu_card">
    <MenuCard v-bind:menu="this.item" />
    <button type='button' @click="goToUpdatePage">
      <img src="@/assets/modify.png" alt="" />
    </button>
  </div>
</template>

<script>
import MenuCard from "@/components/MenuCard.vue";
export default {
  props: {
    item: Object,
  },
  mounted(){
  },
  methods:{
    goToUpdatePage(){
        this.$store.commit('setMenu', this.item);
       this.$router.push({name: 'menuUpdate',params:{id: this.item["id"][0]+this.item["id"][1]+this.item["id"][2]}});
    }
  },
  name: "RestaurantMenuCard",
  components: {
    MenuCard,
  },
};
</script>

<style>
.menu_card {
  align-items: center;
  left: 50%;
  display: grid;
  grid-template-columns: 5fr 1fr;
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