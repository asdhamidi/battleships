import Player from "./player";
import Ship from "../constructors/ship";
import Gameboard from "../constructors/gameboard";

function playerAI() {
  let makeShips = () => {
    let ships = [];
    let rows = [];
    let r;

    for (let i = 5; i > 0; i--) {
      while (true) {
        // Picks an unselected row.
        r = Math.floor(Math.random() * (9 - 0));
        if (rows.indexOf(r) == -1) {
          rows.push(r);
          break;
        }
      }

      // Picks a valid starting point for current size of ship.
      let start = Math.floor(Math.random() * (10 - i - 0));
      let blocks = [];
      for (let j = start; j < i + start; j++) blocks.push(j + 10 * r);

      ships.push(blocks);
    }

    return ships;
  };

  let names = [
    "Mega Mind",
    "Mr. Big Brain",
    "IQ420",
    "Smarty Pants and Shirts",
  ]; // Very clever name for comp.
  let name = names[Math.floor(Math.random() * (4 - 0))];
  let ships = makeShips();

  let genericPlayer = Player(name, ships);
  genericPlayer.attack = () => Math.floor(Math.random() * (99 - 0)); // Overriding the attack function.

  return genericPlayer;
}

export default playerAI;
