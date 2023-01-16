<template>
    <body>
        <div class="card">
            <div class="card-title">Add your deliverer informations</div>
            <form @submit.prevent="register">
                <div class="input-label"><label for="deliverer_firstname">First name</label></div>
                <input class="input-field-auth" type="text" id="deliverer_firstname" v-model="profil.firstName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="deliverer_lastname">Last name</label></div>
                <input class="input-field-auth" type="text" id="deliverer_lastname" v-model="profil.lastName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="deliverer_address">Address</label></div>
                <input class="input-field-auth" type="text" id="deliverer_address" v-model="profil.address" required/>
                <div class="input-label"><label for="restaurant_city">city</label></div>
                <input class="input-field-auth" type="text" id="restaurant_city" v-model="profil.city" required/>
                <div class="input-label"><label for="restaurant_zipcode">zipCode</label></div>
                <input class="input-field-auth" type="text" id="restaurant_zipcode" v-model="profil.zipCode" required/>
                <button class="submit-button" type="submit">submit</button>
            </form>
        </div>
    </body>
</template>

<script >
export default {
    name: "DelivererRegister",
    data() {
        return {
            profil: {
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                zipCode: '',
                image: ''
            },
        }
    },

    methods: {
        register() {
            console.log(localStorage.getItem('token'))
            fetch('http://localhost:3001/deliverer/create', {
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
                this.$router.push("/deliverers/main"); 
            }).catch((err) => {
                console.log(err);
            });
        },

        
    }
}
</script>

<style>

</style>