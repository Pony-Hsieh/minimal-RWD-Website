<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div> -->

  <div id="app">
    <!-- router-view 這兩種寫法都可以喔~ -->
    <!-- <router-view></router-view> -->
    <router-view />
  </div>

</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    /* 因為這裡使用 scss 語法，因此被判定錯誤，可以先忽略 */
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>