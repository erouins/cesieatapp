<template>
  <div class="menu_article_card">
    <MenuCard v-bind:menu="this.item" />
    <button class="button-edit" type='button' @click="goToUpdatePage">
      <img src="@/assets/modify.png" alt="" />
    </button>
    <button class="button-delete" type='button' @click="removeMenu">
      <img src="@/assets/remove.png" alt="" />
    </button>
  </div>
</template>

<script>
import MenuCard from "@/components/MenuCard.vue";
import Axios from '@/services/callerService';

const deleteMenuUrl = "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId")+'/menu/delete'
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
    },
    removeMenu(){
      console.log('item: ', this.item['id'])
      Axios.delete(deleteMenuUrl,{data:{
        menuId: this.item['id'], userId: localStorage.getItem("mongoUserId")
      }}).then((response) => {
        console.log('menu deleted')
      })
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