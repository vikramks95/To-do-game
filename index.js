const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets create a function to initalization the game
function initGame() {
      // Set Current Player to X 
    currentPlayer = "x";
     // Empty Kar Do Boxes 
    gameGrid = ["","","","","","","","",""];
    // UI Empty krna parega
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvent = "all";
        // green color ko remove krna h
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameinfo.innerText = `CurrentPlayer - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer == "x"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "x";
    }
    //UI update
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // //TODO
    // newGameBtn.classList.add("active");
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !=="" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //check if winner is x
            if(gameGrid[position[0]] === "x")
                answer = "x";
            else
                answer = "0";

            //disable pointer 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know x/0 is a winner\
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
 
    })

     if(answer !== ""){
        gameinfo.innerText = `winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }

     //when there is no winner
     let fillCount = 0;
     gameGrid.forEach((box) =>{
           if(box !=="" )
            fillCount++;
     });

     //board is filled game is TIE
     if(fillCount === 9){
        gameinfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
     }

}

function handleClick(index) {
   if(gameGrid[index] == "" ){
      boxes[index].innerHTML = currentPlayer;
      gameGrid[index] = currentPlayer;
      boxes[index].style.pointerEvent = "none";
      //swap karo turn ko 
      swapTurn();
      //check koi jeet toh nhi gya
      checkGameOver();
   }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);