<template>
    <body>
        <div class="card">
            <div class="card-title">Add your client informations</div>
            <form @submit.prevent="register">
                <div class="input-label"><label for="client_firstname">First name</label></div>
                <input class="input-field-auth" type="text" id="client_firstname" v-model="profil.firstName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="client_lastname">Last name</label></div>
                <input class="input-field-auth" type="text" id="client_lastname" v-model="profil.lastName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="client_address">address</label></div>
                <input class="input-field-auth" type="text" id="client_address" v-model="profil.address" required/>
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
    name: "ClientRegister",
    data() {
        return {
            profil: {
                firstName: '',
                lastName: '',
                address: '',
                 city: '',
                zipCode: '',
                image: ''
            }
        }
    },

    methods: {
        register() {
            fetch('http://localhost:3001/client/create', {
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
                this.$router.push("/clients/home"); 
            }).catch((err) => {
                console.log(err);
            });
        },

        
    }
}
</script>

<style>

</style>