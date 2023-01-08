<template>
    <div class="card">
        <div class="card-title">Login</div>
        <form @submit.prevent="login">
            <div class="input-label"><label>E-mail</label></div>
            <input type="text" id="user_mail" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$" title="Enter a valid email"  v-model="user.email" required autocomplete/>
            <div class="input-label"><label>Password</label></div>
            <input type="password" id="user_password" v-model="user.password" required/>
            <button class="submit-button" type="submit" >connect</button>
        </form>
        <p>Don't have an account ? <a href="http://localhost:8080/auth/Register">sign in</a></p>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return{
            user:{
                email: '',
                password: ''
            }
        }
    },

    methods: {
        login(){
            fetch('http://localhost:3001/auth/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
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
    body {
        background-color: #eee;
        color: #212529;
        font-family: 'Roboto', 'Open Sans', Arial, Helvetica, sans-serif;
        text-align: center;
        font-size: 1em;
    }

    input {
        width: 97%;
        font-size: 1.2em;
        margin-bottom: 2em;
        border-radius: 5px;
        border-width: 3px;
        border-color: #93b721;
        box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
    }

    select:focus,
    input:focus {
        outline: none;
        border-color: #0091ff;
        box-shadow: 2px 0px 5px rgb(0 0 0 / 30%);
    }

    select {
        width: 100%;
        font-size: 1.2em;
        margin-bottom: 2em;
        border-radius: 5px;
        border-width: 3px;
        border-color: #93b721;
        box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
    }

    select:focus{
        outline: none;
        border-color: #0091ff;
        box-shadow: 2px 0px 5px rgb(0 0 0 / 30%);
    }

    form {
        width: 100%;
    }

    a {
        color : #93b721;
    }

    a:active {
        color : #0091ff;
    }

    .input-label {
        font-size: 1.2em;
        color: #212529;
        text-align: left;
    }

    [title]:before {
        content: attr(title);
        white-space: pre-wrap;
        position: absolute;
        background: black;
        color: white;
        padding: 0.25em;
        z-index: 1;
        visibility: hidden;
        border-radius: 3px;
    }

    [title]:hover:before,
    [title]:focus:before {
        visibility: visible;    
    }

    .card {
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 20em;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        margin:auto;
        padding: 1em;
        border-radius: 15px;
        background: #fefefe;
        transition: box-shadow 0.5s;
        box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
    }

    .card-title {
        color: #212529;
        font-size: 2em;
        font-weight: 600;
        margin: 1em 0 1em 0;
    }

    .submit-button:enabled {
        color: #212529;
        background-color: #93b721;
        font-size: 1.2em;
        font-weight: 600;
        padding: 0.7em 1em;
        border-radius: 5px;
        border: 0;
        transition: 0.5s;
    }

    .submit-button:focus,
    .submit-button:hover {
        outline: none;
        background-color: #a2c924;
        transition: 0.5s;
        box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
    }

    .submit-button:active {
        background-color: #8aa923;
        box-shadow: 5px 0px 40px rgba(0, 0, 0, 30%);
    }

</style>