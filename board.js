/***************************    Get Local Storage  ***************************/

var playerName = document.querySelector(".playerName");
var getLocal;

function getStorage(arg1) {
  getLocal = localStorage.getItem(arg1);
  playerName.innerHTML = getLocal;
}

getStorage("player");

/***************************    Construct The Board  ***************************/
var tiles = 31;
var board = document.getElementById("board");
var centerW = window.innerWidth / 2 - 30 + "px";
var centerH = window.innerHeight / 2 - 115 + "px";
var d = 180;
var r = "rotate(" + d + "deg)";
var tileContainer = document.getElementById("board");
var jumbo = document.querySelector(".jumbo");
var jumboTron = document.querySelector(".jumbotron");
var jumboTitle = document.querySelector(".jumboTitle");
var jumboText = document.querySelector(".jumboText");
var jumboImg = new Image();
var button = document.getElementById("closeBtn");

// classes and append
jumboImg.className = "jumboImg";
jumboTron.appendChild(jumboImg);

// styles
tileContainer.style.maxWidth = "100%";
jumboText.style.minWidth = "400px";
jumboText.style.paddingLeft = "65px";
button.style.width = "15%";

function boardGame() {
  for (var i = 0; i < tiles; ++i) {
    var tile = document.createElement("div");
    var tileId = document.createElement("div");

    //create tiles in a circle
    var radius = (360 * i) / tiles;
    var rotate =
      "translate(" +
      centerW +
      "," +
      centerH +
      ") rotate(" +
      radius +
      "deg) translate(0px, -21vw)";

    tileId.style.padding = "10px";
    tileId.classList = "tile";
    tile.classList = "box";
    tile.setAttribute("style", "-webkit-transform:" + rotate);
    tile.id = "tile" + i;

    tile.appendChild(tileId);
    tileContainer.appendChild(tile);

    // fill tiles with informantion
    if (tile.id === "tile0") {
      tileId.innerHTML += "START";
      tile.style.backgroundSize = "50px 15px";
      tile.style.backgroundPosition = "10px 40px";
      tile.style.paddingTop = "10px";
    }

    if (tile.id === "tile15") {
      tileId.innerHTML += "Extra Turn";
      tileId.style.transform = r;
    }

    if (tile.id === "tile11") {
      tileId.innerHTML += "Move back 3 spaces";
      tileId.style.transform = r;
    }

    if (tile.id === "tile28") {
      tileId.innerHTML += "Move back 4 spaces";
      tileId.style.transform = r + 180;
    }

    if (tile.id === "tile30") {
      tileId.style.transform = r + 180;
    }
  }
}

boardGame();

function gameJumbo(size, btnColor) {
  jumbo.style.display = "flex";
  jumboImg.style.width = size;
  button.style.backgroundColor = btnColor;
}

/***************************    Add Token to Board  ***************************/

var counter = 0;
var playerScore = 0;

// create a token
var token = document.createElement("div");

// add class to token
var characterClass = getLocal.toLowerCase().replace(" ", "-");
token.classList.add("token__1", characterClass);
token.id = "token";

// Start token at START
var thisTile = document.getElementById("tile0");
thisTile.appendChild(token);

