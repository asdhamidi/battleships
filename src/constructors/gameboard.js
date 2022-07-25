import Ship from "./ship";

function Gameboard(sBlocks) {
  let ships = [];
  let blocks = [];
  let hitBlocks = [];
  let sunkShips = 0;

  let setup = () => {
    for (let i in sBlocks) {
      let blks = sBlocks[i];
      let ship = Ship(blks);
      ships.push(ship);

      for (let b in blks) {
        let blk = blks[b];
        blocks.push(blk);
      }
    }
  };

  let receiveAttack = (block) => {
    hitBlocks.push(block);
    if (blocks.indexOf(block) != -1) {
      for (let i in ships) {
        let ship = ships[i];
        let shipBlocks = ship.getBlocks();
        if (shipBlocks.indexOf(block) != -1) {
          ship.hit(block);
          if (ship.isSunk()) sunkShips++;
        }
      }
      return true;
    }

    return false;
  };

  let getSunkShips = () => sunkShips;
  let allSunk = () => getSunkShips() == ships.length;
  let getBlocks = () => blocks;

  setup();

  return {
    receiveAttack,
    getSunkShips,
    allSunk,
    getBlocks,
  };
}

export default Gameboard;
