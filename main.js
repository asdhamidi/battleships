/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/constructors/gameboard.js":
      /*!***************************************!*\
  !*** ./src/constructors/gameboard.js ***!
  \***************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./ship */ "./src/constructors/ship.js");

        function Gameboard(sBlocks) {
          let ships = [];
          let blocks = [];
          let hitBlocks = [];
          let sunkShips = 0;

          let setup = () => {
            for (let i in sBlocks) {
              let blks = sBlocks[i];
              let ship = (0, _ship__WEBPACK_IMPORTED_MODULE_0__["default"])(
                blks
              );
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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          Gameboard;

        /***/
      },

    /***/ "./src/constructors/player.js":
      /*!************************************!*\
  !*** ./src/constructors/player.js ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./gameboard */ "./src/constructors/gameboard.js"
          );

        function Player(name, ships) {
          let gameboard = (0,
          _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(ships);

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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Player;

        /***/
      },

    /***/ "./src/constructors/playerAI.js":
      /*!**************************************!*\
  !*** ./src/constructors/playerAI.js ***!
  \**************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./player */ "./src/constructors/player.js");
        /* harmony import */ var _constructors_ship__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../constructors/ship */ "./src/constructors/ship.js"
          );
        /* harmony import */ var _constructors_gameboard__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../constructors/gameboard */ "./src/constructors/gameboard.js"
          );

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
              } // Picks a valid starting point for current size of ship.

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
          let genericPlayer = (0,
          _player__WEBPACK_IMPORTED_MODULE_0__["default"])(name, ships);

          genericPlayer.attack = () => Math.floor(Math.random() * (99 - 0)); // Overriding the attack function.

          return genericPlayer;
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          playerAI;

        /***/
      },

    /***/ "./src/constructors/ship.js":
      /*!**********************************!*\
  !*** ./src/constructors/ship.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Ship;

        /***/
      },

    /***/ "./src/loader.js":
      /*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./style.css */ "./src/style.css");

        let UI = (() => {
          let load = () => {
            addStructures();
            addHeader();
            addBody();
            addBlockPlacer();
            addBlurScreen();
            addEndScreen();
          };

          let addStructures = () => {
            let header = document.createElement("header");
            let main = document.createElement("main");
            let footer = document.createElement("footer");
            let body = document.querySelector("body");
            body.appendChild(header);
            body.appendChild(main);
            body.appendChild(footer);
          };

          let addHeader = () => {
            let header = document.createElement("div");
            header.className = "title";
            header.textContent = "BATTLESHIPS!";
            let themes = document.createElement("button");
            themes.className = "theme-button";
            themes.textContent = "Night";
            let headerDiv = document.querySelector("header");
            headerDiv.appendChild(header);
            headerDiv.appendChild(themes);
          };

          let addBody = () => {
            let boards = document.createElement("div");
            boards.className = "boards";
            let b1 = createBoard("playerBoard");
            let b2 = createBoard("compBoard");
            boards.appendChild(b1);
            boards.appendChild(b2);
            document.querySelector("main").appendChild(boards);
          };

          let createBoard = (boardName) => {
            let board = document.createElement("div");
            board.className = boardName;
            let name = document.createElement("div");
            name.className = "name";
            name.textContent = "Loading...";
            let squares = document.createElement("div");
            squares.className = "squares";

            for (let i = 0; i < 100; i++) {
              let sqr = document.createElement("div");
              sqr.className = "square";
              squares.appendChild(sqr);
            }

            let score = document.createElement("div");
            score.className = "score";
            let ships = document.createElement("div");
            ships.className = "ships";
            ships.textContent = "Ships: 5";
            let sunk = document.createElement("div");
            sunk.className = "sunk";
            sunk.textContent = "Sunk: 0";
            score.appendChild(ships);
            score.appendChild(sunk);
            board.appendChild(name);
            board.appendChild(squares);
            board.appendChild(score);
            return board;
          };

          let addBlockPlacer = () => {
            let title = document.createElement("div");
            title.className = "BPTitle";
            title.textContent = "Place Your Ships";
            let adder = document.createElement("div");
            adder.className = "BPAdder";
            let squares = document.createElement("div");
            squares.className = "BPsquares";
            let nameInput = document.createElement("INPUT");
            nameInput.setAttribute("type", "text");
            nameInput.className = "BPName";

            for (let i = 0; i < 100; i++) {
              let sqr = document.createElement("div");
              sqr.className = "BPsquare";
              squares.appendChild(sqr);
            }

            let okbtn = document.createElement("button");
            okbtn.className = "BPOK";
            okbtn.textContent = "Let's Begin!";
            let bpl = document.createElement("div");
            bpl.className = "BPScreen";
            adder.appendChild(squares);
            adder.appendChild(okbtn);
            bpl.appendChild(title);
            bpl.appendChild(adder);
            document.querySelector("main").appendChild(bpl);
          };

          let addBlurScreen = () => {
            let blur = document.createElement("div");
            blur.className = "blur";
            document.querySelector("body").appendChild(blur);
          };

          let addEndScreen = () => {
            let end = document.createElement("div");
            end.className = "end-screen";
            let msg = document.createElement("div");
            msg.className = "ESMsg";
            let replay = document.createElement("button");
            replay.className = "replay";
            replay.textContent = "Replay";
            end.appendChild(msg);
            end.appendChild(replay);
            document.querySelector("main").appendChild(end);
          };

          return {
            load,
          };
        })();

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = UI;

        /***/
      },

    /***/ "./src/play.js":
      /*!*********************!*\
  !*** ./src/play.js ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./loader */ "./src/loader.js");
        /* harmony import */ var _constructors_playerAI__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./constructors/playerAI */ "./src/constructors/playerAI.js"
          );
        /* harmony import */ var _constructors_player__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./constructors/player */ "./src/constructors/player.js"
          );
        /* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ./style.css */ "./src/style.css");

        let Gameplay = (() => {
          // Players
          let AI = (0,
          _constructors_playerAI__WEBPACK_IMPORTED_MODULE_1__["default"])();
          let player = null; // Game Variables

          let startSignal = false; // Signals the completion of block placing phase.
          // Arrays to store the attacked blocks;

          let playerHit = [];
          let compHit = []; // 0 = Player's turn, 1 = Comp's turn : Basially the Semaphore technique used in the critical section problem.

          let turn = 0; // Loads the UI and starts off the game.

          let begin = () => {
            _loader__WEBPACK_IMPORTED_MODULE_0__["default"].load();
            loadActionListeners();
            setup();
          }; // Function for the block placer menu (BPMenu).

          let setup = () => {
            let size = 5;
            let playerShips = []; // Adding eventListeners to the squares in BPMenu, which will work as per the size of the current ship.

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
                      player = (0,
                      _constructors_player__WEBPACK_IMPORTED_MODULE_2__[
                        "default"
                      ])("You", playerShips);
                      startSignal = true;
                      setupBoard();
                    }
                  }
                }
              });
            });
          }; // Places the ships, name, and score onto the player's board.

          let setupBoard = () => {
            let playerBlocks = player.getBlocks();
            let gameBlocks = document.querySelectorAll(".playerBoard .square");

            for (let i = 0; i < playerBlocks.length; i++) {
              let block = playerBlocks[i];
              gameBlocks[block].style.backgroundColor = "#AAF";
            }

            document.querySelector(".playerBoard .name").textContent =
              player.getName();
            document.querySelector(".compBoard .name").textContent =
              AI.getName();
            document
              .querySelector(".playerBoard")
              .classList.toggle("inactive-board");
          }; // Gets the AI's choice, checks againts the blocks.
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
          }; // Checks if the block has been hit before, if so, gets another choice from AI.

          let getAIMove = () => {
            let block = AI.attack();

            while (playerHit.indexOf(block) != -1) block = AI.attack();

            return block;
          };

          let winCheck = () => {
            if (AI.allSunk()) endGame(1);
            else if (player.allSunk()) endGame(2);
            boardActiveToggle();
          }; // Shows End screen with message.

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
          }; // Utility Functions
          // Resets all boards, info, players, and gamevariables.

          let reset = () => {
            AI = (0,
            _constructors_playerAI__WEBPACK_IMPORTED_MODULE_1__["default"])();
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

            document.querySelector(".compBoard .ships").textContent =
              "Ships: 5";
            document.querySelector(".compBoard .sunk").textContent = "Sunk: 0";
            document.querySelector(".playerBoard .ships").textContent =
              "Ships: 5";
            document.querySelector(".playerBoard .sunk").textContent =
              "Sunk: 0";
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
          }; // Toggle Functions for various screens.

          let BPScreenToggle = function () {
            let blur =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : true;
            topBarToggle();
            if (blur) blurToggle();
            document.querySelector(".BPScreen").classList.toggle("hide");
          };

          let topBarToggle = () =>
            document.querySelector("header").classList.toggle("header-active");

          let blurToggle = () =>
            document.querySelector(".blur").classList.toggle("hide");

          let endScreenToggle = function () {
            let msg =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "";
            document
              .querySelector(".end-screen")
              .classList.toggle("end-active");
            endMsg(msg);
          };

          let endMsg = (msg) => {
            document.querySelector(".ESMsg").textContent = msg;
          }; // Changes opacity of board as per turn.

          let boardActiveToggle = () => {
            let player = ".playerBoard";
            let comp = ".compBoard";
            document.querySelector(player).classList.toggle("inactive-board");
            document.querySelector(comp).classList.toggle("inactive-board");
          }; // Used when game restarts.

          let resetActiveBoard = () => {
            let player = ".playerBoard";
            let comp = ".compBoard";
            if (
              document.querySelector(comp).classList.contains("inactive-board")
            )
              document.querySelector(comp).classList.toggle("inactive-board");
            document.querySelector(player).classList.remove("inactive-board");
          }; // Checks if the size number of blocks from ith position has any already selected blocks, if so then return false, as to not highlight.

          let checkValidSquare = (i, iter, size) => {
            for (let j = i; j < i + size; j++)
              if (iter[j].style.backgroundColor == "rgb(170, 170, 255)")
                return false;

            return true;
          }; // Utility function used when some block is attack.
          // hit signifies a success of the hit.

          let markBlock = function (block, player) {
            let hit =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : false;
            let board;
            if (player == 1) board = "playerBoard";
            else board = "compBoard";
            let squares = document.querySelectorAll(
              ".".concat(board, " .square")
            );

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

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          Gameplay;

        /***/
      },

    /***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
      /*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
      /***/ (module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js"
          );
        /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js"
          );
        /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__
          );
        // Imports

        var ___CSS_LOADER_EXPORT___ =
          _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
            _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()
          );
        // Module
        ___CSS_LOADER_EXPORT___.push([
          module.id,
          '* {\n  --header-bg-color: #eee;\n  --button-bg-color: #bbb;\n  --bg-color: #eef;\n  --border-color: #000;\n  --shadow: grey;\n  --text: #000;\n}\n\nbody.dark-theme * {\n  --header-bg-color: #121212;\n  --bg-color: #252525;\n  --border-color: #fff;\n  --shadow: #111;\n  --text: #fff;\n}\n\nbody {\n  margin: 0;\n  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",\n    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: monospace;\n  font-size: 3rem;\n  max-height: 5rem;\n  width: 100%;\n  background-color: var(--header-bg-color);\n  color: #f55;\n  padding: 0.5rem;\n  border-bottom: 1px solid #66f;\n  transition: all ease-in-out 500ms;\n  text-shadow: 0.025em 0.025em 0 yellow, 0.05em 0.05em 0 blue,\n    0.075em 0.075em 0 red, 0.1em 0.1em 0 black;\n  letter-spacing: 0.01rem;\n  transform: translateY(-0.5rem);\n  opacity: 0;\n  transition: all ease-in-out 400ms;\n}\n\n.title {\n  width: 100%;\n  text-align: center;\n}\n\n.header-active {\n  opacity: 1;\n  transform: translateY(0);\n}\nheader:hover {\n  border-color: #f66;\n  letter-spacing: 0.25rem;\n}\n\n.theme-button {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  right: 1rem;\n  border-radius: 0.5rem;\n  height: auto;\n  width: auto;\n  padding: 0.25rem;\n  font-size: 1rem;\n  font-weight: bold;\n  background-color: var(--button-bg-color);\n  border: none;\n  z-index: 6;\n}\n\n\n.theme-button:hover {\n  background-color: #aaa;\n}\n\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all ease-in-out 400ms;\n  width: 100%;\n  flex: 1;\n}\n\nbody.dark-theme main {\n  background-color: var(--bg-color);\n  color: white;\n}\n\n.boards {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n\n.playerBoard,\n.compBoard {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 0 2rem;\n  gap: 1rem;\n}\n\n.name {\n  font-size: 1.5rem;\n  font-weight: bold;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;\n}\n\n.playerBoard {\n  border-right: 3px solid gray;\n}\n\n.inactive-board {\n  opacity: 0.66;\n}\n\n.squares {\n  display: grid;\n  grid-template-columns: repeat(10, 2rem);\n  grid-template-rows: repeat(10, 2rem);\n  gap: 0.25rem;\n}\n\n.square {\n  height: 2rem;\n  width: 2rem;\n  border: 1px solid var(--border-color);\n}\n\n.compBoard .square:hover {\n  background: #ddf;\n}\n\n.score {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.ships {\n  border-right: 1px solid var(--border-color);\n  padding: 0 1rem;\n}\n\n.BPScreen {\n  width: auto;\n  height: auto;\n  background-color: var(--bg-color);\n  color: var(--text);\n  position: fixed;\n  z-index: 3;\n  gap: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  flex-direction: column;\n  border-radius: 1rem;\n  border: 1px solid var(--border-color);\n  box-shadow: 0.25rem 0.25rem 0.25rem #666;\n  transition: all ease-in-out 400ms;\n}\n\n.BPAdder {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.BPTitle {\n  font-weight: bold;\n}\n\n.BPsquares {\n  display: grid;\n  grid-template-columns: repeat(10, 2rem);\n  grid-template-rows: repeat(10, 2rem);\n  gap: 0.2rem;\n}\n\n.BPsquare {\n  height: 2rem;\n  width: 2rem;\n  border: 1px solid var(--border-color);\n}\n\n.BPOK, .replay {\n  border: none;\n  background-color: greenyellow;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  border: 1px solid transparent;\n  transition: all ease-in-out 200ms;\n  font-weight: bold;\n}\n\n.BPOK:hover, .replay:hover {\n  box-shadow: 0 0 0.25rem gray;\n  border-color: gray;\n}\n\n.sqr-hover {\n  background-color: #aaa;\n}\n\n.hide {\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-1rem);\n}\n\n.blur {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  backdrop-filter: blur(5px);\n  z-index: 2;\n  transition: all ease-in-out 400ms;\n}\n\n.end-screen {\n  z-index: 5;\n  position: absolute;\n  width: 30rem;\n  height: 10rem;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  display: flex;\n  background-color: var(--bg-color);\n  border: 1px solid;\n  border-radius: 1rem;\n  box-shadow: 0.25rem 0.25rem 0.25rem var(--shadow);\n  visibility: hidden;\n  opacity: 0;\n  transform: translateY(-1rem);\n  transition: all ease-in-out 400ms;\n  color: var(--text);\n}\n\n.end-active {\n  opacity: 1;\n  transform: translateY(0);\n  visibility: visible;\n}\n\n.ESMsg {\n  font-size: 2rem;\n}\n\n',
          "",
          {
            version: 3,
            sources: ["webpack://./src/style.css"],
            names: [],
            mappings:
              "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",
            sourcesContent: [
              '* {\n  --header-bg-color: #eee;\n  --button-bg-color: #bbb;\n  --bg-color: #eef;\n  --border-color: #000;\n  --shadow: grey;\n  --text: #000;\n}\n\nbody.dark-theme * {\n  --header-bg-color: #121212;\n  --bg-color: #252525;\n  --border-color: #fff;\n  --shadow: #111;\n  --text: #fff;\n}\n\nbody {\n  margin: 0;\n  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",\n    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: monospace;\n  font-size: 3rem;\n  max-height: 5rem;\n  width: 100%;\n  background-color: var(--header-bg-color);\n  color: #f55;\n  padding: 0.5rem;\n  border-bottom: 1px solid #66f;\n  transition: all ease-in-out 500ms;\n  text-shadow: 0.025em 0.025em 0 yellow, 0.05em 0.05em 0 blue,\n    0.075em 0.075em 0 red, 0.1em 0.1em 0 black;\n  letter-spacing: 0.01rem;\n  transform: translateY(-0.5rem);\n  opacity: 0;\n  transition: all ease-in-out 400ms;\n}\n\n.title {\n  width: 100%;\n  text-align: center;\n}\n\n.header-active {\n  opacity: 1;\n  transform: translateY(0);\n}\nheader:hover {\n  border-color: #f66;\n  letter-spacing: 0.25rem;\n}\n\n.theme-button {\n  position: fixed;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  right: 1rem;\n  border-radius: 0.5rem;\n  height: auto;\n  width: auto;\n  padding: 0.25rem;\n  font-size: 1rem;\n  font-weight: bold;\n  background-color: var(--button-bg-color);\n  border: none;\n  z-index: 6;\n}\n\n\n.theme-button:hover {\n  background-color: #aaa;\n}\n\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all ease-in-out 400ms;\n  width: 100%;\n  flex: 1;\n}\n\nbody.dark-theme main {\n  background-color: var(--bg-color);\n  color: white;\n}\n\n.boards {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n\n.playerBoard,\n.compBoard {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 0 2rem;\n  gap: 1rem;\n}\n\n.name {\n  font-size: 1.5rem;\n  font-weight: bold;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,\n    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;\n}\n\n.playerBoard {\n  border-right: 3px solid gray;\n}\n\n.inactive-board {\n  opacity: 0.66;\n}\n\n.squares {\n  display: grid;\n  grid-template-columns: repeat(10, 2rem);\n  grid-template-rows: repeat(10, 2rem);\n  gap: 0.25rem;\n}\n\n.square {\n  height: 2rem;\n  width: 2rem;\n  border: 1px solid var(--border-color);\n}\n\n.compBoard .square:hover {\n  background: #ddf;\n}\n\n.score {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n\n.ships {\n  border-right: 1px solid var(--border-color);\n  padding: 0 1rem;\n}\n\n.BPScreen {\n  width: auto;\n  height: auto;\n  background-color: var(--bg-color);\n  color: var(--text);\n  position: fixed;\n  z-index: 3;\n  gap: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  flex-direction: column;\n  border-radius: 1rem;\n  border: 1px solid var(--border-color);\n  box-shadow: 0.25rem 0.25rem 0.25rem #666;\n  transition: all ease-in-out 400ms;\n}\n\n.BPAdder {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.BPTitle {\n  font-weight: bold;\n}\n\n.BPsquares {\n  display: grid;\n  grid-template-columns: repeat(10, 2rem);\n  grid-template-rows: repeat(10, 2rem);\n  gap: 0.2rem;\n}\n\n.BPsquare {\n  height: 2rem;\n  width: 2rem;\n  border: 1px solid var(--border-color);\n}\n\n.BPOK, .replay {\n  border: none;\n  background-color: greenyellow;\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  border: 1px solid transparent;\n  transition: all ease-in-out 200ms;\n  font-weight: bold;\n}\n\n.BPOK:hover, .replay:hover {\n  box-shadow: 0 0 0.25rem gray;\n  border-color: gray;\n}\n\n.sqr-hover {\n  background-color: #aaa;\n}\n\n.hide {\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-1rem);\n}\n\n.blur {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  backdrop-filter: blur(5px);\n  z-index: 2;\n  transition: all ease-in-out 400ms;\n}\n\n.end-screen {\n  z-index: 5;\n  position: absolute;\n  width: 30rem;\n  height: 10rem;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  display: flex;\n  background-color: var(--bg-color);\n  border: 1px solid;\n  border-radius: 1rem;\n  box-shadow: 0.25rem 0.25rem 0.25rem var(--shadow);\n  visibility: hidden;\n  opacity: 0;\n  transform: translateY(-1rem);\n  transition: all ease-in-out 400ms;\n  color: var(--text);\n}\n\n.end-active {\n  opacity: 1;\n  transform: translateY(0);\n  visibility: visible;\n}\n\n.ESMsg {\n  font-size: 2rem;\n}\n\n',
            ],
            sourceRoot: "",
          },
        ]);
        // Exports
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          ___CSS_LOADER_EXPORT___;

        /***/
      },

    /***/ "./node_modules/css-loader/dist/runtime/api.js":
      /*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
      /***/ (module) => {
        /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
        module.exports = function (cssWithMappingToString) {
          var list = []; // return the list of modules as css string

          list.toString = function toString() {
            return this.map(function (item) {
              var content = "";
              var needLayer = typeof item[5] !== "undefined";

              if (item[4]) {
                content += "@supports (".concat(item[4], ") {");
              }

              if (item[2]) {
                content += "@media ".concat(item[2], " {");
              }

              if (needLayer) {
                content += "@layer".concat(
                  item[5].length > 0 ? " ".concat(item[5]) : "",
                  " {"
                );
              }

              content += cssWithMappingToString(item);

              if (needLayer) {
                content += "}";
              }

              if (item[2]) {
                content += "}";
              }

              if (item[4]) {
                content += "}";
              }

              return content;
            }).join("");
          }; // import a list of modules into the list

          list.i = function i(modules, media, dedupe, supports, layer) {
            if (typeof modules === "string") {
              modules = [[null, modules, undefined]];
            }

            var alreadyImportedModules = {};

            if (dedupe) {
              for (var k = 0; k < this.length; k++) {
                var id = this[k][0];

                if (id != null) {
                  alreadyImportedModules[id] = true;
                }
              }
            }

            for (var _k = 0; _k < modules.length; _k++) {
              var item = [].concat(modules[_k]);

              if (dedupe && alreadyImportedModules[item[0]]) {
                continue;
              }

              if (typeof layer !== "undefined") {
                if (typeof item[5] === "undefined") {
                  item[5] = layer;
                } else {
                  item[1] = "@layer"
                    .concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {")
                    .concat(item[1], "}");
                  item[5] = layer;
                }
              }

              if (media) {
                if (!item[2]) {
                  item[2] = media;
                } else {
                  item[1] = "@media "
                    .concat(item[2], " {")
                    .concat(item[1], "}");
                  item[2] = media;
                }
              }

              if (supports) {
                if (!item[4]) {
                  item[4] = "".concat(supports);
                } else {
                  item[1] = "@supports ("
                    .concat(item[4], ") {")
                    .concat(item[1], "}");
                  item[4] = supports;
                }
              }

              list.push(item);
            }
          };

          return list;
        };

        /***/
      },

    /***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
      /*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
      /***/ (module) => {
        module.exports = function (item) {
          var content = item[1];
          var cssMapping = item[3];

          if (!cssMapping) {
            return content;
          }

          if (typeof btoa === "function") {
            var base64 = btoa(
              unescape(encodeURIComponent(JSON.stringify(cssMapping)))
            );
            var data =
              "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                base64
              );
            var sourceMapping = "/*# ".concat(data, " */");
            var sourceURLs = cssMapping.sources.map(function (source) {
              return "/*# sourceURL="
                .concat(cssMapping.sourceRoot || "")
                .concat(source, " */");
            });
            return [content]
              .concat(sourceURLs)
              .concat([sourceMapping])
              .join("\n");
          }

          return [content].join("\n");
        };

        /***/
      },

    /***/ "./src/style.css":
      /*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js"
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js"
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js"
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js"
          );
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__
          );
        /* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css"
          );

        var options = {};

        options.styleTagTransform =
          _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default();
        options.setAttributes =
          _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default();

        options.insert =
          _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(
            null,
            "head"
          );

        options.domAPI =
          _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default();
        options.insertStyleElement =
          _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();

        var update =
          _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
            _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[
              "default"
            ],
            options
          );

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[
            "default"
          ] &&
          _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[
            "default"
          ].locals
            ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[
                "default"
              ].locals
            : undefined;

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
      /*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
      /***/ (module) => {
        var stylesInDOM = [];

        function getIndexByIdentifier(identifier) {
          var result = -1;

          for (var i = 0; i < stylesInDOM.length; i++) {
            if (stylesInDOM[i].identifier === identifier) {
              result = i;
              break;
            }
          }

          return result;
        }

        function modulesToDom(list, options) {
          var idCountMap = {};
          var identifiers = [];

          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = options.base ? item[0] + options.base : item[0];
            var count = idCountMap[id] || 0;
            var identifier = "".concat(id, " ").concat(count);
            idCountMap[id] = count + 1;
            var indexByIdentifier = getIndexByIdentifier(identifier);
            var obj = {
              css: item[1],
              media: item[2],
              sourceMap: item[3],
              supports: item[4],
              layer: item[5],
            };

            if (indexByIdentifier !== -1) {
              stylesInDOM[indexByIdentifier].references++;
              stylesInDOM[indexByIdentifier].updater(obj);
            } else {
              var updater = addElementStyle(obj, options);
              options.byIndex = i;
              stylesInDOM.splice(i, 0, {
                identifier: identifier,
                updater: updater,
                references: 1,
              });
            }

            identifiers.push(identifier);
          }

          return identifiers;
        }

        function addElementStyle(obj, options) {
          var api = options.domAPI(options);
          api.update(obj);

          var updater = function updater(newObj) {
            if (newObj) {
              if (
                newObj.css === obj.css &&
                newObj.media === obj.media &&
                newObj.sourceMap === obj.sourceMap &&
                newObj.supports === obj.supports &&
                newObj.layer === obj.layer
              ) {
                return;
              }

              api.update((obj = newObj));
            } else {
              api.remove();
            }
          };

          return updater;
        }

        module.exports = function (list, options) {
          options = options || {};
          list = list || [];
          var lastIdentifiers = modulesToDom(list, options);
          return function update(newList) {
            newList = newList || [];

            for (var i = 0; i < lastIdentifiers.length; i++) {
              var identifier = lastIdentifiers[i];
              var index = getIndexByIdentifier(identifier);
              stylesInDOM[index].references--;
            }

            var newLastIdentifiers = modulesToDom(newList, options);

            for (var _i = 0; _i < lastIdentifiers.length; _i++) {
              var _identifier = lastIdentifiers[_i];

              var _index = getIndexByIdentifier(_identifier);

              if (stylesInDOM[_index].references === 0) {
                stylesInDOM[_index].updater();

                stylesInDOM.splice(_index, 1);
              }
            }

            lastIdentifiers = newLastIdentifiers;
          };
        };

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
      /*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
      /***/ (module) => {
        var memo = {};
        /* istanbul ignore next  */

        function getTarget(target) {
          if (typeof memo[target] === "undefined") {
            var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

            if (
              window.HTMLIFrameElement &&
              styleTarget instanceof window.HTMLIFrameElement
            ) {
              try {
                // This will throw an exception if access to iframe is blocked
                // due to cross-origin restrictions
                styleTarget = styleTarget.contentDocument.head;
              } catch (e) {
                // istanbul ignore next
                styleTarget = null;
              }
            }

            memo[target] = styleTarget;
          }

          return memo[target];
        }
        /* istanbul ignore next  */

        function insertBySelector(insert, style) {
          var target = getTarget(insert);

          if (!target) {
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          }

          target.appendChild(style);
        }

        module.exports = insertBySelector;

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
      /*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
      /***/ (module) => {
        /* istanbul ignore next  */
        function insertStyleElement(options) {
          var element = document.createElement("style");
          options.setAttributes(element, options.attributes);
          options.insert(element, options.options);
          return element;
        }

        module.exports = insertStyleElement;

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
      /*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        /* istanbul ignore next  */
        function setAttributesWithoutAttributes(styleElement) {
          var nonce = true ? __webpack_require__.nc : 0;

          if (nonce) {
            styleElement.setAttribute("nonce", nonce);
          }
        }

        module.exports = setAttributesWithoutAttributes;

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
      /*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
      /***/ (module) => {
        /* istanbul ignore next  */
        function apply(styleElement, options, obj) {
          var css = "";

          if (obj.supports) {
            css += "@supports (".concat(obj.supports, ") {");
          }

          if (obj.media) {
            css += "@media ".concat(obj.media, " {");
          }

          var needLayer = typeof obj.layer !== "undefined";

          if (needLayer) {
            css += "@layer".concat(
              obj.layer.length > 0 ? " ".concat(obj.layer) : "",
              " {"
            );
          }

          css += obj.css;

          if (needLayer) {
            css += "}";
          }

          if (obj.media) {
            css += "}";
          }

          if (obj.supports) {
            css += "}";
          }

          var sourceMap = obj.sourceMap;

          if (sourceMap && typeof btoa !== "undefined") {
            css +=
              "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))),
                " */"
              );
          } // For old IE

          /* istanbul ignore if  */

          options.styleTagTransform(css, styleElement, options.options);
        }

        function removeStyleElement(styleElement) {
          // istanbul ignore if
          if (styleElement.parentNode === null) {
            return false;
          }

          styleElement.parentNode.removeChild(styleElement);
        }
        /* istanbul ignore next  */

        function domAPI(options) {
          var styleElement = options.insertStyleElement(options);
          return {
            update: function update(obj) {
              apply(styleElement, options, obj);
            },
            remove: function remove() {
              removeStyleElement(styleElement);
            },
          };
        }

        module.exports = domAPI;

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
      /***/ (module) => {
        /* istanbul ignore next  */
        function styleTagTransform(css, styleElement) {
          if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
          } else {
            while (styleElement.firstChild) {
              styleElement.removeChild(styleElement.firstChild);
            }

            styleElement.appendChild(document.createTextNode(css));
          }
        }

        module.exports = styleTagTransform;

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/nonce */
  /******/ (() => {
    /******/ __webpack_require__.nc = undefined;
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _play__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(/*! ./play */ "./src/play.js");

    _play__WEBPACK_IMPORTED_MODULE_0__["default"].begin();
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLGFBQWEsTUFBTSxPQUFPLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxh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QzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFFQUEsbURBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29uc3RydWN0b3JzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbnN0cnVjdG9ycy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb25zdHJ1Y3RvcnMvcGxheWVyQUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb25zdHJ1Y3RvcnMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xvYWRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuZnVuY3Rpb24gR2FtZWJvYXJkKHNCbG9ja3MpIHtcbiAgbGV0IHNoaXBzID0gW107XG4gIGxldCBibG9ja3MgPSBbXTtcbiAgbGV0IGhpdEJsb2NrcyA9IFtdO1xuICBsZXQgc3Vua1NoaXBzID0gMDtcblxuICBsZXQgc2V0dXAgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSBpbiBzQmxvY2tzKSB7XG4gICAgICBsZXQgYmxrcyA9IHNCbG9ja3NbaV07XG4gICAgICBsZXQgc2hpcCA9IFNoaXAoYmxrcyk7XG4gICAgICBzaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgICBmb3IgKGxldCBiIGluIGJsa3MpIHtcbiAgICAgICAgbGV0IGJsayA9IGJsa3NbYl07XG4gICAgICAgIGJsb2Nrcy5wdXNoKGJsayk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGxldCByZWNlaXZlQXR0YWNrID0gKGJsb2NrKSA9PiB7XG4gICAgaGl0QmxvY2tzLnB1c2goYmxvY2spO1xuICAgIGlmIChibG9ja3MuaW5kZXhPZihibG9jaykgIT0gLTEpIHtcbiAgICAgIGZvciAobGV0IGkgaW4gc2hpcHMpIHtcbiAgICAgICAgbGV0IHNoaXAgPSBzaGlwc1tpXTtcbiAgICAgICAgbGV0IHNoaXBCbG9ja3MgPSBzaGlwLmdldEJsb2NrcygpO1xuICAgICAgICBpZiAoc2hpcEJsb2Nrcy5pbmRleE9mKGJsb2NrKSAhPSAtMSkge1xuICAgICAgICAgIHNoaXAuaGl0KGJsb2NrKTtcbiAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkgc3Vua1NoaXBzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBsZXQgZ2V0U3Vua1NoaXBzID0gKCkgPT4gc3Vua1NoaXBzO1xuICBsZXQgYWxsU3VuayA9ICgpID0+IGdldFN1bmtTaGlwcygpID09IHNoaXBzLmxlbmd0aDtcbiAgbGV0IGdldEJsb2NrcyA9ICgpID0+IGJsb2NrcztcblxuICBzZXR1cCgpO1xuXG4gIHJldHVybiB7XG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTdW5rU2hpcHMsXG4gICAgYWxsU3VuayxcbiAgICBnZXRCbG9ja3MsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lLCBzaGlwcykge1xuICBsZXQgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKHNoaXBzKTtcbiAgbGV0IHJlY2VpdmVBdHRhY2sgPSAoYmxvY2spID0+IGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGJsb2NrKTtcbiAgbGV0IGF0dGFjayA9IChibG9jaywgZW5lbXkpID0+IHtcbiAgICBlbmVteS5yZWNlaXZlQXR0YWNrKGJsb2NrKTtcbiAgfTtcbiAgbGV0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICBsZXQgZ2V0U3Vua1NoaXBzID0gKCkgPT4gZ2FtZWJvYXJkLmdldFN1bmtTaGlwcygpO1xuICBsZXQgZ2V0QmxvY2tzID0gKCkgPT4gZ2FtZWJvYXJkLmdldEJsb2NrcygpO1xuICBsZXQgYWxsU3VuayA9ICgpID0+IGdhbWVib2FyZC5hbGxTdW5rKCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGF0dGFjayxcbiAgICBnZXROYW1lLFxuICAgIGdldFN1bmtTaGlwcyxcbiAgICBhbGxTdW5rLFxuICAgIGdldEJsb2NrcyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuLi9jb25zdHJ1Y3RvcnMvc2hpcFwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi4vY29uc3RydWN0b3JzL2dhbWVib2FyZFwiO1xuXG5mdW5jdGlvbiBwbGF5ZXJBSSgpIHtcbiAgbGV0IG1ha2VTaGlwcyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHMgPSBbXTtcbiAgICBsZXQgcm93cyA9IFtdO1xuICAgIGxldCByO1xuXG4gICAgZm9yIChsZXQgaSA9IDU7IGkgPiAwOyBpLS0pIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIC8vIFBpY2tzIGFuIHVuc2VsZWN0ZWQgcm93LlxuICAgICAgICByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDkgLSAwKSk7XG4gICAgICAgIGlmIChyb3dzLmluZGV4T2YocikgPT0gLTEpIHtcbiAgICAgICAgICByb3dzLnB1c2gocik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gUGlja3MgYSB2YWxpZCBzdGFydGluZyBwb2ludCBmb3IgY3VycmVudCBzaXplIG9mIHNoaXAuXG4gICAgICBsZXQgc3RhcnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBpIC0gMCkpO1xuICAgICAgbGV0IGJsb2NrcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IHN0YXJ0OyBqIDwgaStzdGFydDsgaisrKSBibG9ja3MucHVzaChqICsgKDEwICogcikpO1xuICAgICAgXG4gICAgICBzaGlwcy5wdXNoKGJsb2Nrcyk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBsZXQgbmFtZXMgPSBbXCJNZWdhIE1pbmRcIiwgXCJNci4gQmlnIEJyYWluXCIsIFwiSVE0MjBcIiwgXCJTbWFydHkgUGFudHMgYW5kIFNoaXJ0c1wiXSAvLyBWZXJ5IGNsZXZlciBuYW1lIGZvciBjb21wLlxuICBsZXQgbmFtZSA9IG5hbWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg0IC0gMCkpXTtcbiAgbGV0IHNoaXBzID0gbWFrZVNoaXBzKCk7XG5cbiAgbGV0IGdlbmVyaWNQbGF5ZXIgPSBQbGF5ZXIobmFtZSwgc2hpcHMpO1xuICBnZW5lcmljUGxheWVyLmF0dGFjayA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5OSAtIDApKTsgLy8gT3ZlcnJpZGluZyB0aGUgYXR0YWNrIGZ1bmN0aW9uLlxuXG4gICAgXG4gIHJldHVybiBnZW5lcmljUGxheWVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXJBSTtcbiIsImZ1bmN0aW9uIFNoaXAoYmxvY2tzKSB7XG4gIGxldCBoaXRCbG9ja3MgPSBbXTtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBsZXQgaXNTdW5rID0gKCkgPT4gc3VuaztcbiAgbGV0IGhpdCA9IChibG9jaykgPT4ge1xuICAgIGhpdEJsb2Nrcy5wdXNoKGJsb2NrKTtcblxuICAgIGlmIChoaXRCbG9ja3MubGVuZ3RoID09IGJsb2Nrcy5sZW5ndGgpIHN1bmsgPSB0cnVlO1xuICB9O1xuICBsZXQgZ2V0QmxvY2tzID0gKCkgPT4gYmxvY2tzO1xuXG4gIHJldHVybiB7XG4gICAgaXNTdW5rLFxuICAgIGhpdCxcbiAgICBnZXRCbG9ja3MsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuXG5sZXQgVUkgPSAoKCkgPT4ge1xuICBsZXQgbG9hZCA9ICgpID0+IHtcbiAgICBhZGRTdHJ1Y3R1cmVzKCk7XG4gICAgYWRkSGVhZGVyKCk7XG4gICAgYWRkQm9keSgpO1xuICAgIGFkZEJsb2NrUGxhY2VyKCk7XG4gICAgYWRkQmx1clNjcmVlbigpO1xuICAgIGFkZEVuZFNjcmVlbigpO1xuICB9O1xuXG4gIGxldCBhZGRTdHJ1Y3R1cmVzID0gKCkgPT4ge1xuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGxldCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gICAgbGV0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gICAgbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcbiAgfVxuXG4gIGxldCBhZGRIZWFkZXIgPSAoKSA9PiB7XG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaGVhZGVyLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBTIVwiO1xuXG4gICAgbGV0IHRoZW1lcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhlbWVzLmNsYXNzTmFtZSA9IFwidGhlbWUtYnV0dG9uXCI7XG4gICAgdGhlbWVzLnRleHRDb250ZW50ID0gXCJOaWdodFwiO1xuXG4gICAgbGV0IGhlYWRlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIilcbiAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQodGhlbWVzKTtcbiAgfTtcblxuICBsZXQgYWRkQm9keSA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZHMuY2xhc3NOYW1lID0gXCJib2FyZHNcIjtcblxuICAgIGxldCBiMSA9IGNyZWF0ZUJvYXJkKFwicGxheWVyQm9hcmRcIik7XG4gICAgbGV0IGIyID0gY3JlYXRlQm9hcmQoXCJjb21wQm9hcmRcIik7XG5cbiAgICBib2FyZHMuYXBwZW5kQ2hpbGQoYjEpO1xuICAgIGJvYXJkcy5hcHBlbmRDaGlsZChiMik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKS5hcHBlbmRDaGlsZChib2FyZHMpO1xuICB9O1xuXG4gIGxldCBjcmVhdGVCb2FyZCA9IChib2FyZE5hbWUpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJvYXJkLmNsYXNzTmFtZSA9IGJvYXJkTmFtZTtcblxuICAgIGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuYW1lLmNsYXNzTmFtZSA9IFwibmFtZVwiO1xuICAgIG5hbWUudGV4dENvbnRlbnQgPSBcIkxvYWRpbmcuLi5cIlxuXG4gICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNxdWFyZXMuY2xhc3NOYW1lID0gXCJzcXVhcmVzXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBsZXQgc3FyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxci5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xuXG4gICAgICBzcXVhcmVzLmFwcGVuZENoaWxkKHNxcik7XG4gICAgfVxuXG4gICAgbGV0IHNjb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzY29yZS5jbGFzc05hbWUgPSBcInNjb3JlXCI7XG5cbiAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXBzLmNsYXNzTmFtZSA9IFwic2hpcHNcIjtcbiAgICBzaGlwcy50ZXh0Q29udGVudCA9IFwiU2hpcHM6IDVcIjtcbiAgICBsZXQgc3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3Vuay5jbGFzc05hbWUgPSBcInN1bmtcIjtcbiAgICBzdW5rLnRleHRDb250ZW50ID1cIlN1bms6IDBcIlxuXG4gICAgc2NvcmUuYXBwZW5kQ2hpbGQoc2hpcHMpO1xuICAgIHNjb3JlLmFwcGVuZENoaWxkKHN1bmspO1xuXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoc3F1YXJlcyk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoc2NvcmUpO1xuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGxldCBhZGRCbG9ja1BsYWNlciA9ICgpID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwiQlBUaXRsZVwiO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQbGFjZSBZb3VyIFNoaXBzXCI7XG5cbiAgICBsZXQgYWRkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZGVyLmNsYXNzTmFtZSA9XCJCUEFkZGVyXCI7XG4gICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNxdWFyZXMuY2xhc3NOYW1lID0gXCJCUHNxdWFyZXNcIjtcblxuICAgIGxldCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU5QVVRcIik7XG4gICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIG5hbWVJbnB1dC5jbGFzc05hbWUgPSBcIkJQTmFtZVwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgbGV0IHNxciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcXIuY2xhc3NOYW1lID0gXCJCUHNxdWFyZVwiO1xuXG4gICAgICBzcXVhcmVzLmFwcGVuZENoaWxkKHNxcik7XG4gICAgfVxuXG4gICAgbGV0IG9rYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBva2J0bi5jbGFzc05hbWUgPSBcIkJQT0tcIjtcbiAgICBva2J0bi50ZXh0Q29udGVudCA9IFwiTGV0J3MgQmVnaW4hXCI7XG5cbiAgICBsZXQgYnBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBicGwuY2xhc3NOYW1lID0gXCJCUFNjcmVlblwiO1xuXG4gICAgYWRkZXIuYXBwZW5kQ2hpbGQoc3F1YXJlcyk7XG4gICAgYWRkZXIuYXBwZW5kQ2hpbGQob2tidG4pO1xuICAgIGJwbC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgYnBsLmFwcGVuZENoaWxkKGFkZGVyKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIikuYXBwZW5kQ2hpbGQoYnBsKTtcbiAgfTtcblxuICBsZXQgYWRkQmx1clNjcmVlbiA9ICgpID0+IHtcbiAgICBsZXQgYmx1ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYmx1ci5jbGFzc05hbWUgPSBcImJsdXJcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hcHBlbmRDaGlsZChibHVyKTtcbiAgfTtcblxuICBsZXQgYWRkRW5kU2NyZWVuID0gKCkgPT4ge1xuICAgIGxldCBlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVuZC5jbGFzc05hbWUgPSBcImVuZC1zY3JlZW5cIjtcblxuICAgIGxldCBtc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1zZy5jbGFzc05hbWUgPSBcIkVTTXNnXCI7XG5cbiAgICBsZXQgcmVwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByZXBsYXkuY2xhc3NOYW1lID0gXCJyZXBsYXlcIjtcbiAgICByZXBsYXkudGV4dENvbnRlbnQgPSBcIlJlcGxheVwiO1xuXG4gICAgZW5kLmFwcGVuZENoaWxkKG1zZyk7XG4gICAgZW5kLmFwcGVuZENoaWxkKHJlcGxheSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKS5hcHBlbmRDaGlsZChlbmQpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbG9hZFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCJpbXBvcnQgVUkgZnJvbSBcIi4vbG9hZGVyXCI7XG5pbXBvcnQgcGxheWVyQUkgZnJvbSBcIi4vY29uc3RydWN0b3JzL3BsYXllckFJXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2NvbnN0cnVjdG9ycy9wbGF5ZXJcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5cbmxldCBHYW1lcGxheSA9ICgoKSA9PiB7XG4gIC8vIFBsYXllcnNcbiAgbGV0IEFJID0gcGxheWVyQUkoKTtcbiAgbGV0IHBsYXllciA9IG51bGw7XG5cbiAgLy8gR2FtZSBWYXJpYWJsZXNcbiAgbGV0IHN0YXJ0U2lnbmFsID0gZmFsc2U7IC8vIFNpZ25hbHMgdGhlIGNvbXBsZXRpb24gb2YgYmxvY2sgcGxhY2luZyBwaGFzZS5cblxuICAvLyBBcnJheXMgdG8gc3RvcmUgdGhlIGF0dGFja2VkIGJsb2NrcztcbiAgbGV0IHBsYXllckhpdCA9IFtdO1xuICBsZXQgY29tcEhpdCA9IFtdO1xuXG4gIC8vIDAgPSBQbGF5ZXIncyB0dXJuLCAxID0gQ29tcCdzIHR1cm4gOiBCYXNpYWxseSB0aGUgU2VtYXBob3JlIHRlY2huaXF1ZSB1c2VkIGluIHRoZSBjcml0aWNhbCBzZWN0aW9uIHByb2JsZW0uXG4gIGxldCB0dXJuID0gMDsgXG5cbiAgLy8gTG9hZHMgdGhlIFVJIGFuZCBzdGFydHMgb2ZmIHRoZSBnYW1lLlxuICBsZXQgYmVnaW4gPSAoKSA9PiB7XG4gICAgVUkubG9hZCgpO1xuICAgIGxvYWRBY3Rpb25MaXN0ZW5lcnMoKTtcbiAgICBzZXR1cCgpO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIGZvciB0aGUgYmxvY2sgcGxhY2VyIG1lbnUgKEJQTWVudSkuXG4gIGxldCBzZXR1cCA9ICgpID0+IHtcbiAgICBsZXQgc2l6ZSA9IDU7XG4gICAgbGV0IHBsYXllclNoaXBzID0gW107XG5cbiAgICAvLyBBZGRpbmcgZXZlbnRMaXN0ZW5lcnMgdG8gdGhlIHNxdWFyZXMgaW4gQlBNZW51LCB3aGljaCB3aWxsIHdvcmsgYXMgcGVyIHRoZSBzaXplIG9mIHRoZSBjdXJyZW50IHNoaXAuXG4gICAgbGV0IGJwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQlBzcXVhcmVcIik7XG4gICAgYnBzLmZvckVhY2goKHNxcikgPT4ge1xuICAgICAgc3FyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGxldCBpID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChicHMsIGUudGFyZ2V0KTtcblxuICAgICAgICBsZXQgbGltaXQgPSBNYXRoLmZsb29yKGkgLyAxMCkgKiAxMCArIDEwO1xuXG4gICAgICAgIGlmIChjaGVja1ZhbGlkU3F1YXJlKGksIGJwcywgc2l6ZSkgJiYgaSArIHNpemUgLSAxIDwgbGltaXQpIHsgLy8gU2FmZXR5IENoZWNrc1xuICAgICAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIHNpemU7IGorKykge1xuICAgICAgICAgICAgYnBzW2pdLmNsYXNzTGlzdC5hZGQoXCJzcXItaG92ZXJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgc3FyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGxldCBpID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChicHMsIGUudGFyZ2V0KTtcblxuICAgICAgICBsZXQgbGltaXQgPSBNYXRoLmZsb29yKGkgLyAxMCkgKiAxMCArIDEwO1xuXG4gICAgICAgIGlmIChpICsgc2l6ZSAtIDEgPCBsaW1pdCkge1xuICAgICAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIHNpemU7IGorKykgeyAvLyBTYWZldHkgQ2hlY2tzXG4gICAgICAgICAgICBicHNbal0uY2xhc3NMaXN0LnJlbW92ZShcInNxci1ob3ZlclwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzcXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICghc3RhcnRTaWduYWwpIHsgLy8gU2FmZXR5IENoZWNrc1xuICAgICAgICAgIGxldCBpID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChicHMsIGUudGFyZ2V0KTtcbiAgICAgICAgICBsZXQgbGltaXQgPSBNYXRoLmZsb29yKGkgLyAxMCkgKiAxMCArIDEwO1xuXG4gICAgICAgICAgbGV0IHNoaXAgPSBbXTtcbiAgICAgICAgICBpZiAoY2hlY2tWYWxpZFNxdWFyZShpLCBicHMsIHNpemUpICYmIGkgKyBzaXplIC0gMSA8IGxpbWl0KSB7IC8vIFNhZmV0eSBDaGVja3NcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIHNpemU7IGorKykge1xuICAgICAgICAgICAgICBicHNbal0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjQUFGXCI7XG4gICAgICAgICAgICAgIHNoaXAucHVzaChqKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2l6ZS0tO1xuICAgICAgICAgICAgcGxheWVyU2hpcHMucHVzaChzaGlwKTtcblxuICAgICAgICAgICAgaWYgKHNpemUgPT0gMCkgeyAvLyBTaXplID09IDAgc2lnbmlmaWVzIHRoZSBwbGFjZW1lbnRzIG9mIGFsbCBzaGlwcywgdG8gbW92ZSB0byB0aGUgZ2FtZXBsYXkgcGhhc2UuXG4gICAgICAgICAgICAgIHBsYXllciA9IFBsYXllcihcIllvdVwiLCBwbGF5ZXJTaGlwcyk7XG4gICAgICAgICAgICAgIHN0YXJ0U2lnbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2V0dXBCb2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUGxhY2VzIHRoZSBzaGlwcywgbmFtZSwgYW5kIHNjb3JlIG9udG8gdGhlIHBsYXllcidzIGJvYXJkLlxuICBsZXQgc2V0dXBCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgcGxheWVyQmxvY2tzID0gcGxheWVyLmdldEJsb2NrcygpO1xuICAgIGxldCBnYW1lQmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5ZXJCb2FyZCAuc3F1YXJlXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyQmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmxvY2sgPSBwbGF5ZXJCbG9ja3NbaV07XG4gICAgICBnYW1lQmxvY2tzW2Jsb2NrXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNBQUZcIjtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkIC5uYW1lXCIpLnRleHRDb250ZW50ID0gcGxheWVyLmdldE5hbWUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBCb2FyZCAubmFtZVwiKS50ZXh0Q29udGVudCA9IEFJLmdldE5hbWUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJpbmFjdGl2ZS1ib2FyZFwiKTtcbiAgfTtcblxuICAvLyBHZXRzIHRoZSBBSSdzIGNob2ljZSwgY2hlY2tzIGFnYWludHMgdGhlIGJsb2Nrcy5cbiAgLy8gUmVwZWF0cyBpZiB0aGVyZSdzIGEgc3VjY2Vzc2Z1bCBoaXQuXG4gIGxldCBBSVR1cm4gPSAoKSA9PiB7XG4gICAgdHVybisrO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGV0IGJsb2NrID0gZ2V0QUlNb3ZlKCk7XG4gICAgICBwbGF5ZXJIaXQucHVzaChibG9jayk7XG5cbiAgICAgIGxldCBjaGVjayA9IHBsYXllci5yZWNlaXZlQXR0YWNrKGJsb2NrKTtcblxuICAgICAgd2hpbGUgKGNoZWNrKSB7XG4gICAgICAgIG1hcmtCbG9jayhibG9jaywgMSwgdHJ1ZSk7XG4gICAgICAgIGJsb2NrID0gZ2V0QUlNb3ZlKCk7XG4gICAgICAgIGNoZWNrID0gcGxheWVyLnJlY2VpdmVBdHRhY2soYmxvY2spO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNoZWNrKSB7XG4gICAgICAgIG1hcmtCbG9jayhibG9jaywgMSk7XG4gICAgICB9XG5cbiAgICAgIHR1cm4tLTtcbiAgICAgIHVwZGF0ZVNjb3JlKCk7XG4gICAgfSwgMTUwMCk7XG4gIH07XG5cbiAgLy8gQ2hlY2tzIGlmIHRoZSBibG9jayBoYXMgYmVlbiBoaXQgYmVmb3JlLCBpZiBzbywgZ2V0cyBhbm90aGVyIGNob2ljZSBmcm9tIEFJLlxuICBsZXQgZ2V0QUlNb3ZlID0gKCkgPT4ge1xuICAgIGxldCBibG9jayA9IEFJLmF0dGFjaygpO1xuICAgIHdoaWxlIChwbGF5ZXJIaXQuaW5kZXhPZihibG9jaykgIT0gLTEpIGJsb2NrID0gQUkuYXR0YWNrKCk7XG5cbiAgICByZXR1cm4gYmxvY2s7XG4gIH07XG5cbiAgbGV0IHdpbkNoZWNrID0gKCkgPT4ge1xuICAgIGlmIChBSS5hbGxTdW5rKCkpIGVuZEdhbWUoMSk7XG4gICAgZWxzZSBpZiAocGxheWVyLmFsbFN1bmsoKSkgZW5kR2FtZSgyKTtcblxuICAgIGJvYXJkQWN0aXZlVG9nZ2xlKCk7XG4gIH07XG5cbiAgLy8gU2hvd3MgRW5kIHNjcmVlbiB3aXRoIG1lc3NhZ2UuXG4gIGxldCBlbmRHYW1lID0gKHdpbm5lcikgPT4ge1xuICAgIGJsdXJUb2dnbGUoKTtcblxuICAgIFxuICAgIGlmICh3aW5uZXIgPT0gMSkgZW5kU2NyZWVuVG9nZ2xlKFwiWW91IHdvbiFcIik7XG4gICAgZWxzZSBlbmRTY3JlZW5Ub2dnbGUoQUkuZ2V0TmFtZSgpICsgXCIgd29uIVwiKVxuICB9O1xuXG4gIGxldCB1cGRhdGVTY29yZSA9ICgpID0+IHtcbiAgICBsZXQgY3VycmVudENTaGlwcyA9IEFJLmdldFN1bmtTaGlwcygpO1xuICAgIGxldCBjU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBCb2FyZCAuc2hpcHNcIik7XG4gICAgY1NoaXBzLnRleHRDb250ZW50ID0gXCJTaGlwczogXCIgKyAoNSAtIGN1cnJlbnRDU2hpcHMpO1xuICAgIGxldCBjU3VuayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcEJvYXJkIC5zdW5rXCIpO1xuICAgIGNTdW5rLnRleHRDb250ZW50ID0gXCJTdW5rOiBcIiArIGN1cnJlbnRDU2hpcHM7XG5cbiAgICBsZXQgY3VycmVudFBTaGlwcyA9IHBsYXllci5nZXRTdW5rU2hpcHMoKTtcbiAgICBsZXQgcFNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZCAuc2hpcHNcIik7XG4gICAgcFNoaXBzLnRleHRDb250ZW50ID0gXCJTaGlwczogXCIgKyAoNSAtIGN1cnJlbnRQU2hpcHMpO1xuICAgIGxldCBwU3VuayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmQgLnN1bmtcIik7XG4gICAgcFN1bmsudGV4dENvbnRlbnQgPSBcIlN1bms6IFwiICsgY3VycmVudFBTaGlwcztcblxuICAgIHdpbkNoZWNrKCk7XG4gIH07XG5cbiAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcblxuICAvLyBSZXNldHMgYWxsIGJvYXJkcywgaW5mbywgcGxheWVycywgYW5kIGdhbWV2YXJpYWJsZXMuXG4gIGxldCByZXNldCA9ICgpID0+IHtcbiAgICBBSSA9IHBsYXllckFJKCk7XG4gICAgcGxheWVyID0gbnVsbDtcbiAgICBzdGFydFNpZ25hbCA9IGZhbHNlO1xuICAgIGNvbXBIaXQgPSBbXTtcbiAgICBwbGF5ZXJIaXQgPSBbXTtcbiAgICB0dXJuID0gMDtcblxuICAgIGxldCBzcXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDA7IGkrKykgXG4gICAge1xuICAgICAgc3Fyc1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgICAgc3Fyc1tpXS5jbGFzc0xpc3QgPSBcInNxdWFyZVwiO1xuICAgIH1cblxuICAgIGxldCBCUHNxcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLkJQc3F1YXJlXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIEJQc3Fyc1tpXS5jbGFzc0xpc3QgPSBcIkJQc3F1YXJlXCI7XG4gICAgICBCUHNxcnNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIjtcbiAgICB9XG5cbiAgICBsZXQgbmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hbWVcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIG5hbWVzW2ldLnRleHRDb250ZW50ID0gXCJMb2FkaW5nLi4uXCI7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBCb2FyZCAuc2hpcHNcIikudGV4dENvbnRlbnQgPSBcIlNoaXBzOiA1XCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wQm9hcmQgLnN1bmtcIikudGV4dENvbnRlbnQgPSBcIlN1bms6IDBcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkIC5zaGlwc1wiKS50ZXh0Q29udGVudCA9IFwiU2hpcHM6IDVcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkIC5zdW5rXCIpLnRleHRDb250ZW50ID0gXCJTdW5rOiAwXCI7XG5cbiAgICBlbmRTY3JlZW5Ub2dnbGUoKTtcbiAgICBCUFNjcmVlblRvZ2dsZShmYWxzZSk7XG4gICAgcmVzZXRBY3RpdmVCb2FyZCgpO1xuICAgIHNldHVwKCk7XG4gIH07XG5cbiAgbGV0IGxvYWRBY3Rpb25MaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgLy8gQWRkcyBldmVudCBsaXN0ZW5lciB0byB0aGUgc3F1YXJlcyBpbiB0aGUgY29tcCBib2FyZCBmb3IgdGhlIGhpdCBmcm9tIHRoZSBwbGF5ZXIuXG4gICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXBCb2FyZCAuc3F1YXJlXCIpO1xuICAgIHNxdWFyZXMuZm9yRWFjaChmdW5jdGlvbiAoc3FyKSB7XG4gICAgICBzcXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGxldCBibG9jayA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoc3F1YXJlcywgZS50YXJnZXQpO1xuXG4gICAgICAgIGlmIChjb21wSGl0LmluZGV4T2YoYmxvY2spID09IC0xICYmIHR1cm4gPT0gMCkgeyAvLyBDaGVjayBmb3Igc2FtZSBibG9jayBoaXQgYW5kIHNlbXBoYW9yZSBhbGxvd2FuY2UuXG4gICAgICAgICAgbGV0IGNoZWNrID0gQUkucmVjZWl2ZUF0dGFjayhibG9jayk7XG4gICAgICAgICAgY29tcEhpdC5wdXNoKGJsb2NrKTtcblxuICAgICAgICAgIGlmIChjaGVjaykgeyAvLyBDaGVja3MgaWYgaGl0IGlzIHN1Y2Nlc3NmdWxsLCB0aGVuIHdhaXQgZm9yIGFub3RoZXIgaGl0IGZyb20gcGxheWVyXG4gICAgICAgICAgICBtYXJrQmxvY2soYmxvY2ssIDIsIHRydWUpO1xuICAgICAgICAgICAgdXBkYXRlU2NvcmUoKTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBPdGhlcndpc2UgYXNrIEFJIHRvIG1ha2UgdGhlIG1vdmUuXG4gICAgICAgICAgICBtYXJrQmxvY2soYmxvY2ssIDIpO1xuICAgICAgICAgICAgQUlUdXJuKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYm9hcmRBY3RpdmVUb2dnbGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgQlBPSyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuQlBPS1wiKTtcbiAgICBCUE9LLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoc3RhcnRTaWduYWwpIEJQU2NyZWVuVG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgdGhlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRoZW1lLWJ1dHRvblwiKTtcbiAgICB0aGVtZS5vbmNsaWNrID0gdGhlbWVUb2dnbGU7XG5cbiAgICBsZXQgcmVwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXBsYXlcIik7XG4gICAgcmVwbGF5Lm9uY2xpY2sgPSByZXNldDtcbiAgfTtcblxuICBsZXQgdGhlbWVUb2dnbGUgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGFyay10aGVtZVwiKTtcblxuICAgIGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhcImRhcmstdGhlbWVcIikpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRoZW1lLWJ1dHRvblwiKS50ZXh0Q29udGVudCA9IFwiRGF5XCI7XG4gICAgZWxzZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRoZW1lLWJ1dHRvblwiKS50ZXh0Q29udGVudCA9IFwiTmlnaHRcIjtcbiAgfTtcblxuICAvLyBUb2dnbGUgRnVuY3Rpb25zIGZvciB2YXJpb3VzIHNjcmVlbnMuXG4gIGxldCBCUFNjcmVlblRvZ2dsZSA9IChibHVyID0gdHJ1ZSkgPT4ge1xuICAgIHRvcEJhclRvZ2dsZSgpO1xuICAgIGlmKGJsdXIpIGJsdXJUb2dnbGUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkJQU2NyZWVuXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICB9O1xuXG4gIGxldCB0b3BCYXJUb2dnbGUgPSAoKSA9PlxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIikuY2xhc3NMaXN0LnRvZ2dsZShcImhlYWRlci1hY3RpdmVcIik7XG5cbiAgbGV0IGJsdXJUb2dnbGUgPSAoKSA9PlxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmx1clwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblxuICBsZXQgZW5kU2NyZWVuVG9nZ2xlID0gKG1zZyA9IFwiXCIpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1zY3JlZW5cIikuY2xhc3NMaXN0LnRvZ2dsZShcImVuZC1hY3RpdmVcIik7XG4gICAgZW5kTXNnKG1zZyk7XG4gIH07XG5cbiAgbGV0IGVuZE1zZyA9IChtc2cpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkVTTXNnXCIpLnRleHRDb250ZW50ID0gbXNnO1xuICB9O1xuIFxuICAvLyBDaGFuZ2VzIG9wYWNpdHkgb2YgYm9hcmQgYXMgcGVyIHR1cm4uXG4gIGxldCBib2FyZEFjdGl2ZVRvZ2dsZSA9ICgpID0+IHtcbiAgICBsZXQgcGxheWVyID0gXCIucGxheWVyQm9hcmRcIjtcbiAgICBsZXQgY29tcCA9IFwiLmNvbXBCb2FyZFwiO1xuICAgIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGxheWVyKS5jbGFzc0xpc3QudG9nZ2xlKFwiaW5hY3RpdmUtYm9hcmRcIik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb21wKS5jbGFzc0xpc3QudG9nZ2xlKFwiaW5hY3RpdmUtYm9hcmRcIik7XG4gIH07XG4gIFxuICAvLyBVc2VkIHdoZW4gZ2FtZSByZXN0YXJ0cy5cbiAgbGV0IHJlc2V0QWN0aXZlQm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IHBsYXllciA9IFwiLnBsYXllckJvYXJkXCI7XG4gICAgbGV0IGNvbXAgPSBcIi5jb21wQm9hcmRcIjtcbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbXApLmNsYXNzTGlzdC5jb250YWlucyhcImluYWN0aXZlLWJvYXJkXCIpKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29tcCkuY2xhc3NMaXN0LnRvZ2dsZShcImluYWN0aXZlLWJvYXJkXCIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwbGF5ZXIpLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmFjdGl2ZS1ib2FyZFwiKTtcbiAgfTtcblxuICAvLyBDaGVja3MgaWYgdGhlIHNpemUgbnVtYmVyIG9mIGJsb2NrcyBmcm9tIGl0aCBwb3NpdGlvbiBoYXMgYW55IGFscmVhZHkgc2VsZWN0ZWQgYmxvY2tzLCBpZiBzbyB0aGVuIHJldHVybiBmYWxzZSwgYXMgdG8gbm90IGhpZ2hsaWdodC5cbiAgbGV0IGNoZWNrVmFsaWRTcXVhcmUgPSAoaSwgaXRlciwgc2l6ZSkgPT4ge1xuICAgIGZvciAobGV0IGogPSBpOyBqIDwgaSArIHNpemU7IGorKylcbiAgICAgIGlmIChpdGVyW2pdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9PSBcInJnYigxNzAsIDE3MCwgMjU1KVwiKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IGZ1bmN0aW9uIHVzZWQgd2hlbiBzb21lIGJsb2NrIGlzIGF0dGFjay5cbiAgLy8gaGl0IHNpZ25pZmllcyBhIHN1Y2Nlc3Mgb2YgdGhlIGhpdC5cbiAgbGV0IG1hcmtCbG9jayA9IChibG9jaywgcGxheWVyLCBoaXQgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBib2FyZDtcbiAgICBpZiAocGxheWVyID09IDEpIGJvYXJkID0gXCJwbGF5ZXJCb2FyZFwiO1xuICAgIGVsc2UgYm9hcmQgPSBcImNvbXBCb2FyZFwiO1xuXG4gICAgbGV0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtib2FyZH0gLnNxdWFyZWApO1xuXG4gICAgaWYgKGhpdCkge1xuICAgICAgc3F1YXJlc1tibG9ja10uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3F1YXJlc1tibG9ja10uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJibGFja1wiO1xuICAgIH1cbiAgfTtcbiAgXG4gIHJldHVybiB7XG4gICAgYmVnaW4sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lcGxheTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICAtLWhlYWRlci1iZy1jb2xvcjogI2VlZTtcXG4gIC0tYnV0dG9uLWJnLWNvbG9yOiAjYmJiO1xcbiAgLS1iZy1jb2xvcjogI2VlZjtcXG4gIC0tYm9yZGVyLWNvbG9yOiAjMDAwO1xcbiAgLS1zaGFkb3c6IGdyZXk7XFxuICAtLXRleHQ6ICMwMDA7XFxufVxcblxcbmJvZHkuZGFyay10aGVtZSAqIHtcXG4gIC0taGVhZGVyLWJnLWNvbG9yOiAjMTIxMjEyO1xcbiAgLS1iZy1jb2xvcjogIzI1MjUyNTtcXG4gIC0tYm9yZGVyLWNvbG9yOiAjZmZmO1xcbiAgLS1zaGFkb3c6ICMxMTE7XFxuICAtLXRleHQ6ICNmZmY7XFxufVxcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJMdWNpZGEgU2Fuc1xcXCIsIFxcXCJMdWNpZGEgU2FucyBSZWd1bGFyXFxcIiwgXFxcIkx1Y2lkYSBHcmFuZGVcXFwiLFxcbiAgICBcXFwiTHVjaWRhIFNhbnMgVW5pY29kZVxcXCIsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIG1heC1oZWlnaHQ6IDVyZW07XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1iZy1jb2xvcik7XFxuICBjb2xvcjogI2Y1NTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNjZmO1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDUwMG1zO1xcbiAgdGV4dC1zaGFkb3c6IDAuMDI1ZW0gMC4wMjVlbSAwIHllbGxvdywgMC4wNWVtIDAuMDVlbSAwIGJsdWUsXFxuICAgIDAuMDc1ZW0gMC4wNzVlbSAwIHJlZCwgMC4xZW0gMC4xZW0gMCBibGFjaztcXG4gIGxldHRlci1zcGFjaW5nOiAwLjAxcmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjVyZW0pO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCA0MDBtcztcXG59XFxuXFxuLnRpdGxlIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uaGVhZGVyLWFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbn1cXG5oZWFkZXI6aG92ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjZjY2O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMjVyZW07XFxufVxcblxcbi50aGVtZS1idXR0b24ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHJpZ2h0OiAxcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgd2lkdGg6IGF1dG87XFxuICBwYWRkaW5nOiAwLjI1cmVtO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b24tYmctY29sb3IpO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgei1pbmRleDogNjtcXG59XFxuXFxuXFxuLnRoZW1lLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhO1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgNDAwbXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIGZsZXg6IDE7XFxufVxcblxcbmJvZHkuZGFyay10aGVtZSBtYWluIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNvbG9yKTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmJvYXJkcyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4ucGxheWVyQm9hcmQsXFxuLmNvbXBCb2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDAgMnJlbTtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLm5hbWUge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgUm9ib3RvLFxcbiAgICBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCBcXFwiT3BlbiBTYW5zXFxcIiwgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjtcXG59XFxuXFxuLnBsYXllckJvYXJkIHtcXG4gIGJvcmRlci1yaWdodDogM3B4IHNvbGlkIGdyYXk7XFxufVxcblxcbi5pbmFjdGl2ZS1ib2FyZCB7XFxuICBvcGFjaXR5OiAwLjY2O1xcbn1cXG5cXG4uc3F1YXJlcyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDJyZW0pO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDJyZW0pO1xcbiAgZ2FwOiAwLjI1cmVtO1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gIGhlaWdodDogMnJlbTtcXG4gIHdpZHRoOiAycmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG59XFxuXFxuLmNvbXBCb2FyZCAuc3F1YXJlOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6ICNkZGY7XFxufVxcblxcbi5zY29yZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxcmVtO1xcbn1cXG5cXG4uc2hpcHMge1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG4gIHBhZGRpbmc6IDAgMXJlbTtcXG59XFxuXFxuLkJQU2NyZWVuIHtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3IpO1xcbiAgY29sb3I6IHZhcigtLXRleHQpO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMztcXG4gIGdhcDogMXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAxcmVtO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcbiAgYm94LXNoYWRvdzogMC4yNXJlbSAwLjI1cmVtIDAuMjVyZW0gIzY2NjtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCA0MDBtcztcXG59XFxuXFxuLkJQQWRkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAxcmVtO1xcbn1cXG5cXG4uQlBUaXRsZSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLkJQc3F1YXJlcyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDJyZW0pO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDJyZW0pO1xcbiAgZ2FwOiAwLjJyZW07XFxufVxcblxcbi5CUHNxdWFyZSB7XFxuICBoZWlnaHQ6IDJyZW07XFxuICB3aWR0aDogMnJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxufVxcblxcbi5CUE9LLCAucmVwbGF5IHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVueWVsbG93O1xcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgMjAwbXM7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLkJQT0s6aG92ZXIsIC5yZXBsYXk6aG92ZXIge1xcbiAgYm94LXNoYWRvdzogMCAwIDAuMjVyZW0gZ3JheTtcXG4gIGJvcmRlci1jb2xvcjogZ3JheTtcXG59XFxuXFxuLnNxci1ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWFhO1xcbn1cXG5cXG4uaGlkZSB7XFxuICBvcGFjaXR5OiAwO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcmVtKTtcXG59XFxuXFxuLmJsdXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHRvcDogMDtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig1cHgpO1xcbiAgei1pbmRleDogMjtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCA0MDBtcztcXG59XFxuXFxuLmVuZC1zY3JlZW4ge1xcbiAgei1pbmRleDogNTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAzMHJlbTtcXG4gIGhlaWdodDogMTByZW07XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNvbG9yKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG4gIGJveC1zaGFkb3c6IDAuMjVyZW0gMC4yNXJlbSAwLjI1cmVtIHZhcigtLXNoYWRvdyk7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcmVtKTtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCA0MDBtcztcXG4gIGNvbG9yOiB2YXIoLS10ZXh0KTtcXG59XFxuXFxuLmVuZC1hY3RpdmUge1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5FU01zZyB7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx1QkFBdUI7RUFDdkIsdUJBQXVC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LGlDQUFpQztFQUNqQyxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLGFBQWE7RUFDYixNQUFNO0VBQ04sMEJBQTBCO0VBQzFCLFVBQVU7RUFDVixpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLGlDQUFpQztFQUNqQyxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLGlEQUFpRDtFQUNqRCxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLDRCQUE0QjtFQUM1QixpQ0FBaUM7RUFDakMsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLHdCQUF3QjtFQUN4QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgLS1oZWFkZXItYmctY29sb3I6ICNlZWU7XFxuICAtLWJ1dHRvbi1iZy1jb2xvcjogI2JiYjtcXG4gIC0tYmctY29sb3I6ICNlZWY7XFxuICAtLWJvcmRlci1jb2xvcjogIzAwMDtcXG4gIC0tc2hhZG93OiBncmV5O1xcbiAgLS10ZXh0OiAjMDAwO1xcbn1cXG5cXG5ib2R5LmRhcmstdGhlbWUgKiB7XFxuICAtLWhlYWRlci1iZy1jb2xvcjogIzEyMTIxMjtcXG4gIC0tYmctY29sb3I6ICMyNTI1MjU7XFxuICAtLWJvcmRlci1jb2xvcjogI2ZmZjtcXG4gIC0tc2hhZG93OiAjMTExO1xcbiAgLS10ZXh0OiAjZmZmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTHVjaWRhIFNhbnNcXFwiLCBcXFwiTHVjaWRhIFNhbnMgUmVndWxhclxcXCIsIFxcXCJMdWNpZGEgR3JhbmRlXFxcIixcXG4gICAgXFxcIkx1Y2lkYSBTYW5zIFVuaWNvZGVcXFwiLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBtYXgtaGVpZ2h0OiA1cmVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oZWFkZXItYmctY29sb3IpO1xcbiAgY29sb3I6ICNmNTU7XFxuICBwYWRkaW5nOiAwLjVyZW07XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzY2ZjtcXG4gIHRyYW5zaXRpb246IGFsbCBlYXNlLWluLW91dCA1MDBtcztcXG4gIHRleHQtc2hhZG93OiAwLjAyNWVtIDAuMDI1ZW0gMCB5ZWxsb3csIDAuMDVlbSAwLjA1ZW0gMCBibHVlLFxcbiAgICAwLjA3NWVtIDAuMDc1ZW0gMCByZWQsIDAuMWVtIDAuMWVtIDAgYmxhY2s7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wMXJlbTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC41cmVtKTtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgNDAwbXM7XFxufVxcblxcbi50aXRsZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmhlYWRlci1hY3RpdmUge1xcbiAgb3BhY2l0eTogMTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG59XFxuaGVhZGVyOmhvdmVyIHtcXG4gIGJvcmRlci1jb2xvcjogI2Y2NjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI1cmVtO1xcbn1cXG5cXG4udGhlbWUtYnV0dG9uIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICByaWdodDogMXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIGhlaWdodDogYXV0bztcXG4gIHdpZHRoOiBhdXRvO1xcbiAgcGFkZGluZzogMC4yNXJlbTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnV0dG9uLWJnLWNvbG9yKTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHotaW5kZXg6IDY7XFxufVxcblxcblxcbi50aGVtZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDQwMG1zO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG5ib2R5LmRhcmstdGhlbWUgbWFpbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1jb2xvcik7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5ib2FyZHMge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuLnBsYXllckJvYXJkLFxcbi5jb21wQm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAwIDJyZW07XFxuICBnYXA6IDFyZW07XFxufVxcblxcbi5uYW1lIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LWZhbWlseTogc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIFJvYm90byxcXG4gICAgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgXFxcIk9wZW4gU2Fuc1xcXCIsIFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbi5wbGF5ZXJCb2FyZCB7XFxuICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCBncmF5O1xcbn1cXG5cXG4uaW5hY3RpdmUtYm9hcmQge1xcbiAgb3BhY2l0eTogMC42NjtcXG59XFxuXFxuLnNxdWFyZXMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAycmVtKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAycmVtKTtcXG4gIGdhcDogMC4yNXJlbTtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBoZWlnaHQ6IDJyZW07XFxuICB3aWR0aDogMnJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxufVxcblxcbi5jb21wQm9hcmQgLnNxdWFyZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiAjZGRmO1xcbn1cXG5cXG4uc2NvcmUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLnNoaXBzIHtcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XFxuICBwYWRkaW5nOiAwIDFyZW07XFxufVxcblxcbi5CUFNjcmVlbiB7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogYXV0bztcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNvbG9yKTtcXG4gIGNvbG9yOiB2YXIoLS10ZXh0KTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDM7XFxuICBnYXA6IDFyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcXG4gIGJveC1zaGFkb3c6IDAuMjVyZW0gMC4yNXJlbSAwLjI1cmVtICM2NjY7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgNDAwbXM7XFxufVxcblxcbi5CUEFkZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMXJlbTtcXG59XFxuXFxuLkJQVGl0bGUge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5CUHNxdWFyZXMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAycmVtKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAycmVtKTtcXG4gIGdhcDogMC4ycmVtO1xcbn1cXG5cXG4uQlBzcXVhcmUge1xcbiAgaGVpZ2h0OiAycmVtO1xcbiAgd2lkdGg6IDJyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xcbn1cXG5cXG4uQlBPSywgLnJlcGxheSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbnllbGxvdztcXG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IDIwMG1zO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5CUE9LOmhvdmVyLCAucmVwbGF5OmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IDAgMCAwLjI1cmVtIGdyYXk7XFxuICBib3JkZXItY29sb3I6IGdyYXk7XFxufVxcblxcbi5zcXItaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcXG59XFxuXFxuLmhpZGUge1xcbiAgb3BhY2l0eTogMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXJlbSk7XFxufVxcblxcbi5ibHVyIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICB0b3A6IDA7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXB4KTtcXG4gIHotaW5kZXg6IDI7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgNDAwbXM7XFxufVxcblxcbi5lbmQtc2NyZWVuIHtcXG4gIHotaW5kZXg6IDU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMzByZW07XFxuICBoZWlnaHQ6IDEwcmVtO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1jb2xvcik7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICBib3gtc2hhZG93OiAwLjI1cmVtIDAuMjVyZW0gMC4yNXJlbSB2YXIoLS1zaGFkb3cpO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXJlbSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgZWFzZS1pbi1vdXQgNDAwbXM7XFxuICBjb2xvcjogdmFyKC0tdGV4dCk7XFxufVxcblxcbi5lbmQtYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cXG4uRVNNc2cge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBHYW1lcGxheSBmcm9tIFwiLi9wbGF5XCI7XG5cbkdhbWVwbGF5LmJlZ2luKCk7Il0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJzQmxvY2tzIiwic2hpcHMiLCJibG9ja3MiLCJoaXRCbG9ja3MiLCJzdW5rU2hpcHMiLCJzZXR1cCIsImkiLCJibGtzIiwic2hpcCIsInB1c2giLCJiIiwiYmxrIiwicmVjZWl2ZUF0dGFjayIsImJsb2NrIiwiaW5kZXhPZiIsInNoaXBCbG9ja3MiLCJnZXRCbG9ja3MiLCJoaXQiLCJpc1N1bmsiLCJnZXRTdW5rU2hpcHMiLCJhbGxTdW5rIiwibGVuZ3RoIiwiUGxheWVyIiwibmFtZSIsImdhbWVib2FyZCIsImF0dGFjayIsImVuZW15IiwiZ2V0TmFtZSIsInBsYXllckFJIiwibWFrZVNoaXBzIiwicm93cyIsInIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzdGFydCIsImoiLCJuYW1lcyIsImdlbmVyaWNQbGF5ZXIiLCJzdW5rIiwiVUkiLCJsb2FkIiwiYWRkU3RydWN0dXJlcyIsImFkZEhlYWRlciIsImFkZEJvZHkiLCJhZGRCbG9ja1BsYWNlciIsImFkZEJsdXJTY3JlZW4iLCJhZGRFbmRTY3JlZW4iLCJoZWFkZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJtYWluIiwiZm9vdGVyIiwiYm9keSIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsInRleHRDb250ZW50IiwidGhlbWVzIiwiaGVhZGVyRGl2IiwiYm9hcmRzIiwiYjEiLCJjcmVhdGVCb2FyZCIsImIyIiwiYm9hcmROYW1lIiwiYm9hcmQiLCJzcXVhcmVzIiwic3FyIiwic2NvcmUiLCJ0aXRsZSIsImFkZGVyIiwibmFtZUlucHV0Iiwic2V0QXR0cmlidXRlIiwib2tidG4iLCJicGwiLCJibHVyIiwiZW5kIiwibXNnIiwicmVwbGF5IiwiR2FtZXBsYXkiLCJBSSIsInBsYXllciIsInN0YXJ0U2lnbmFsIiwicGxheWVySGl0IiwiY29tcEhpdCIsInR1cm4iLCJiZWdpbiIsImxvYWRBY3Rpb25MaXN0ZW5lcnMiLCJzaXplIiwicGxheWVyU2hpcHMiLCJicHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0IiwibGltaXQiLCJjaGVja1ZhbGlkU3F1YXJlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzZXR1cEJvYXJkIiwicGxheWVyQmxvY2tzIiwiZ2FtZUJsb2NrcyIsInRvZ2dsZSIsIkFJVHVybiIsInNldFRpbWVvdXQiLCJnZXRBSU1vdmUiLCJjaGVjayIsIm1hcmtCbG9jayIsInVwZGF0ZVNjb3JlIiwid2luQ2hlY2siLCJlbmRHYW1lIiwiYm9hcmRBY3RpdmVUb2dnbGUiLCJ3aW5uZXIiLCJibHVyVG9nZ2xlIiwiZW5kU2NyZWVuVG9nZ2xlIiwiY3VycmVudENTaGlwcyIsImNTaGlwcyIsImNTdW5rIiwiY3VycmVudFBTaGlwcyIsInBTaGlwcyIsInBTdW5rIiwicmVzZXQiLCJzcXJzIiwiQlBzcXJzIiwiQlBTY3JlZW5Ub2dnbGUiLCJyZXNldEFjdGl2ZUJvYXJkIiwiQlBPSyIsInRoZW1lIiwib25jbGljayIsInRoZW1lVG9nZ2xlIiwiY29udGFpbnMiLCJ0b3BCYXJUb2dnbGUiLCJlbmRNc2ciLCJjb21wIiwiaXRlciJdLCJzb3VyY2VSb290IjoiIn0=
