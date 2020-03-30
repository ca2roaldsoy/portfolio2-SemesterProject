
var scoreBtn = document.getElementById("scoreBtn");
var playerScore = document.querySelector(".playerScore");
var playAgainBtn = document.querySelector("#playAgainBtn");
var tokenImg = document.querySelector(".tokenImg");
var getPlayerScore;
var getplayerName;

/***************************    Get Player Name & Player Score  ***************************/

function getStorage(arg1, arg2) {
    
    getPlayerScore = localStorage.getItem(arg1);
    getplayerName = localStorage.getItem(arg2);
    playerScore.innerHTML += getPlayerScore;
    
};

getStorage("playerScore", "player");

/***************************    Display Score  ***************************/

scoreBtn.addEventListener("click", function() {
    
    scoreBtn.style.display = "none";
    playerScore.style.display = "block";
})

/***************************    Play Again  ***************************/

playAgainBtn.addEventListener("click", function(){
    
    window.location.href = "index.html"
})

/***************************    Display Player Token  ***************************/

var players = getplayerName.toLowerCase().replace(" ", "_");

var tokenImgEl = document.createElement("img")
tokenImgEl.classList.add("tokenImg");

tokenImgEl.src = "images/Tokens/"+players+".png";
tokenImgEl.alt = getplayerName;
tokenImg.appendChild(tokenImgEl);