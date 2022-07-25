import Gameboard from "./gameboard";

function Player(name, ships) {
  let gameboard = Gameboard(ships);
  let receiveAttack = (block) => gameboard.receiveAttack(block);
  let attack = (block, enemy) => {
    enemy.receiveAttack(block);
  };
  let getName = () => name;
  let getSunkShips = () => gameboard.getSunkShips();
  let getBlocks = () => gameboard.getBlocks();
  let allSunk = () => gameboard.allSunk();

  return {
    receiveAttack,
    attack,
    getName,
    getSunkShips,
    allSunk,
    getBlocks,
  };
}

export default Player;
