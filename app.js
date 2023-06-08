const cells = document.querySelectorAll('.cell');
const turn = document.querySelector('.turn');
const reset = document.querySelector('.reset');
const startGame = document.querySelector('.start-game');
const message = document.querySelector('.result');
const overlay = document.querySelector('.overlay');
const text = document.querySelector('.text')
const classX = 'X';
const classO = 'O';

//player 1 = X, player 2 = O
let player, playerIcon = null;
const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

reset.addEventListener('click', () => {
    cells.forEach(cell => {
        if(cell.hasChildNodes()){
            cell.removeChild(cell.firstChild);
            if(cell.classList.contains(classX)){
                cell.classList.remove(classX);
            }
            if(cell.classList.contains(classO)){
                cell.classList.remove(classO);
            }
        }
    })
    turn.removeChild(turn.firstChild);
    initGame();
});

startGame.addEventListener('click', () => {
    cells.forEach(cell => {
        if(cell.hasChildNodes()){
            cell.removeChild(cell.firstChild);
            if(cell.classList.contains(classX)){
                cell.classList.remove(classX);
            }
            if(cell.classList.contains(classO)){
                cell.classList.remove(classO);
            }
        }
    })
    turn.removeChild(turn.firstChild);
    initGame();
});


function randomPlayer() {
    player = Math.floor(Math.random() * 2) + 1;
}

function createX() {
    const el = document.createElement('img');
    el.src = "./assets/xmark-solid.svg";
    return el;
}

function createO() {
    const el = document.createElement('img');
    el.src = "./assets/circle-regular.svg";
    return el;
}

function checkWinner(playerTurn) {
    let winner = false;
    win.forEach(combination => {
        if(combination.every(index => cells[index].classList.contains(playerTurn))){
            console.log('gwerwg');
            winner = true;
        }
    });
    return winner;
}

function checkTie() {
    return Array.from(cells).every(cell => cell.hasChildNodes());
}

function initGame() {
    overlay.style.display = 'none';
    message.style.display = 'none';
    randomPlayer();
    let el;
    if(player == 1) {
        el = createX();
        playerIcon = classX;
    } else {
        el = createO();
        playerIcon = classO;
    }
    turn.appendChild(el);
}

function gameLoop() {
    cells.forEach(cell => {
        cell.addEventListener('click', () => { 
            if(cell.hasChildNodes()){
                return;
            }
            if(playerIcon === classX) {
                cell.appendChild(createX());             
                turn.replaceChildren(createO());
            } else {
                cell.appendChild(createO());
                turn.replaceChildren(createX());
            }

            cell.classList.add(playerIcon);

            if(checkWinner(playerIcon)){
                overlay.style.display = 'inline-block';
                message.style.display = 'flex';
                text.textContent = `Player ${playerIcon} won`;
            }

            if(checkTie() && !checkWinner()){
                overlay.style.display = 'inline-block';
                message.style.display = 'flex';
                text.textContent = 'It is a tie';
            }  

            playerIcon = playerIcon == classX ? classO : classX;
               
        });
    });
}

initGame();
gameLoop();
