<template>
    <div id="app" class="container">
        <!--    <div id="nav">-->
        <!--      <router-link to="/">Home</router-link> |-->
        <!--      <router-link to="/about">About</router-link>-->
        <!--    </div>-->
        <router-view/>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Verdana;
    }

    .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 15px;
        background-image: url(assets/bgi.jpg);
    }
</style>
