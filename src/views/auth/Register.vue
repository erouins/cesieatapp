<template>
    <body>
        <div class="card">
            <div class="card-title">Sign in</div>
            <form @submit.prevent="register">
                <div class="input-label"><label for="user_firstname">First name</label></div>
                <input type="text" id="user_firstname" v-model="user.firstName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="user_lastname">Last name</label></div>
                <input type="text" id="user_lastname" v-model="user.lastName"
                    title="The first name must contains only letters" pattern="^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s]*[A-Za-zÀ-ÿ]$"
                    required autocomplete />
                <div class="input-label"><label for="user_mail">E-mail</label></div>
                <input type="text" id="user_mail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$"
                    title="Enter a valid email" v-model="user.email" required autocomplete />
                <div class="input-label"><label for="new_password">Password</label></div>
                <input type="password" id="new_password" v-model="user.password" @input="inputPassword" required />
                <div class="input-label"><label for="confirm_password">Confirm password</label></div>
                <input type="password" id="confirm_password" v-model="user.confirmPassword" @input="inputConfirmPassword" required />
                <div class="input-label"><label for="user_type">Select the type of your account</label></div>
                <select id="user_type" v-model="user.accountType" required>
                    <option v-for="option in user.typeOptions" v-bind:value="option.key" v-bind:key="option.key">{{ option.value }}</option>
                </select>
                <button class="submit-button" type="submit" >register</button>
                <p>You have an account ? <a href="http://localhost:8080/auth/Login">login</a></p>
            </form>
        </div>
    </body>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                accountType: '',
                typeOptions: [
                    { key: 'customer', value: 'Customer' },
                    { key: 'restaurant', value: 'Restaurant' },
                    { key: 'deliverer', value: 'Deliverer' }
                ],
            }
        }
    },

    methods: {
        register() {
            fetch('http://localhost:3001/users/new', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.user)
            })
            
            .then((blob) => blob.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('token', data.access_token);
                this.$router.push('/users/' + data.user_id[0]);
            });
        },

        inputPassword() {
            let new_password = document.querySelector("#new_password");
            
            if(!/^(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W+).*$/.test(new_password.value)) {
                new_password.setCustomValidity('The password must contain at leat: \n- 8 characters\n- one upper case letter\n- one lower case letter\n- one number\n- one special character');
            } else {
                new_password.setCustomValidity("");
            }
        },

        inputConfirmPassword() {
            let new_password = document.querySelector("#new_password");
            let confirm_password = document.querySelector("#confirm_password");

            if(new_password.value != confirm_password.value) {
                confirm_password.setCustomValidity('Confirm password do not match');
            } else {
                confirm_password.setCustomValidity('');
            }
        }
    }
}
</script>

<style>

</style>