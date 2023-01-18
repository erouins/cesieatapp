<template>
  <div class="menu_article_card">
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

</style>