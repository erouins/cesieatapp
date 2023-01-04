<template>
    <div>
        <LoginForm msg = "Connectez-vous :"/>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
    name: "Login",
    components:{
        LoginForm
    } 
}
</script>