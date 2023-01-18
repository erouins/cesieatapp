<template>
  <body>
    <div class="resto-card">
      <div class="card-title">{{this.title}}</div>
      <form @submit.prevent="editArticle">
        <div class="input-label"><label for="article_name">name</label></div>
        <input
          class="input-field-auth"
          type="text"
          id="article_name"
          v-model="article.name"
          title="The first name must contains only letters"
          required
          autocomplete
        />
        <div class="input-label">
          <label for="article_description">description</label>
        </div>
        <input
          class="input-field-auth"
          type="text"
          id="article_description"
          v-model="article.description"
        />
        <div class="input-label">
          <label for="article_price" 
            >price (in $)</label
          >
        </div>
        <input
          class="input-field-auth"
          type="text"
          id="article_address"
          v-model="article.price"
          pattern="[0-9]+.[0-9]{2}"
          required
        />
        <div class="input-label">
          <label for="image">Image :</label>
          <input type="file" id="image" @change="handleImageChange" />
          <img class="fixed-size-img" :src="article.image" alt="article image" />
        </div>
        <button class="green-button " type="submit">submit</button>
      </form>
    </div>
  </body>
</template>

<script >
import imgUtils from "@/utils/imgUtils.js";
import Axios from '@/services/callerService';

const createArticleUrl =
  "http://localhost:3001/restaurant/" +
  localStorage.getItem("mongoUserId") +
  "/article/create";

const updateArticleUrl = 
"http://localhost:3001/restaurant/" +
  localStorage.getItem("mongoUserId") +
  "/article/update";


export default {
  name: "ArticleForm",
  data() {
    return {
      articleStored: this.$store.getters.getArticle,
      article: {
        id: this.$store.getters.getArticle['id'],
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
          this.title = 'Update article'
            this.article.name = this.articleStored["name"];
            this.article.description = this.articleStored["description"];
            this.article.price = this.articleStored["price"];
            this.article.image = this.articleStored["image"];
        }
        else{
          this.title = 'Add a new article'
        }
    },
  methods: {
    addToMenu() {
      this.articlesDisplayed.push(this.selectedArticle)
    },
    removeFromMenu() {
      this.articlesDisplayed.splice(this.articlesDisplayed.indexOf(this.removedArticle), 1)
    },
    editArticle(){
        if(this.type == 'update'){
            this.updateArticle();
        }
        else{
            this.createArticle();
        }
    },
    createArticle() {
      Axios
        .post(
          createArticleUrl,
          { article: this.article, userId: localStorage.getItem("userId"), }
        ).then((response) => {
          if(response.status == 201){
            this.$router.push('/restaurants/home/articles')
          }
          else {
            console.log("erreur création article ")
          }
                      });
    },

    updateArticle() {
      console.log('user id :',localStorage.getItem("userId"))
      console.log('resto id :',localStorage.getItem("mongoUserId"))
      console.log('article id :',this.article.id)
      Axios
        .put(
          updateArticleUrl,
          { article: this.article, userId: localStorage.getItem("userId"), }
        )
        this.$router.push('/restaurants/home/articles')
    },

    async handleImageChange(e) {
      this.article.image = await imgUtils.handleImageChange(e);
    },
  },
};
</script>

<style>
</style>