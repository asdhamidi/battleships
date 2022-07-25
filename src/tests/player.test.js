import Ship from "../constructors/ship";
import Gameboard from "../constructors/gameboard";
import Player from "../constructors/player";

describe("Player Tests", () => {
  let player, gb, gbEnemy, s1, s2, s3, s4;

  beforeEach(() => {
    s1 = [1, 2, 3];
    s2 = [9, 10, 11];
    s3 = [3, 4, 5];
    s4 = [7, 8, 9];
    gbEnemy = Gameboard([s3, s4]);
    player = Player("Rodrigo Astroturd", [s1, s2]);
  });

  it("getName() works", () => {
    expect(player.getName()).toBe("Rodrigo Astroturd");
  });

  it("attack() works", () => {
    let enemy = {
      name: "Fideroyolonda Smackonmytittyboosters",
      receiveAttack: jest.fn((block) => {
        enemy.attacked.push(block);
      }),
      gameboard: gbEnemy,
      attacked: [],
    };

    player.attack(7, enemy);

    expect(enemy.receiveAttack.mock.calls.length).toBe(1);
    expect(enemy.attacked[0]).toBe(7);
  });

  it("receivesAttack() works", () => {
    let hit1 = player.receiveAttack(1);
    let hit2 = player.receiveAttack(2);
    let hit3 = player.receiveAttack(3);
    let hit4 = player.receiveAttack(99);

    expect(player.getSunkShips()).toBe(1);
    expect(hit1 && hit2 && hit3).toBe(true);
    expect(hit4).toBe(false);
  });
});
