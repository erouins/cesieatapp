<template>
    <div div class = 'users'>
        <h1>Hello user number {{id}}</h1>
    </div>
</template>

<script>
export default {
    name: 'UserHome',
    props:['id']
    
}
</script>