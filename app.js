const qwerty = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;
const overlay = document.getElementById('overlay');
const startGameButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const phrases = [
    "Giddy up cowboy",
    "Never set yourself on fire",
    "Bananas can be green",
    "I am dirty dan",
    "Look here pinhead",
];
const buttons = document.querySelectorAll('.keyrow button');

startGameButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    startGameButton.style.display = 'none';
    title.style.display = 'none';
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    missed = 0;
});

function getRandomPhraseAsArray(arr) {
    const randomphrase = arr[Math.floor(Math.random() * 5)].split('');
    // console.log(randomphrase);
    return randomphrase;
};

function addPhraseToDisplay(arr) {
    for ( let i=0; i < arr.length; i++) {
        const newElement = arr[i];
        const li = document.createElement('li');
        li.innerHTML = newElement;
        phrase.appendChild(li);
        
        if (li.innerHTML !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space'
        }
    }
};




function checkLetter(key) {
    const letters = document.querySelectorAll('.letter');
    let letterFound = null;
    for ( let i=0; i < letters.length; i++ ) {
        if (key === letters[i].textContent.toLowerCase()) {
            letters[i].classList.add('show');
            letterFound = true;
        }
    } 
    // console.log(key);
    return letterFound;
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const chosen = e.target;
      chosen.classList.add('chosen');
      chosen.setAttribute("disabled", true);
      const letterFound = checkLetter(chosen.textContent);
      if(letterFound === null){
        missed += 1;
        var ol = document.querySelector('ol');
        ol.removeChild(ol.firstElementChild);
      }
      checkWin();
    }
});

function checkWin() {
    const displayLetters = document.querySelectorAll('.show');
    const allLetters = document.querySelectorAll('.letter');
    if ( allLetters.length === displayLetters.length ) {
        overlay.style.display = '';
        overlay.className = 'win';
        startGameButton.style.display = '';
        startGameButton.textContent = 'Reset Game';
        title.style.display = '';
        title.textContent = 'You Won!';
        resetGame();
    } else if (missed >= 5) {
        overlay.style.display = '';
        overlay.className = 'lose';
        startGameButton.style.display = '';
        startGameButton.textContent = 'Play again?';
        title.style.display = '';
        title.textContent = 'Game Over!';
        resetGame();
    }
}

function resetGame() {
    phrase.textContent = '';
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].className = '';
        buttons[i].removeAttribute('disabled');
    }

    const scoreBoard = document.querySelector('#scoreboard ol');
    scoreBoard.innerHTML = '';

    for (var i = 0; i < 5; i++) {
        const li = document.createElement('li');
        li.className = 'tries';
    
        const img = document.createElement('img');
        img.src = 'images/liveHeart.png';
        img.height = '35';
        img.width = '30';
    
        li.appendChild(img);
        scoreBoard.appendChild(li);
    }
}
