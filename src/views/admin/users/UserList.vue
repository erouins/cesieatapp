<template>
    <div>
        <h1>Users List</h1>
        <ul>
            <li v-for = "user in users" :key="user.id">
                {{user.id}}
            </li>
        </ul>
    </div>
</template>