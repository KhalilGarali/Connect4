const RED_CLASS = 'red';
const YELLOW_CLASS = 'yellow';
const cellElements = document.querySelectorAll('[data-cell]');
const cellGrid = [...document.querySelectorAll('[data-cell]')];
const board = document.getElementById('board');
const winningMessageContent = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const cellInGrid =[];
while(cellGrid.length) cellInGrid.push(cellGrid.splice(0,7));
console.log(cellInGrid);
const WINNING_COMBINATION =[
[0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], 
[34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
[21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], 
[13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
[0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], 
[40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
[3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], 
[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
[6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], 
[41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
[14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], 
[6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
[21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], 
[5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], 
[40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
[11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], 
[5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
[15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], 
[26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
[36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], 
[8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
[11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34] 
]
const isFilled =[
    [0,7,14,21,28,25], [1,8,15,22,29,36],[2,9,16,23,30,37],
    [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40],
    [6,13,20,27,34,41]
]

let redTurn;


startGame();

restartButton.addEventListener('click', startGame)

function startGame(){
    redTurn = false;
    //cellElements.forEach(cell =>{
    for(var i=0; i<42; i++){
        cellElements[i].classList.remove(RED_CLASS);
        cellElements[i].classList.remove(YELLOW_CLASS);
        cellElements[i].removeEventListener('click', handleClick);
        cellElements[i].addEventListener('click', handleClick, {once:true})
    }
        
    //});
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');


}

function handleClick(e){
    //placePiece
    const cell = e.target;
    const currentPlayer = redTurn ? YELLOW_CLASS : RED_CLASS;
    placePiece(cell, currentPlayer, );
    if(checkWinner(currentPlayer)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        switchTurns();
        setBoardHoverClass();
    }
    
}

function endGame(draw){
    if(draw){
        winningMessageContent.innerText = 'Draw!';
    }
    else{
        winningMessageContent.innerText = `${redTurn ? "Yellow" :
         "Red"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(RED_CLASS) || cell.classList.contains(YELLOW_CLASS)
    });
}

function placePiece(cell, currentPlayer){
   /*for(var i=0; i<42; i++){
            if((cell[i+7].classList.contains(YELLOW_CLASS)) || (cell[i+7].classList.contains(RED_CLASS))){
                cell.classList.add(currentPlayer);
            }
        }

    
        for(var i=6; i>=0;i--){
            for(var j=6;j>=i;j--){
                if(cellInGrid[i][j].classList.contains(RED_CLASS)){

                }
            }
        }
        */
        cell.classList.add(currentPlayer);

}
    


function switchTurns(){
    redTurn = !redTurn;
}
function setBoardHoverClass(){
    board.classList.remove(RED_CLASS);
    board.classList.remove(YELLOW_CLASS);
    if(redTurn){
        board.classList.add("yellow");
    }
    else{
        board.classList.add("red");
    }

}

function checkWinner(currentPlayer){
    return WINNING_COMBINATION.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}