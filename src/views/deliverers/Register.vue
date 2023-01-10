<template>
    <body>
        <div class="card">
            <div class="card-title">Add your deliverer informations</div>
            <form @submit.prevent="register">
                <div class="input-label"><label for="deliverer_firstname">First name</label></div>
                <input class="input-field-auth" type="text" id="deliverer_firstname" v-model="deliverer.firstName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="deliverer_lastname">Last name</label></div>
                <input class="input-field-auth" type="text" id="deliverer_lastname" v-model="deliverer.lastName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="deliverer_address">Address</label></div>
                <input class="input-field-auth" type="text" id="deliverer_address" v-model="deliverer.address" required/>
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
            deliverer: {
                id: localStorage.getItem('userId'),
                firstName: '',
                lastName: '',
                address: '',
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
                body: JSON.stringify(this.deliverer)
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