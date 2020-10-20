<template>
  <nav>
    
      <v-toolbar flat  class="transparent">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light">Senet</span>
          <span class="font-weight-medium deep-purple--text text--lighten-2"
            >Games</span
          >
        </v-toolbar-title>
        <!-- left -->
        <v-spacer></v-spacer>
        <!-- right -->

        <v-btn depressed rounded fab color="deep-purple" small class="mx-1">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn depressed rounded fab color="deep-purple" small class="mx-5">
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-toolbar>
    
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
</style>