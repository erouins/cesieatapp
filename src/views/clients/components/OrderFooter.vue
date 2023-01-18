<template>
    <div>
        <div v-if="this.orderState == 'pending'">
            <div v-if="this.isPayed">Pending validation</div>
            <div v-else>Awaiting payment</div>
            <div >
            <button class="green-button" v-if="!this.isPayed" @click="payOrder">Pay</button>
            <button class="red-button" @click="remove">Delete</button>
            </div>
        </div>
        <div v-else-if="this.orderState == 'accepted'">Accepted</div>
        <div v-else-if="this.orderState == 'rejected'">Rejected</div>
        <div v-else-if="this.orderState == 'deliver'">Waiting for delivering </div>
        <div v-else-if="this.orderState == 'done'">Delivered</div>
        <div v-else-if="this.orderState == 'restaurantAccepted'">Waiting for a delivery</div>
    </div>
</template>

<script>

import Axios from '@/services/callerService';
const url = "http://localhost:3001/client/"+localStorage.getItem("mongoUserId")+"/create-checkout-session"

export default {
    name:'OrderFooter',

    methods:{
        payOrder(){
              Axios
                .post(
                url,
                { id: this.orderId}
                ).then((response) => {
                if(response.status == 200){
                    window.open(response.data.url, '_blank', 'noreferrer');
                         Axios
                            .post(
                            "http://localhost:3001/client/payOrder",
                            { id: this.orderId}
                            ).then((response) => {
                            if(response.status == 200){
                               console.log("succes pay")
                            }
                            else {
                                console.log("erreur pay")
                            }
                        });
                }
                else {
                    console.log("erreur pay  ")
                }
            });
        },
        remove(){
            const removeFromHistoricalUrl = "http://localhost:3001/client/"+this.orderId+"/order/delete";
            Axios.delete(removeFromHistoricalUrl).then((response) =>{
                console.log("order delete")
      });
      
    },
        
    },

    props:{
        orderId: '',
        orderState:'',
        isPayed:'',
    },
    mounted(){
    console.log("order state: ", this.orderState)
    
    },
}

</script>