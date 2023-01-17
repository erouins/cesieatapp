<template>
  <body>
    <div class="card">
      <div class="card-title">Add a new menu</div>
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
        <div class="dropdownContainer">
          <select v-model="selectedArticle" class="dropdown">
            <option
              v-for="(item, index) in this.restaurantArticles"
              :value="item"
              :key="index"
            >
              {{ item["name"] }}
            </option>
          </select>
          <button type="button" class="dropdownButton" @click="addToMenu">
            Add
          </button>
        </div>

        <div class="dropdownContainer">
          <select v-model="removedArticle" class="dropdown">
            <option
              v-for="(item, index) in this.menuArticles"
              :value="item"
              :key="index"
            >
              {{ item["name"] }}
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
import Axios from '@/services/callerService';

const createMenuUrl =
  "http://localhost:3001/restaurant/" +
  localStorage.getItem("mongoUserId") +
  "/menu/create";

const getRestaurantUrl =
  "http://localhost:3001/restaurant/" + localStorage.getItem("mongoUserId");

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
        id:this.$store.getters.getMenu["id"],
        name: "",
        description: "",
        price: "",
        image: "",
        articles: [],
      },
      title: "",
      restaurantArticles: [],
      menuArticles: [],
      selectedArticle: "",
      removedArticle: "",
    };
  },
  props: {
    type: "",
  },
  mounted() {
    this.getRestaurant();
    console.log('articles: ',this.menuStored['articles'])
    if (this.type == "update") {
      this.title = "Update menu";
      this.menu.name = this.menuStored["name"];
      this.menu.description = this.menuStored["description"];
      this.menu.price = this.menuStored["price"];
      this.menu.image = this.menuStored["image"];
      this.menuArticles = this.menuStored["articles"];
    } else {
      this.title = "Add a new menu";
    }
  },
  methods: {
    addToMenu() {
      this.menuArticles.push(this.selectedArticle);
    },
    removeFromMenu() {
      this.menuArticles.splice(this.menuArticles.indexOf(this.removedArticle), 1);
    },
    getRestaurant() {
      Axios
        .get(getRestaurantUrl)
        .then((data) => {
          
          this.restaurantArticles = data["data"]["articles"];
        });
    },
    editMenu() {
      this.menuArticles.forEach(article => {
        console.log('article id : ', article['id'])
        this.menu.articles.push(article['id']);
      });
      if (this.type == "update") {
        this.updateMenu();
      } else {
        this.createMenu();
      }
    },
    createMenu() {
       Axios
        .post(
          createMenuUrl,
          { menu: this.menu, userId: localStorage.getItem("userId"), }
        ).then((response) => {
          if(response.status == 201){
            this.$router.push('/restaurants/home/menus')
          }
          else {
            console.log("erreur création menu ")
          }
                      });
    },

    updateMenu() {
      console.log(this.menu)
      Axios.put(
        updateMenuUrl,
        { menu: this.menu, userId: localStorage.getItem("userId") }
      );
      this.$router.push("/restaurants/home/menus");
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