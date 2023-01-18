<template>
    <div>
       
    </div>
</template>

<script>

import Axios from '@/services/callerService';
const url = "http://localhost:3001/client/"+localStorage.getItem("mongoUserId")+"/create-checkout-session"

export default {
    name:'OrderCheck',

    methods:{
        payOrder(){
              Axios
                .post(
                url,
                { id: this.orderId}
                ).then((response) => {
                if(response.status == 200){
                    window.open(response.data.url, '_blank', 'noreferrer');
                }
                else {
                    console.log("erreur pay  ")
                }
            });
        }
    },


    mounted(){
            Axios
                .post(
                url,
                { id: this.orderId}
                ).then((response) => {
                if(response.status == 200){
                    window.open(response.data.url, '_blank', 'noreferrer');
                }
                else {
                    console.log("erreur pay  ")
                }
            });
    
    },
}

</script>