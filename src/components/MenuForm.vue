<template>
  <body>
    <div class="card">
      <div class="card-title">{{this.title}}</div>
      <form @submit.prevent="editMenu">
        <div class="input-label"><label for="menu_name">name</label></div>
        <input
          class="input-field-auth"
          type="text"
          id="menu_name"
          v-model="menu.name"
          title="The first name must contains only letters"
          required
          autocomplete
        />
        <div class="input-label">
          <label for="menu_description">description</label>
        </div>
        <input
          class="input-field-auth"
          type="text"
          id="menu_description"
          v-model="menu.description"
        />
        <div class="input-label">
          <label for="menu_price" 
            >price (in $)</label
          >
        </div>
        <input
          class="input-field-auth"
          type="text"
          id="menu_address"
          v-model="menu.price"
          pattern="[0-9]+.[0-9]{2}"
          required
        />
        <div class="input-label">
          <label for="image">Image :</label>
          <input type="file" id="image" @change="handleImageChange" />
          <img :src="menu.image" alt="menu image" />
        </div>
        <button class="submit-button" type="submit">submit</button>
      </form>
    </div>
  </body>
</template>

<script >
import imgUtils from "@/utils/imgUtils.js";
import axios from "axios";

const createMenuUrl =
  "http://localhost:3001/restaurant/" +
  localStorage.getItem("mongoUserId") +
  "/menu/create";

const updateMenuUrl = 
"http://localhost:3001/restaurant/" +
  localStorage.getItem("mongoUserId") +
  "/menu/update";

export default {
  name: "MenuForm",
  data() {
    return {
      menuStored: this.$store.getters.getMenu,
      menu: {
        id: this.$store.getters.getMenu['id'],
        name: "",
        description: "",
        price: "",
        image: "",
      },
      title: ''
    };
  },
  props:{
    type:'',
  },
    mounted(){
        if(this.type == 'update'){
          this.title = 'Update menu'
            this.menu.name = this.menuStored["name"];
            this.menu.description = this.menuStored["description"];
            this.menu.price = this.menuStored["price"];
            this.menu.image = this.menuStored["image"];
        }
        else{
          this.title = 'Add a new menu'
        }
    },
  methods: {
    editMenu(){
        if(this.type == 'update'){
            this.updateMenu();
        }
        else{
            this.createMenu();
        }
    },
    createMenu() {
      axios
        .post(
          createMenuUrl,
          { menu: this.menu, userId: localStorage.getItem("userId"), },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        )
    },

    updateMenu() {
      axios
        .put(
          updateMenuUrl,
          { menu: this.menu, userId: localStorage.getItem("userId"), },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        )
    },

    async handleImageChange(e) {
      this.menu.image = await imgUtils.handleImageChange(e);
    },
  },
};
</script>

<style>
</style>