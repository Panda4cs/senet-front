<template>
  <v-container>
    <v-row>
      <h1>Available Games</h1>
    </v-row>
    <v-row  class="d-inline-flex pa-8">
      <Games></Games>
    </v-row>
  </v-container>
</template>

<script>
import Games from "../components/Games";

export default {
  name: "Home",
  components: { Games },
};
</script>
