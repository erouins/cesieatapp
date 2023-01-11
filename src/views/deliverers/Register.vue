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
                
            }).catch((err) => {
                console.log(err);
            });
        },

        
    }
}
</script>

<style>

</style>