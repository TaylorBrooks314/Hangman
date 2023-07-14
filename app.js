//set level
let chosenWord="";
let category="";
let level;
let wordBoxDivArr=[];
let levelBtns= document.getElementsByClassName("levelBtns")
for (let i=0; i<levelBtns.length; i++){
    levelBtns[i].style.color="black";
    levelBtns[i].addEventListener("click", function(event){
        level=event.target.innerHTML;
        console.log(level)
        getWord();
        makeBoxes(chosenWord);
        play(chosenWord,wordBoxDivArr)
    })
}
// a "restart game button"
let header= document.querySelector("header");
let newGameBtn= document.createElement("button");
newGameBtn.innerHTML="New Game";
header.appendChild(newGameBtn);
newGameBtn.classList.add("class","green");
newGameBtn.style.color="black";
newGameBtn.classList.add("class","new-game");
newGameBtn.addEventListener("click",function(){
window.location.reload();
}) 

// function to remove parts when player gets wrong answer
let hangmanParts= document.getElementsByTagName("img");
console.log(hangmanParts);
function removeHangmanParts(){
    hangmanParts[0].remove();
}

// a list of words and catagories for each level(should it be an array or obj?)
let Words= [
    ["Fruits","GRAPE","PEAR","APPLE","KIWI","GUAVA"],
    ["Animals","CHEETAH","PENGUIN","ELEPHANT","KANGAROO","SEAHORSE"],
    ["Household","REFRIGERATOR","TELEVISION","DISHWASHER","PICTURE-FRAME","BLOW-DRYER"]
]



// // loop for creating letter buttons
let letterArray=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let letterButtonArray=[];
let guess="";
// may not need to be a function (don't reuse it/ loop just does the word)
function createLetterButtons(){
    let letterBox= document.querySelector("#letters");
    for (let i=0; i<letterArray.length; i++){
        let button = document.createElement("button");
        button.classList.add("class","brown");
        button.innerHTML= letterArray[i];
        letterBox.appendChild(button);
        letterButtonArray.push(button);
        button.addEventListener("mouseenter",function(){
        button.classList.toggle("brown");
        })
        button.addEventListener("mouseout",function(){
        button.classList.toggle("brown");
        })
        button.addEventListener("click", function(evt){
        evt.target.setAttribute("disabled","disabled");
        })
        // button.addEventListener("click",function(evt){  
        //     guess=evt.target.innerHTML;
        //     console.log(guess)
        // })    
    }
}
createLetterButtons();


function play(word,wordDivArr){
    // show player[i].message.innerHTML = "it's your turn! choose a letter"
    player1.messageBox.innerHTML = "it's your turn! choose a letter";
        for(l in letterButtonArray){
            // event listener on letter buttons to check if they are in the level1word
            letterButtonArray[l].addEventListener("click",function(evt){
                let set =new Set();
                for(let w=0; w<word.length;w++){
                    set.add(word[w]);
                    // if it is- show letter
                    if (evt.target.innerHTML=== word[w]){
                        console.log(document.getElementsByClassName(`${word[w]}`))
                        let multiples= document.getElementsByClassName(`${word[w]}`)
                        // populates correct boxes and accounts for multiple of the same letters
                        wordDivArr.push(multiples);
                        for (m of multiples){
                        m.innerHTML= evt.target.innerHTML;
                        
                        console.log(wordDivArr)
                        if(wordDivArr.length===chosenWord.length){
                                alert("YOU WIN!!!")
                            }
                        }
                        player1.addToScore();
                        // show player.message.innerHTML = "Correct! your turn again"
                        player1.messageBox.innerHTML = "Correct!your turn again.";
                    }
                }
                
                // if not show player.message.innerHTML = "incorrect" 
                if(!set.has(evt.target.innerHTML)){
                    player1.messageBox.innerHTML = "incorrect!no longer your turn.";
                    // console.log(activePlayers[p].messageBox.innerHTML);
                    removeHangmanParts();
                    console.log(hangmanParts.length);
                    if(hangmanParts.length===0){
                        alert("YOU LOSE")
                    }
                    
                }
            });
        }
}

    

// player obj
let  player1={
    // p tag for actual score
    score:document.querySelector(`#player1-score`),

    // message to instruct players
    messageBox:document.querySelector(`#player1-message`),

    // add to player score when they guess correctly
    addToScore: function(){
        this.score.innerHTML++;
    },

// might delete (add later)
        finishedWord: function(){
            this.score.innerHTML+=5;
        }
}
let num=0
player1.score.innerHTML= num;

// function to get words
let categoryEl= document.querySelector("#category")
function getWord(){
    let num= (Math.floor((Math.random()*5+1)));
    if (level==="Level 1"){
        chosenWord= Words[0][num];
        console.log(chosenWord);
        category=Words[0][0];
        console.log(category);
    }else if(level==="Level 2"){
        chosenWord= Words[1][num];
        console.log(chosenWord);
        category=Words[1][0];
        console.log(category);
    }else{
        chosenWord= Words[2][num];
        console.log(chosenWord);
        category=Words[2][0];
        console.log(category);
    }
    categoryEl.innerHTML+=category
}



// function to make boxes with letter inside
let wordBoxesDiv= document.querySelector("#wordBoxes");
function makeBoxes(word){
    for(let i=0; i<word.length; i++){
        console.log(word[i]);
        let wordBoxDiv= document.createElement("div");
        wordBoxesDiv.appendChild(wordBoxDiv);
        wordBoxDiv.classList.add("class","wordBox");
        if(chosenWord[i]==="-"){wordBoxDiv.innerHTML="-"}
        wordBoxDiv.classList.add("class",`${word[i]}`);
        console.log(wordBoxDiv)
    }
}


