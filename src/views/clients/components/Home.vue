<template>
  <div class="box-contener">
    <div class="restaurant-box">
      <div class="restaurant-box-image"></div>
      <div class="restaurant-box-title">Macdo</div>
      <div class="restaurant-box-description"></div>
    </div>
    <div class="restaurant-box">
      MacDo
    </div>
    <div class="restaurant-box">
      MacDo
    </div>
    <div class="restaurant-box">
      MacDo
    </div>
    <div class="restaurant-box">
      MacDo
    </div>
    <div class="restaurant-box">
      MacDo
    </div>
    <div class="restaurant-box">
      MacDo
    </div>

  </div>
</template>

<script>
export default {
  name: "ClientHome",
};
</script>

<style>
  .box-contener {
    height: 100%;
    width: 100%;
    padding-top: 4px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .restaurant-box {
    width: 300px;
    height: 220px;
    cursor: pointer;
    padding: 12px;
    margin: 10px;
    border-radius: 10px;
    font-size: 1em;
    color: #2c3e50;
    background: #fefefe;
    box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
    transition: 0.5s;
  }

  
  

</style>