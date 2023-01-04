<template>
<div>
    <h1>{{ msg }}</h1> 
<form @submit.prevent="register">
    <p class= "formGroup">
        <label for="user_mail">mail : </label>
        <input type="text" id="user_mail" v-model="user.email"/>
    </p>
    <p class= "formGroup">
        <label for="user_password">password : </label>
        <input type="text" id="user_password" v-model="user.password"/>
    </p>
    <p class="formGroup">
        <button type="submit" class="button">register</button>
    </p>
</form>

</div>

  
</template>


<script>
export default {
    name: "RegisterForm",
    data(){
        return{
            user:{
                email: '',
                password: ''
            }
        }
    },
    props: {
        msg: String,
    },
    methods: {
        register(){
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

        }
    }
  
}
</script>

<style>

</style>