// Game
function game() {
  var dices = [
    "dice1.png",
    "dice2.png",
    "dice3.png",
    "dice4.png",
    "dice5.png",
    "dice6.png"
  ];
  var diceRoll = document.getElementById("diceRoll");
  var dice = document.querySelector("#dice");
  var diceEyes = document.querySelectorAll(".dice__eyes");
  var sum = document.querySelector(".sum");
  var diceCount = 0;

  /***************************    Start the Game  ***************************/

  window.onload = setTimeout(function() {
    jumboTitle.innerHTML = "Play Game";
    jumboText.innerHTML =
      "<p>Cersei Lannister is about to take the crown and rule the seven kingdoms!</p><p> We recon you got <strong>8</strong> turns to get the crown before her.</p><p>Be aware as she watches out for everyone. It is up to you now, " +
      getLocal +
      ".</p><p>Please be sure to visit the houses, you might get lucky.</p> <p> If you role <strong>6</strong>, you get an extra turn! Start by rolling the dice.</p> <p><i>When you are ready press 'Play Game'.</p>";
    jumboImg.src = "images/Logo/swordLogo.png";
    jumboImg.alt = "Two swords crossing a crown";
    button.textContent = "Play Game";
    jumboText.style.maxWidth = "1000px";

    gameJumbo("300px", "#748F00");
  }, 1000);

  /***************************    Roll the Dice  ***************************/

  diceRoll.addEventListener("click", function() {
    function initDices() {
      counter++;
      sum.innerHTML = "<b>" + counter + "</b>" + "/8";

      // initialize game
      var interval = setInterval(function() {
        diceRoll.style.display = "none";
        nextDice();
      }, 150);

      // loop through numbers and display final number
      setTimeout(function() {
        var max = 6;
        var roll = Math.ceil(Math.random() * 6);

        // add roll to player score
        playerScore += roll;

        // clear the token from all tiles
        var tiles = document.querySelectorAll(".box");

        tiles.forEach(function(tile) {
          var elInTile = tile.childNodes;

          elInTile.forEach(function(element) {
            // if token is inside, remove it
            if (element.id === "token") {
              element.remove();
              token.classList.remove("tileGlow");
            } else {
              token.classList.add("tileGlow");
            }
          });
        });

        // append the token to the tile
        var currentTile = document.getElementById("tile" + playerScore);

        //victory
        if (playerScore >= tiles.length - 1 && counter < 9) {
          thisTile.appendChild(token);
          diceCount = 0;
          saveStorage(Math.round(((playerScore * roll) / counter) * 10));
          window.location.href = "winner.html";
        }

        currentTile.appendChild(token);

        /***************************    Move token x spaces  ***************************/
        setTimeout(function() {
          // Tile 11 - Move back 3 spaces
          if (currentTile.id == "tile11") {
            currentTile = document.getElementById("tile8");
            currentTile.appendChild(token);
            playerScore -= 3;

            jumboTitle.innerHTML = "You are under attack";
            jumboText.innerHTML =
              "<p>Cersei Lannister has sent her evil minions to stop you from moving forward.</p><p>You are outnumbered </p><p> Retreat, Retreat, Retreat</p>";
            jumboImg.src = "images/jumbo/minions.jpg";
            jumboImg.alt = "Woman sending birds to a castle";
            button.textContent = "Move back 3 spaces";

            gameJumbo("720px", "#C20C0C");

            // Tile 15 - Extra Turn
          } else if (currentTile.id == "tile15") {
            jumboTitle.innerHTML = "Help from an ally";
            jumboText.innerHTML =
              "<p>Hodor has come to aid you on your mission. He will hold the door so the enemies can't reach you!</p> <p> Get an extra turn</p>";
            jumboImg.src = "images/jumbo/aid.jpg";
            jumboImg.alt = "Knight in armour";
            button.textContent = "Get an EXTRA turn";

            gameJumbo("720px", "#748F00");

            // Tile 29 - Move back 5 spaces
          } else if (currentTile.id == "tile28") {
            currentTile = document.getElementById("tile25");
            currentTile.appendChild(token);
            playerScore -= 4;

            jumboTitle.innerHTML = "Watch out Cersei Lannister is on to you";
            jumboText.innerHTML =
              "<p>Cersei Lannister has sensed your coming. She has taken her guards out to search for you.</p><p> Hurry, " +
              getLocal +
              ", retreat back to safety";
            jumboImg.src = "images/jumbo/guards.jpg";
            jumboImg.alt = "Battle cavalry";
            button.textContent = "Move back 5 spaces";

            gameJumbo("720px", "#C20C0C");

            // Tile 5 - House Baratheon
          } else if (currentTile.id == "tile5") {
            jumboTitle.innerHTML = "House Baratheon";
            jumboText.innerHTML =
              "<p>Welcome to House Baratheon, " +
              getLocal +
              ". Come and join us for a meal!</p><p><i>Stay over a turn</i></p>";
            jumboImg.src = "images/GameMap/house_baratheon.png";
            jumboImg.alt = "House Baratheon";
            button.textContent = "Loose a turn";

            gameJumbo("400px", "#C20C0C");
            ++counter;

            // Tile 7 - House Greyjoy
          } else if (currentTile.id == "tile7") {
            jumboTitle.innerHTML = "House Greyjoy";
            jumboText.innerHTML =
              "<p>Welcome to House Greyjoy, " +
              getLocal +
              ". </p><p> We are wishing you welcome, and provide you with a horse on your journey.</p> <p><i>Get an extra turn</i></p>";
            jumboImg.src = "images/GameMap/house_greyjoy.png";
            jumboImg.alt = "House Greyjoy";
            button.textContent = "Get an EXTRA turn";

            gameJumbo("400px", "#748F00");
            --counter;

            // Tile 20 - House Stark
          } else if (currentTile.id == "tile20") {
            jumboTitle.innerHTML = "House Stark";
            jumboText.innerHTML =
              "<p>Welcome to House Stark, " +
              getLocal +
              ".</p><p>You get help from the 3 eyed raven, to watch for enemies.</p><p><i>Get an extra turn</i></p>";
            jumboImg.src = "images/GameMap/house_stark.png";
            jumboImg.alt = "House Stark";
            button.textContent = "Get an EXTRA turn";

            gameJumbo("400px", "#748F00");
            --counter;

            // Tile 25 - House Targaryen
          } else if (currentTile.id == "tile24") {
            currentTile = document.getElementById("tile26");
            currentTile.appendChild(token);
            playerScore += 2;

            jumboTitle.innerHTML = "House Targaryen";
            jumboText.innerHTML =
              "<p>Welcome to House Targaryen, " +
              getLocal +
              ".</p><p>Fly on a dragon on your quest. They will help you move quickly<p></p><i>Move 2 spaces forward</i>";
            jumboImg.src = "images/GameMap/house_targaryen.png";
            jumboImg.alt = "House Targaryen";
            button.textContent = "Move forward 2 spaces";

            gameJumbo("400px", "#748F00");

            // Tile 28 - House Lannister
          } else if (currentTile.id == "tile27") {
            jumboTitle.innerHTML = "House Lannister";
            jumboText.innerHTML =
              "<p>Oh no! You have been spotted by a Lannister.</p><p>They have imprisoned you and raised the alarm<br><i>Loose a turn</i><p>";
            jumboImg.src = "images/GameMap/house_lannister.png";
            jumboImg.alt = "House Lannister";
            button.textContent = "Loose a turn";

            gameJumbo("400px", "#C20C0C");
            ++counter;
          }
        }, 500);

        // Defeat
        if (playerScore < tiles.length && counter >= 8) {
          setTimeout(function() {
            jumboTitle.innerHTML = "Defeat";
            jumboText.innerHTML =
              "<p>This is a sad day. Cersei Lannister has taken the crown,<br> and now rules the 7 kingdoms";
            jumboImg.src = "images/jumbo/knight_defeat.jpg";
            jumboImg.alt = "defeated knight";
            jumbo.style.display = "flex";
            jumbo.style.zIndex = 10;
            button.textContent = "Try Again";
            button.style.backgroundColor = "#C20C0C";
            diceCount = 0;
            button.addEventListener("click", function() {
              window.location.href = "index.html";
            });
          }, 600);
        }

        // dice roll
        var diceNr = document.getElementById("diceNr");
        for (var i = 0; i < 6; i++) {
          if (roll === i + 1) {
            diceNr.src = "images/Dice/1x/" + dices[i];
            clearInterval(interval);
          }
        }

        // get extra turn if rolling 6
        if (roll === 6) {
          --counter;
        }

        diceRoll.style.display = "block";
      }, 3000);
    }

    function nextDice() {
      if (dices.length === diceCount + 1) {
        diceCount = 0;
      } else {
        diceCount = Math.ceil(Math.random() * 5);
      }

      document.getElementById("diceNr").src =
        "images/Dice/1x/" + dices[diceCount];
      console.log(document.getElementById("diceNr").src);
    }

    window.onload = initDices();
  });
}

game();

/***************************    Close Jumbotrone  ***************************/
button.addEventListener("click", function() {
  jumbo.style.display = "none";
});

/***************************    Back to index page  ***************************/
document.getElementById("backBtn").addEventListener("click", function() {
  window.location.href = "index.html";
});

/***************************    Save to local storage  ***************************/
function saveStorage(playerScore) {
  localStorage.setItem("playerScore", playerScore);
}
