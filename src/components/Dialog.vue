<template>
  <div>
    <v-card-actions>
      <v-btn rounded outlined @click.stop="(dialog = true), (created = true)">
        VS. Friend
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="290">
      <div v-if="created">
        <v-card-title>
          Choose whether to create a lobby or to join one.
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple darken-4" rounded @click="createLobby">
            Create
          </v-btn>
          <v-btn color="purple darken-4" rounded @click="created = false">
            Join
          </v-btn>
        </v-card-actions>
      </div>
      <div v-if="!created">
        <v-card-title> Please paste your invitation code! </v-card-title>
        <v-col>
          <v-text-field v-model="gameCode" label="Code" required></v-text-field>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="purple darken-4" rounded @click="joinLobby(gameCode)">
            Join
          </v-btn>
        </v-card-actions>
      </div>
      <!-- and another one -->
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      created: true,
      gameCode: "",
    };
  },
  methods: {
    ...mapActions(["createLobby_s","joinLobby_s"]),

    createLobby: function () {
      this.createLobby_s();
    },
    joinLobby: function (code) {
      this.joinLobby_s(code);
    },
  },
};
</script>