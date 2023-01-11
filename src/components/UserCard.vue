<template>
    <div class="card rounded-border">
    <div class="card-header">
      <h3>{{ name }}</h3>
    </div>
    <div class="card-body">
      <p>{{ address }}</p>
      <p>{{ description }}</p>
    </div>
  </div>
</template>


<script>
export default {
    name: 'UserCard',

     props: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  margin-bottom: 20px;
  overflow: hidden;
}

.rounded-border {
  border-radius: 20px;
}

.card-header {
  background: #f6f6f6;
  padding: 20px;
  text-align: center;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
}

.card-body {
  padding: 20px;
}
</style>
