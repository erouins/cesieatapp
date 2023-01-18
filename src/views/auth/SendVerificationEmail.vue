<template>
  <div class="card">
    <div class="card-title">Verify Email</div>
    <form @submit.prevent="resend">
     
      <p>
         Please check your email box we have sent you a verification email
    </p>
    <p>
    if you have not received this email please click on the button below
    </p>
      <button class="green-button " type="submit">Resend</button>
      
    </form>
    </div>
</template>

<script>


const url = "http://localhost:3001/auth/send-verification-email"


import Axios from '@/services/callerService';
  
export default {
  name: "SendVerificationEmail",

  data() {
    return {
      textConfirm: '',
      user: {
        id: 0,
        email : ""
      },
    };
  },
 mounted(){
  console.log("user id : "+ localStorage.getItem('userId'))
  const userUrl = "http://localhost:3001/users/" + localStorage.getItem('userId')

       Axios.get(userUrl).then((response) => {
            
              if (response.status == 200) {
                  this.user.id = response.data['id'] 
                  this.user.email = response['data']['email'] 
                  console.log("good")

              Axios.post(url,
                        {user : this.user}).then((response) => {
                    console.log(response.data)
                    if (response.status == 204){
                        console.log(this.user.email)
                        this.textConfirm = "We have sent you an email to verify your email"
                      }
                    })
                }
              })
 },

 methods: {
    resend(){
      console.log( this.user)

      Axios.post(url,
                  {user : this.user}).then((response) => {
              console.log(response.data)
              if (response.status == 204){
                  console.log("envoyé")
                  this.textConfirm = "We have sent you an email to verify your email"
                }
              })
    }
  },
  
};
</script>

<style>

</style>