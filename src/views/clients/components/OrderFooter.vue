<template>
    <div>
        <div v-if="this.orderState == 'pending'">
            <div v-if="this.isPayed">En attente de validation</div>
            <div v-else>En attente de paiement</div>
            <button v-if="!this.isPayed">payer</button>
            <button>supprimer</button>
        </div>
        <div v-else-if="this.orderState == 'accepted'">
            supprimer
        </div>
        <div v-else-if="this.orderState == 'rejected'"> Rejected</div>
        <div v-else-if="this.orderState == 'deliver'"> Waiting for delivering </div>
        <div v-else-if="this.orderState == 'done'"> Delivered</div>
        <div v-else-if="this.orderState == 'restaurantAccepted'"> Waiting for a delivery</div>
    </div>
</template>

<script>

export default {
    name:'OrderFooter',
    props:{
        orderState:'',
        isPayed:'',
        socket: null,
    },
    mounted(){
    console.log("order state: ", this.orderState)
    
}
}

</script>