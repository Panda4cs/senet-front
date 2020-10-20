<template>
  <v-app>
    <v-container>
      <Navigation></Navigation>
      <v-main>
        <v-container class="fluid">
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",

  components: { Navigation },

  data: () => ({
    //
  }),
};
</script>
