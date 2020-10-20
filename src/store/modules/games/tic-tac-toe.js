import io from "socket.io-client";
import axios from "axios";
import router from "../../../router";
import { createGame } from "../../../functions/game";
const api = "http://localhost:3000/";
//#game state
const state = {
  game: undefined,
  player: "x",
  myTurn: true,
  server: {
    socket: undefined,
  },
  code: "",
  winner: false,
  tieGame: {
    clickedCells: 0,
    isTie: false,
  },
};
/*
#   (｡◕‿‿◕｡)   -------  Getters Start ------- (づ｡◕‿‿◕｡)づ
*/
const getCode = (state) => state.code;
const getTie = (state) => state.tieGame.isTie;
const getTurn = (state) => state.myTurn;
const getState = (state) => state.game;
const getWinner = (state) => state.winner;
const getPlayer = (state) => state.player;

const getters = {
  getState,
  getCode,
  getTurn,
  getWinner,
  getPlayer,
  getTie,
};

/* 
# (づ｡◕‿‿◕｡)づ -------  Getters End ------- (｡◕‿‿◕｡)
*/
/*
@   (｡◕‿‿◕｡)   -------  Actions Start ------- (づ｡◕‿‿◕｡)づ
*/
const actions = {
  createGame: ({ commit }) => {
    commit("createGame");
  },
  registerClick: ({ commit }, cords) => {
    commit("register", cords);
  },
  createLobby_s: ({ commit }) => {
    //todo game exist?
    axios
      .get(api + "api/create/tic-tac-toe", {
        timeout: 5000,
      })
      .then((res) => commit("initLobby", res.data))
      .catch((err) => console.error(err));
  },
  joinLobby_s: ({ commit }, code) => {
    //todo game exist?

    axios
      .get(api + "api/join/tic-tac-toe/" + code, {
        timeout: 5000,
      })
      .then((res) => {
        if (res.data) {
          commit("joinLobby", res.data);
        } else {
          // console.log("No lamo");
        }
      })
      .catch((err) => console.error(err));
  },
  resetBoard: () => {
    state.server.socket.emit("resetBoard");
    // console.log("object");
  },
};
/* 
@ (づ｡◕‿‿◕｡)づ -------  Actions End ------- (｡◕‿‿◕｡)
*/
/*
#   (｡◕‿‿◕｡)   -------  Mutaions Start ------- (づ｡◕‿‿◕｡)づ
*/
const mutations = {
  createGame: (state) => {
    if (!state.game) {
      state.game = createGame();
    } else {
      state.game.forEach((element) => {
        element[0].isClicked = false;
        element[0].toPlayer = null;
        element[1].isClicked = false;
        element[1].toPlayer = null;
        element[2].isClicked = false;
        element[2].toPlayer = null;
      });
    }
  },
  initLobby: (state, room) => {
    // console.log(room);
    router.push("/waitingOpponent");
    state.code = room;
    state.server.socket = io(api + room);
    state.server.socket.on("startGame", () => {
      router.push("/ttt");
    });
    state.server.socket.on("reset", () => {
      RESET_BOARD(state);
    });
    state.server.socket.on("registerClick", (data) => {
      // console.log(data, state.game[0]);
      switch (data[0].rowID) {
        case 1:
          state.game[0][data[0].cellID - 1].isClicked = true;
          state.game[0][data[0].cellID - 1].toPlayer = data[1];
          break;
        case 4:
          state.game[1][data[0].cellID - 4].isClicked = true;
          state.game[1][data[0].cellID - 4].toPlayer = data[1];
          break;
        case 7:
          state.game[2][data[0].cellID - 7].isClicked = true;
          state.game[2][data[0].cellID - 7].toPlayer = data[1];
          break;
      }

      if (gameResult(state.game)) {
        state.myTurn = false;
        state.winner = data[1];
      } else {
        state.myTurn = !state.myTurn;
      }
      state.tieGame.clickedCells++;
      if (state.tieGame.clickedCells == 9) state.tieGame.isTie = true;
    });
  },

  register: (state, cords) => {
    // console.log(state.server.socket);
    state.server.socket.emit("userClick", [cords, state.player]);
  },
  joinLobby: (state, room) => {
    state.player = "o";
    state.code = room;
    state.myTurn = false;
    state.server.socket = io(api + room);
    state.server.socket.on("reset", () => {
      RESET_BOARD(state);
    });
    state.server.socket.on("registerClick", (data) => {
      // console.log(data, state.game[0]);
      switch (data[0].rowID) {
        case 1:
          state.game[0][data[0].cellID - 1].isClicked = true;
          state.game[0][data[0].cellID - 1].toPlayer = data[1];
          break;
        case 4:
          state.game[1][data[0].cellID - 4].isClicked = true;
          state.game[1][data[0].cellID - 4].toPlayer = data[1];
          break;
        case 7:
          state.game[2][data[0].cellID - 7].isClicked = true;
          state.game[2][data[0].cellID - 7].toPlayer = data[1];
          break;
      }
      if (gameResult(state.game)) {
        state.myTurn = false;
        state.winner = data[1];
      } else {
        state.myTurn = !state.myTurn;
      }
      state.tieGame.clickedCells++;
      if (state.tieGame.clickedCells == 9) state.tieGame.isTie = true;
    });
    state.server.socket.emit("opponentJoined");
    state.server.socket.on("startGame", () => {
      router.push("/ttt");
    });
  },
};
/* 
# (づ｡◕‿‿◕｡)づ -------  Mutaions End ------- (｡◕‿‿◕｡)
*/

//
const checkWinner = (x, y, z) => x === y && y === z && z != null;

const gameResult = (game) => {
  for (let i = 0; i < game.length; i++) {
    if (
      checkWinner(
        game[0][i].toPlayer,
        game[1][i].toPlayer,
        game[2][i].toPlayer
      ) ||
      checkWinner(game[i][0].toPlayer, game[i][1].toPlayer, game[i][2].toPlayer)
    ) {
      return true;
    }
  }
  if (
    checkWinner(
      game[0][0].toPlayer,
      game[1][1].toPlayer,
      game[2][2].toPlayer
    ) ||
    checkWinner(game[0][2].toPlayer, game[1][1].toPlayer, game[2][0].toPlayer)
  ) {
    return true;
  }
  return false;
};
//
const RESET_BOARD = (state) => {
  console.log(state);

  // state.game[0][0].isClicked = false;
  // state.game[0][0].toPlayer = null;
  state.game.forEach((row) => {
    row.forEach((cell) => {
      cell.isClicked = false;
      cell.toPlayer = null;
    });
  });
  state.winner = false;
  state.tieGame.clickedCells = 0;
  state.tieGame.isTie = false;

  if (state.player == "x") {
    state.player = "o";
    state.myTurn = false;
  } else {
    state.player = "x";
    state.myTurn = true;
  }
  console.log(state);
};
//
// game: undefined,
//   player: "x",
//   myTurn: true,
//   server: {
//     socket: undefined,
//   },
//   code: "",
//   winner: false,
//   tieGame: {
//     clickedCells: 0,
//     isTie: false,
//   },
//
export default {
  state,
  getters,
  actions,
  mutations,
};
