<template>
  <v-app>
    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './pages/Main';

export default {
  name: 'App',

  components: {
    Main,
  },


};
</script>

<style>
:root {
  --vh: 1vh;
  --gray: #B3B8CB;
}

html {
  overflow-y: inherit;
  overflow-x: hidden;
}

body {
  box-sizing: border-box;
  min-width: 360px;
  cursor: default;

  font-weight: 300;
  font-style: normal;
  font-size: 18px;
  line-height: 150%;
  padding: 0;
  margin: 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  overflow: hidden;
  min-width: 320px;
}
p {
  margin-bottom: 0;
}


</style>
