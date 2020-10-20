// const cellDS = {
//   isClcicked: false,
//   toPlayer: null,
//   cellID: null,
// };
const game = [
  [
    { isClicked: false, toPlayer: null, cellID: 1 },
    { isClicked: false, toPlayer: null, cellID: 2 },
    { isClicked: false, toPlayer: null, cellID: 3 },
  ],
  [
    { isClicked: false, toPlayer: null, cellID: 4 },
    { isClicked: false, toPlayer: null, cellID: 5 },
    { isClicked: false, toPlayer: null, cellID: 6 },
  ],
  [
    { isClicked: false, toPlayer: null, cellID: 7 },
    { isClicked: false, toPlayer: null, cellID: 8 },
    { isClicked: false, toPlayer: null, cellID: 9 },
  ],
];
const createGame = () => {
  return game;
};
module.exports = {
  createGame,
};
