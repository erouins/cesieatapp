<template>
  <body>
    <div class="card">
      <div class="card-title">Add a new menu</div>
      <form @submit.prevent="createMenu">
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
          <div class = "dropdownContainer">
            <select v-model="selectedArticle" class = "dropdown">
            <option v-for="(item, index) in this.restaurantArticles" :value="item" :key="index">{{ item["name"] }}</option>
          </select>
          <button type="button" class="dropdownButton" @click="addToMenu">Add</button>
          </div>
          
          <div class = "dropdownContainer">
            <select v-model="removedArticle" class = "dropdown">
            <option v-for="(item, index) in this.articlesDisplayed" :value="item" :key="index">
              {{ item['name'] }}
            </option>
          </select>
          <button type="button" class="dropdownButton" @click="removeFromMenu">
            Remove
          </button>
          </div>

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
          <label for="menu_price">price (in $)</label>
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
const getRestaurantUrl =
  "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");

export default {
  name: "CreateMenu",
  data() {
    return {
      menu: {
        name: "",
        articles: [],
        description: "",
        price: "",
        image: "",
      },
      articlesDisplayed: [],
      restaurantArticles: [],
      selectedArticle: '',
      removedArticle: ''
    };
  },
  mounted() {
    this.getRestaurant();
  },
  methods: {
    addToMenu() {
      this.articlesDisplayed.push(this.selectedArticle)
    },
    removeFromMenu() {
      this.articlesDisplayed.splice(this.articlesDisplayed.indexOf(this.removedArticle), 1)
    },
    getRestaurant() {
      axios
        .get(getRestaurantUrl, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((data) => {
          this.restaurantArticles = data["data"]["articles"];
        });
    },
    createMenu() {
      this.articlesDisplayed.forEach(element => {
        this.menu.articles.push(element["ObjectId"])
      });
      console.log(this.menu.articles);
      axios.post(
        createMenuUrl,
        { menu: this.menu, userId: localStorage.getItem("userId") },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    async handleImageChange(e) {
      this.menu.image = await imgUtils.handleImageChange(e);
    },
  },
};
</script>

<style>
.dropdown {
  left: initial;
  width: 70%;
  font-size: 1.2em;
  margin-bottom: 2em;
  border-radius: 5px;
  border-width: 3px;
  border-color: #93b721;
  box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
}

.dropdownButton {
  display: flex;
  right: 100%;
  font-size: 1em;
  height: 1%
}

.dropdownContainer {
   display: flex;
}
</style>