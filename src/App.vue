<template>
  <div id="app">

    <div id="nav">
      <b-navbar type="dark" variant="primary">
        <b-navbar-brand>
          Github User Browser
          <!-- <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link> -->
        </b-navbar-brand>
      </b-navbar>
    </div>

    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
