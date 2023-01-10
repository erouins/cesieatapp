<template>
    <body>
        <div class="card">
            <div class="card-title">Add your restaurant informations</div>
            <form @submit.prevent="register">
                <div class="input-label"><label for="restaurant_name">name</label></div>
                <input class="input-field-auth" type="text" id="restaurant_name" v-model="restaurant.lastName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="restaurant_address">address</label></div>
                <input class="input-field-auth" type="text" id="restaurant_address" v-model="restaurant.address" required/>
                <div class="input-label"><label for="restaurant_city">city</label></div>
                <input class="input-field-auth" type="text" id="restaurant_city" v-model="restaurant.city" required/>
                <div class="input-label"><label for="restaurant_description">add a description</label></div>
                <input class="input-field-auth" type="text" id="restaurant_description" v-model="restaurant.description"/>
                <div class="input-label"><label for="restaurant_image">image</label></div>
                <input class="input-field-auth" type="text" id="restaurant_image" v-model="restaurant.image"/>
                
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
            restaurant: {
                id: localStorage.getItem('userId'),
                name: '',
                address: '',
                city: '',
                description :'',
                image: ''
            }
        }
    },

    methods: {
        register() {
            fetch('http://localhost:3001/delivery/create', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.restaurant)
            })
            .then((blob) => blob.json())
            .then((data) => {
                
            }).catch((err) => {
                console.log(err);
            });
        },

        
    }
}
</script>

<style>

</style>