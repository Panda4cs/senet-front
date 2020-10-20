<template>
  <div class="game">
    <v-row>
      <v-col class="text-center">You are: {{ getPlayer }}'s</v-col>
      <v-col class="text-center" v-if="getTurn && !getWinner && !getTie">
        Your Turn</v-col
      >
      <v-col class="text-center" v-if="!getTurn && !getWinner && !getTie">
        Opponent's Turn</v-col
      >
      <v-col class="text-center" v-if="getWinner && !getTie">
        Winner is: {{ getWinner }}</v-col
      >
      <v-col class="text-center" v-if="getTie"> Tie Game</v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>

    <v-row
      class="d-flex justify-center"
      v-for="row in getState"
      :key="row[0].cellID"
    >
      <div
        class="cell rounded-lg"
        cols="3"
        v-for="cell in row"
        :key="cell.cellID"
        @click="clickAction(row[0].cellID, cell.cellID)"
      >
        <img
          src="../assets/o.svg"
          alt="asdasduaisd"
          v-if="cell.isClicked && cell.toPlayer == `o`"
          class="cellImg"
        />
        <img
          src="../assets/x.svg"
          alt="asdasduaisd"
          v-if="cell.isClicked && cell.toPlayer == `x`"
          class="cellImg"
        />
      </div>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <v-row align="center" justify="space-around" class="my-3">
      <v-btn
        @click="resetGame"
        color="purple darken-4"
        large
        :disabled="getWinner == false && getTie == false"
        >Play Again <v-icon>mdi-replay</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tic-tac-toe",
  data: function () {
    return {
      state1: "",
    };
  },
  methods: {
    ...mapActions([
      "registerClick",
      "createGame",
      "registerSocket",
      "toggleTurn",
      "resetBoard",
    ]),
    clickAction: function (rowID, cellID) {
      if (this.getTurn) {
        this.registerClick({ rowID, cellID });
      } else {
        console.log("not your turn");
      }
    },
    resetGame: function () {
      console.log("reset");
      this.resetBoard();
    },
  },
  computed: {
    ...mapGetters(["getState", "getTurn", "getPlayer", "getWinner", "getTie"]),
  },
  created() {
    this.createGame();
  },
};
</script>
<style scoped>
.cell {
  width: 100px;
  height: 100px;
  background-color: #263238;
  margin: 5px;
}
@media only screen and (max-width: 419px) {
  .cell {
    width: 80px;
    height: 80px;
  }
  .cellImg {
    width: 80px;
    height: 80px;
  }
}
@media only screen and (min-width: 420px) {
  .cell {
    width: 120px;
    height: 120px;
  }
  .cellImg {
    width: 120px;
    height: 120px;
  }
}
@media only screen and (min-width: 950px) {
  .cell {
    width: 150px;
    height: 150px;
  }
  .cellImg {
    width: 150px;
    height: 150px;
  }
}
.game {
  min-width: 320px;
}
</style>