<template>
    <body>
        <div class="card">
            <div class="card-title">Add your restaurant informations</div>
            <form @submit.prevent="register">
                <div class="input-label"><label for="restaurant_name">name</label></div>
                <input class="input-field-auth" type="text" id="restaurant_name" v-model="profil.name"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="restaurant_address">address</label></div>
                <input class="input-field-auth" type="text" id="restaurant_address" v-model="profil.address" required/>
                <div class="input-label"><label for="restaurant_city">city</label></div>
                <input class="input-field-auth" type="text" id="restaurant_city" v-model="profil.city" required/>
                <div class="input-label"><label for="restaurant_zipcode">zipCode</label></div>
                <input class="input-field-auth" type="text" id="restaurant_zipcode" v-model="profil.zipCode" required/>
                <div class="input-label"><label for="restaurant_description">add a description</label></div>
                <input class="input-field-auth" type="text" id="restaurant_description" v-model="profil.description"/>
                <div class="input-label"><label for="restaurant_image">image</label></div>
                <input class="input-field-auth" type="text" id="restaurant_image" v-model="profil.image"/>
                
                <button class="submit-button" type="submit">submit</button>
            </form>
        </div>
    </body>
</template>

<script >
export default {
    name: "RestaurantRegister",
    data() {
        return {
            profil: {
                name: '',
                address: '',
                city: '',
                zipCode: '',
                description :'',
                image: ''
            }
        }
    },

    methods: {
        register() {
            fetch('http://localhost:3001/restaurant/create', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token'),
                    
                },
                method: 'POST',
                body: JSON.stringify({'profil': this.profil, 'userId': localStorage.getItem('userId')}, )
            })
            .then((blob) => blob.json())
            .then((data) => {
                console.log(data)
                localStorage.setItem('mongoUserId', data["id"]);
                this.$router.push("/restaurants/home"); 
            }).catch((err) => {
                console.log(err);
            });
        },

        
    }
}
</script>

<style>

</style>