<template>
    <div>
        <button>Menu</button>
        <button>Article</button>
    </div>
    <div>
        <MenuCard name="LOLrr" price = "NICE" description="OK" imgSrc="@/assets/list.svg"/>
    </div>
        
</template>

<script>
import MenuCard from "@/components/MenuCard.vue";
export default {
    methods:{
        getMenus(){
            fetch("http://localhost:3001/users/find", {
            headers: {
              'Accept': "application/json",
              "Content-Type": "application/json",
              'Authorization': "Bearer " + data["tokens"]["access"]["token"],
            },
            method: "POST",
            body: JSON.stringify({
              accountType: localStorage.getItem('accountType'),
              userId: localStorage.getItem('userId'),
            }),
          })
            .then((blob) => blob.json())
            .then((data) => {
            });
        },
        getArticles(){
            fetch("http://localhost:3001/users/find", {
            headers: {
              'Accept': "application/json",
              "Content-Type": "application/json",
              'Authorization': "Bearer " + data["tokens"]["access"]["token"],
            },
            method: "POST",
            body: JSON.stringify({
              accountType: localStorage.getItem('accountType'),
              userId: localStorage.getItem('userId'),
            }),
          })
            .then((blob) => blob.json())
            .then((data) => {
            });
        }
    },
    name: 'CardContent',
    components: {
        MenuCard
    }
}
</script>