<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Available!</div>
        <v-list-item-title class="headline mb-1">
          Tic Tac Toe
        </v-list-item-title>
        <p class="text--secondary">
          The player who succeeds in placing three of their marks in a
          horizontal, vertical, or diagonal row is the winner.
        </p>
      </v-list-item-content>

      <v-list-item-avatar tile size="80">
        <img src="../assets/tic.svg" alt="" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <Dialog></Dialog>
      <!-- <v-btn outlined rounded text @click="createLobby"> vs Friend </v-btn> -->
      <v-btn outlined rounded text disabled> Queue up </v-btn>
      <v-btn outlined rounded text disabled> vs AI </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import Dialog from "../components/Dialog";
export default {
  components: { Dialog },
  
};
</script>

<style>
</style>