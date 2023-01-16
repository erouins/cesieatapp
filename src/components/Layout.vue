<template>
    <div class="body-contener">
        <div class="main-content" v-bind:style="{marginLeft: margin_left, width: main_content_width}">
            <slot name="main-content"></slot>
        </div>
        <div id="side-bar" class="side-bar" v-bind:style="{display: visibility}">
            <slot name="side-menu"></slot>
        </div>
    </div>
    <div class='header-bar'>
            <div class='header-right-part' v-bind:style="{marginLeft: margin_left, paddingLeft: padding_left}">
                <div class="logo-titre">
                    <img class="logo-top-left" src="../assets/logo-cesi-eat.svg" alt="logo cesi eat"/>
                    <p>CesiEAT</p>
                </div>
            </div>
            <div class='header-left-part'>
                <button id="button-active-sidebar" class="button-active-sidebar" @click="hideSideMenu">
                    <img  class="icon-button" src="../assets/list.svg"/>
                </button>
            </div>
            <!-- <div class="search-bar">
                <input class="input-search-bar">
                <button clas="search-button">
                    <img class="icon-search" src="../assets/search.svg"/>
                </button>
            </div> -->
        </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {
                visibility: "block",
                margin_left: "",
                padding_left: "",
                main_content_width: ""
            }
        },
        methods: {
            hideSideMenu() {
                if(this.visibility == "block"){
                    this.visibility = "none"
                    this.margin_left =  "0px"
                    this.padding_left = "78px"
                    this.main_content_width = "calc(100% - 16px)"
                } else {
                    this.visibility = "block"
                    this.margin_left =  ""
                    this.padding_left = ""
                    this.main_content_width = ""
                }
            }
        }
    }
</script>

<style>
    body {
        margin: 0px;
        max-height: 500px;
        background-color: #eee;
        color: #212529;
        font-family: 'Roboto', 'Open Sans', Arial, Helvetica, sans-serif;
        text-align: center;
        font-size: 1em;
    }

    hr {
        background-color: #2c3e50;
        height: 2px;
        border: none;
    }

    .body-contener {
        height: 100%;
        width: 100%;
        position:absolute;
        overflow-y: scroll;
        scrollbar-width: thin;
    }

    .main-content {
        width: calc(100% - 94px);
        min-height: calc(100% - 72px);
        position: absolute;
        margin-top: 56px;
        margin-left: 78px;
        padding: 8px;
    }
    .header-bar {
        width: 100%;
        height: 56px;
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
    }
    .header-left-part {
        width: 78px;
        height: 56px;
        position: fixed;
        text-align: center;
        background: #fefefe;
    }
    .header-right-part {
        margin-left: 78px;
        width: 100%;
        height: 56px;
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        background: #fefefe;
        box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
        
    }

    .logo-titre {
        text-align: left;
        display: flex;
    }

    .logo-top-left {
        height: 2.7em;
    }

    .search-bar {
        margin: 0 30%; 
        width: 40%;
        position: absolute;   
        font-size: 1.2em;
        border-width: 3px;
        border-color: #93b721;
    }

    .input-search-bar {
        max-width: 750px;
        width: 100%;
        font-size: 1.2em;
        border-radius: 5px;
        border-width: 3px;
        border-color: #93b721;
        box-shadow: 2px 0px 5px rgb(0 0 0 / 20%);
    }

    .button-active-sidebar {
        outline: none;
        background: none;
        border: none;
        padding: 0;
        line-height: 0;
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
        margin: 5px;
        transition: 0.5s;
    }

    .button-active-sidebar:hover {
        box-shadow: 5px 0px 40px rgba(0, 0, 0, 30%);
        transition: 0.5s;
    }
    
    .icon-button{
        width: 36px;
        height: 36px;
        color : #2c3e50;
    }
    .side-bar {
        width: 70px;
        height: 100%;
        position: fixed;
        display: table-column;        
        padding: 60px 4px 4px 4px;
        background: #fefefe;
        box-shadow: 5px 0px 40px rgb(0 0 0 / 20%);
    }

    .button-sidemenu:enabled {
        height: 74px;
        width: 70px;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 5%;
        padding: 5px;
        margin-bottom: 6px;
        transition: 0.5s;
    }
    
    .footer-button {
        bottom: 0;
        position: fixed;
        background: #fefefe;
    }


    .button-active-sidebar:hover,
    .button-sidemenu:hover {
        box-shadow: 5px 0px 40px rgba(0, 0, 0, 30%);
        transition: 0.5s;
    }

    .button-active-sidebar:active,
    .button-sidemenu:active {
        background: #ebebeb;
        box-shadow: 5px 0px 40px rgba(0, 0, 0, 50%);
        transition: 0.5s;
    }

    .green-button {
        cursor: pointer;
        color: #212529;
        background-color: #93b721;
        font-size: 1.2em;
        font-weight: 600;
        padding: 0.7em 1em;
        margin: 10px;
        border-radius: 5px;
        border: 0;
        transition: 0.5s;
    }

</style>