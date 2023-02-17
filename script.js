const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game

// const fetchedValues = Object.values(wordsFetched)
// let flatArray = wordsFetched.reduce((acc, curVal) => {
//     return acc.concat(curVal)
// }, [])

// Init word
let randomWord;

//Init score
let score = 0;


// Set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// Set difficulty select value
difficultySelect.value = difficulty



// Init time
let time = 10;

// Focus text on start
text.focus();
// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get random word function
async function getRandomWord() {
    // return words[Math.floor(Math.random() * words.length)]
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=1')
    const data = await res.json()
    // return data[0]
    return data[0]


}

// Add function to DOM 
async function addWordToDOM() {
    randomWord = await getRandomWord();
    word.innerHTML = randomWord
}

// // getRandomWord()

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's'
    if (time === 0) {
        clearInterval(timeInterval)
        // end game
        gameOver();
    }
}


// Game over,show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out </h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
    endgameEl.style.display = 'flex'
}
addWordToDOM()

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear 
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 3;
        } else if (difficulty === 'medium') {
            time += 5
        } else if (difficulty === 'easy') {
            time += 10
        }
        updateTime()

    }
})
// Settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'));

// Settings select 
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})




// console.log(flatArray);
// console.log(wordsFetched);
// console.log(fetchedValues);
// console.log(getRandomWord());
// console.log(wordsFetched);