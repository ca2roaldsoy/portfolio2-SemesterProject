/***************************    Selecting Character  ***************************/

var allTokens = document.querySelectorAll(".characters__token--img");
var selected = document.querySelector("input[name='token']:checked"); 
var chInfo = document.getElementById("banner");
var playBtn = document.getElementById("playBtn");
playBtn.style.display = "none";

allTokens.forEach(function(token){
    
    token.addEventListener("click", function(){
        
        var playerName = this.dataset.name;
        playBtn.style.display = "block";
        
        if(selected != null) {
            
            chInfo.style.display = "block";
            this.classList.add("glow");
            saveStorage(playerName);
            
        } else {
            token.classList.remove("glow");
            removeStorage(playerName);
        }
    })
});


//Save to Local Storage
function saveStorage(player) {
    
    localStorage.setItem("player", player);
};

//Remove from Local Storage
function removeStorage(player) {
    
    localStorage.setItem("player", player);
};

//Get to next page
var playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", function(){
    
    window.location.href = "board.html"
});

/***************************    Get Characters Api  ***************************/
counter = 0;

function apiReq (ids){
var api = ("https://anapioficeandfire.com/api/characters/" + ids);
fetch(api)

.then (result => result.json())
.then ((res) => { 
    
    (res)
    
    var charInfo = document.getElementById("banner");
   
    var label = document.querySelector(".characters__container");
    var cardBody = document.querySelector(".card-body");
    var ul = document.createElement("ul");
    label.appendChild(ul);
    charInfo.appendChild(label);

    switch (ids) {

            case ids:   cardBody.innerHTML += "<h3 class='card-title'>" + res.name + "</h3>";
                        cardBody.innerHTML += "<p class='card-text'> Title: <br>" + res.titles[0] + "</p>";
                        
                        if(res.titles[0] == "") {
                
                        cardBody.innerHTML += "<p class='card-text'>Unknown</p>";
                            
                        }
            
                        cardBody.innerHTML += "<p class='card-text'>Alias: <br>" + res.aliases[0] + "</p>";
                        cardBody.innerHTML += "<p class='card-text'> Born: <br>" + res.born + "</p>";
                break;
    }
    
})
    
.catch (error => console.log(error))
    
};

apiReq(148);    // Arya Stark
apiReq(583);    // Jon Snow
apiReq(957);    // Sansa Stark
apiReq(338);    // Eddard Stark
apiReq(529);    // Jamie Lannister
apiReq(1052);   // Tyrion Lannister
apiReq(565);    // Joffrey Baratheon
apiReq(901);    // Robert Baratheon
apiReq(1022);   // Theon Greyjoy
apiReq(1303);   // Daenerys Targaryen