import Gameboard from "../constructors/gameboard";
import Ship from "../constructors/ship";

describe("Gameboard Tests", () => {
  let ship1, ship2, ship3;
  let gb;
  beforeEach(() => {
    ship1 = [1, 2, 3];
    ship2 = [5, 6, 7];
    ship3 = [11, 12, 13];
    gb = Gameboard([ship1, ship2, ship3]);
  });

  it("Returns Sunk Ships Correctly", () => {
    gb.receiveAttack(1);
    gb.receiveAttack(2);
    gb.receiveAttack(3);
    gb.receiveAttack(5);
    gb.receiveAttack(6);
    gb.receiveAttack(7);

    expect(gb.getSunkShips()).toBe(2);
  });

  it("allSunk() works Correctly", () => {
    gb.receiveAttack(1);
    gb.receiveAttack(2);
    gb.receiveAttack(3);
    gb.receiveAttack(5);
    gb.receiveAttack(6);
    gb.receiveAttack(7);
    gb.receiveAttack(12);
    gb.receiveAttack(11);
    gb.receiveAttack(13);

    expect(gb.allSunk()).toBe(true);
  });
});
