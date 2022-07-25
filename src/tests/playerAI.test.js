import playerAI from "../constructors/playerAI";

describe("AI tests", () => {
  let ai;

  beforeEach(() => {
    ai = playerAI();
  });

  it("Checking ship blocks", () => {
    let blocks = ai.getBlocks();
    let size = 5,
      j = 0;
    let check = true;

    // Checking if blocks of each ship is in the name row.
    for (; j < 15; ) {
      let i = size;
      let r = Math.floor(blocks[j] / 10);
      for (; i > 0; i--) {
        if (!(blocks[j] < 10 * (r + 1) && blocks[j] >= 10 * r)) check = false;

        j++;
      }
      size--;
    }

    expect(check).toBe(true);
  });

  it("Checking attacking blocks", () => {
    let check = true;

    for (let i = 0; i < 100; i++) {
      let coord = ai.attack();
      if (coord < 0 && coord > 99) check = false;
    }

    expect(check).toBe(true);
  });
});
