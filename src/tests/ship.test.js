import Ship from "../constructors/ship";

describe("Ship Test", () => {
  let testShip;
  beforeEach(() => {
    testShip = Ship([1, 2, 3]);
  });

  it("Takes Hit", () => {
    const mockCallback = jest.fn(testShip.hit);

    mockCallback(1);
    mockCallback(2);

    expect(mockCallback.mock.calls.length).toBe(2);
  });

  it("GetBlock Works", () => {
    let block = testShip.getBlocks();
    let mockBlock = [1, 2, 3];
    let compare = JSON.stringify(block) == JSON.stringify(mockBlock);
    expect(compare).toBe(true);
  });

  it("Hit and isSunk Function Works)(+ve)", () => {
    testShip.hit(1);
    testShip.hit(2);
    testShip.hit(3);

    expect(testShip.isSunk()).toBe(true);
  });

  it("Hit and isSunk Function Works (-ve)", () => {
    testShip.hit(1);
    testShip.hit(2);

    expect(testShip.isSunk()).toBe(false);
  });
});
