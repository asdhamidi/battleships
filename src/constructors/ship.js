function Ship(blocks) {
  let hitBlocks = [];
  let sunk = false;

  let isSunk = () => sunk;
  let hit = (block) => {
    hitBlocks.push(block);

    if (hitBlocks.length == blocks.length) sunk = true;
  };
  let getBlocks = () => blocks;

  return {
    isSunk,
    hit,
    getBlocks,
  };
}

export default Ship;
