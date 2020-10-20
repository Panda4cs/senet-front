<template>
  <div>
    <h2 class="my-3 text-center">Waiting for your opponent to join!</h2>
    <h3 class="my-3 text-center">
      Your Invitation code is:
      <span
        class="font-weight-black purple--text title text--lighten-3"
        id="code"
        >{{ getCode }}</span
      >
      <v-btn
        class="mx-2"
        fab
        dark
        large
        color=""
        @click.stop.prevent="copyCode"
      >
        <v-icon dark> mdi-content-copy </v-icon>
      </v-btn>
    </h3>
    <v-row justify="center">
      <v-progress-circular
        :size="200"
        :width="5"
        color="purple"
        indeterminate
        class="my-4"
      ></v-progress-circular>
    </v-row>
    <h3 class="text-center">
      Once your opponent is connected you will be redirected.
    </h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getCode"]),
  },
  methods: {
    copyCode: function () {
      var range = document.createRange();
      range.selectNode(document.getElementById("code"));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>