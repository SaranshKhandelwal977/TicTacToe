const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
initGame();
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents = "all"; 
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", ()=> {handleClick(index);})
})

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        if(currentPlayer === "X") currentPlayer = "O";
        else currentPlayer = "X";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
        checkGameOver();
    }
}
function checkGameOver(){
    let ans = "";
    winningPosition.forEach((position) =>{
        //all 3 boxes should be non empty and have same value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]] === "X"){
                ans = "X";               
            }
            else{
                ans = "O";
            }
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans !== ""){
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Winner Player - ${ans}`;
        return;
    }

    //if tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") fillCount++;
    })
    
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click", initGame);