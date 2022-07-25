import "./style.css";

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

export default UI;
