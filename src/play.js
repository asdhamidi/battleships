import UI from "./loader";
import playerAI from "./constructors/playerAI";
import Player from "./constructors/player";
import "./style.css";

let Gameplay = (() => {
  // Players
  let AI = playerAI();
  let player = null;

  // Game Variables
  let startSignal = false; // Signals the completion of block placing phase.

  // Arrays to store the attacked blocks;
  let playerHit = [];
  let compHit = [];

  // 0 = Player's turn, 1 = Comp's turn : Basially the Semaphore technique used in the critical section problem.
  let turn = 0;

  // Loads the UI and starts off the game.
  let begin = () => {
    UI.load();
    loadActionListeners();
    setup();
  };

  // Function for the block placer menu (BPMenu).
  let setup = () => {
    let size = 5;
    let playerShips = [];

    // Adding eventListeners to the squares in BPMenu, which will work as per the size of the current ship.
    let bps = document.querySelectorAll(".BPsquare");
    bps.forEach((sqr) => {
      sqr.addEventListener("mouseenter", function (e) {
        let i = Array.prototype.indexOf.call(bps, e.target);

        let limit = Math.floor(i / 10) * 10 + 10;

        if (checkValidSquare(i, bps, size) && i + size - 1 < limit) {
          // Safety Checks
          for (let j = i; j < i + size; j++) {
            bps[j].classList.add("sqr-hover");
          }
        }
      });

      sqr.addEventListener("mouseleave", function (e) {
        let i = Array.prototype.indexOf.call(bps, e.target);

        let limit = Math.floor(i / 10) * 10 + 10;

        if (i + size - 1 < limit) {
          for (let j = i; j < i + size; j++) {
            // Safety Checks
            bps[j].classList.remove("sqr-hover");
          }
        }
      });

      sqr.addEventListener("click", function (e) {
        if (!startSignal) {
          // Safety Checks
          let i = Array.prototype.indexOf.call(bps, e.target);
          let limit = Math.floor(i / 10) * 10 + 10;

          let ship = [];
          if (checkValidSquare(i, bps, size) && i + size - 1 < limit) {
            // Safety Checks
            for (let j = i; j < i + size; j++) {
              bps[j].style.backgroundColor = "#AAF";
              ship.push(j);
            }

            size--;
            playerShips.push(ship);

            if (size == 0) {
              // Size == 0 signifies the placements of all ships, to move to the gameplay phase.
              player = Player("You", playerShips);
              startSignal = true;
              setupBoard();
            }
          }
        }
      });
    });
  };

  // Places the ships, name, and score onto the player's board.
  let setupBoard = () => {
    let playerBlocks = player.getBlocks();
    let gameBlocks = document.querySelectorAll(".playerBoard .square");
    for (let i = 0; i < playerBlocks.length; i++) {
      let block = playerBlocks[i];
      gameBlocks[block].style.backgroundColor = "#AAF";
    }

    document.querySelector(".playerBoard .name").textContent = player.getName();
    document.querySelector(".compBoard .name").textContent = AI.getName();
    document.querySelector(".playerBoard").classList.toggle("inactive-board");
  };

  // Gets the AI's choice, checks againts the blocks.
  // Repeats if there's a successful hit.
  let AITurn = () => {
    turn++;
    setTimeout(() => {
      let block = getAIMove();
      playerHit.push(block);

      let check = player.receiveAttack(block);

      while (check) {
        markBlock(block, 1, true);
        block = getAIMove();
        check = player.receiveAttack(block);
      }

      if (!check) {
        markBlock(block, 1);
      }

      turn--;
      updateScore();
    }, 1500);
  };

  // Checks if the block has been hit before, if so, gets another choice from AI.
  let getAIMove = () => {
    let block = AI.attack();
    while (playerHit.indexOf(block) != -1) block = AI.attack();

    return block;
  };

  let winCheck = () => {
    if (AI.allSunk()) endGame(1);
    else if (player.allSunk()) endGame(2);

    boardActiveToggle();
  };

  // Shows End screen with message.
  let endGame = (winner) => {
    blurToggle();

    if (winner == 1) endScreenToggle("You won!");
    else endScreenToggle(AI.getName() + " won!");
  };

  let updateScore = () => {
    let currentCShips = AI.getSunkShips();
    let cShips = document.querySelector(".compBoard .ships");
    cShips.textContent = "Ships: " + (5 - currentCShips);
    let cSunk = document.querySelector(".compBoard .sunk");
    cSunk.textContent = "Sunk: " + currentCShips;

    let currentPShips = player.getSunkShips();
    let pShips = document.querySelector(".playerBoard .ships");
    pShips.textContent = "Ships: " + (5 - currentPShips);
    let pSunk = document.querySelector(".playerBoard .sunk");
    pSunk.textContent = "Sunk: " + currentPShips;

    winCheck();
  };

  // Utility Functions

  // Resets all boards, info, players, and gamevariables.
  let reset = () => {
    AI = playerAI();
    player = null;
    startSignal = false;
    compHit = [];
    playerHit = [];
    turn = 0;

    let sqrs = document.querySelectorAll(".square");
    for (let i = 0; i < 200; i++) {
      sqrs[i].style.backgroundColor = "";
      sqrs[i].classList = "square";
    }

    let BPsqrs = document.querySelectorAll(".BPsquare");
    for (let i = 0; i < 100; i++) {
      BPsqrs[i].classList = "BPsquare";
      BPsqrs[i].style.backgroundColor = "";
    }

    let names = document.querySelectorAll(".name");
    for (let i = 0; i < 2; i++) names[i].textContent = "Loading...";

    document.querySelector(".compBoard .ships").textContent = "Ships: 5";
    document.querySelector(".compBoard .sunk").textContent = "Sunk: 0";
    document.querySelector(".playerBoard .ships").textContent = "Ships: 5";
    document.querySelector(".playerBoard .sunk").textContent = "Sunk: 0";

    endScreenToggle();
    BPScreenToggle(false);
    resetActiveBoard();
    setup();
  };

  let loadActionListeners = () => {
    // Adds event listener to the squares in the comp board for the hit from the player.
    let squares = document.querySelectorAll(".compBoard .square");
    squares.forEach(function (sqr) {
      sqr.addEventListener("click", (e) => {
        let block = Array.prototype.indexOf.call(squares, e.target);

        if (compHit.indexOf(block) == -1 && turn == 0) {
          // Check for same block hit and semphaore allowance.
          let check = AI.receiveAttack(block);
          compHit.push(block);

          if (check) {
            // Checks if hit is successfull, then wait for another hit from player
            markBlock(block, 2, true);
            updateScore();
          } else {
            // Otherwise ask AI to make the move.
            markBlock(block, 2);
            AITurn();
          }

          boardActiveToggle();
        }
      });
    });

    let BPOK = document.querySelector(".BPOK");
    BPOK.addEventListener("click", () => {
      if (startSignal) BPScreenToggle();
    });

    let theme = document.querySelector(".theme-button");
    theme.onclick = themeToggle;

    let replay = document.querySelector(".replay");
    replay.onclick = reset;
  };

  let themeToggle = () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme"))
      document.querySelector(".theme-button").textContent = "Day";
    else document.querySelector(".theme-button").textContent = "Night";
  };

  // Toggle Functions for various screens.
  let BPScreenToggle = (blur = true) => {
    topBarToggle();
    if (blur) blurToggle();
    document.querySelector(".BPScreen").classList.toggle("hide");
  };

  let topBarToggle = () =>
    document.querySelector("header").classList.toggle("header-active");

  let blurToggle = () =>
    document.querySelector(".blur").classList.toggle("hide");

  let endScreenToggle = (msg = "") => {
    document.querySelector(".end-screen").classList.toggle("end-active");
    endMsg(msg);
  };

  let endMsg = (msg) => {
    document.querySelector(".ESMsg").textContent = msg;
  };

  // Changes opacity of board as per turn.
  let boardActiveToggle = () => {
    let player = ".playerBoard";
    let comp = ".compBoard";

    document.querySelector(player).classList.toggle("inactive-board");
    document.querySelector(comp).classList.toggle("inactive-board");
  };

  // Used when game restarts.
  let resetActiveBoard = () => {
    let player = ".playerBoard";
    let comp = ".compBoard";
    if (document.querySelector(comp).classList.contains("inactive-board"))
      document.querySelector(comp).classList.toggle("inactive-board");

    document.querySelector(player).classList.remove("inactive-board");
  };

  // Checks if the size number of blocks from ith position has any already selected blocks, if so then return false, as to not highlight.
  let checkValidSquare = (i, iter, size) => {
    for (let j = i; j < i + size; j++)
      if (iter[j].style.backgroundColor == "rgb(170, 170, 255)") return false;

    return true;
  };

  // Utility function used when some block is attack.
  // hit signifies a success of the hit.
  let markBlock = (block, player, hit = false) => {
    let board;
    if (player == 1) board = "playerBoard";
    else board = "compBoard";

    let squares = document.querySelectorAll(`.${board} .square`);

    if (hit) {
      squares[block].style.backgroundColor = "red";
    } else {
      squares[block].style.backgroundColor = "black";
    }
  };

  return {
    begin,
  };
})();

export default Gameplay;
