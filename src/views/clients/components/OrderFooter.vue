<template>
    <div>
        <div :v-if="orderState == 'pending'">a</div>
        <div :v-if="orderState == 'accepted'">b</div>
        <div :v-if="orderState == 'rejected'">c</div>
        <div :v-if="orderState == 'deliver'">d</div>
        <div :v-if="orderState == 'done'">e</div>
        <div :v-if="orderState == 'restaurantAccepted'">f</div>
    </div>
</template>

<script>
export default {
    name:'OrderFooter',
    props:{
        orderState:''
    },

}
</script>