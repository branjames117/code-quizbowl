// grab some initial elements we will need globally
let bodyEl = document.querySelector('body')
let mainEl = document.querySelector('main')
let resultEl = document.querySelector('#result-content')

// start quiz button functionality
let quizStartEl = document.querySelector('#quiz-start')
quizStartEl.addEventListener('click', startQuiz)
// if Enter is pressed, click the Start Quiz button
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    quizStartEl.click()
  }
})

// view high scores button functionality
let viewHighScoresEl = document.querySelector('#view-high-scores')
viewHighScoresEl.addEventListener('click', renderScores)

// initialize gameplay variables
let timerValue = 1
let score = 0
let playing = true

// initialize gameplay sounds
let correctSound = new Audio('./assets/sound/correct.wav')
let incorrectSound = new Audio('./assets/sound/incorrect.mp3')

// initialize high scores from localStorage if exists, else create it
let highScores = []
if (localStorage.highScores) {
  highScores = JSON.parse(localStorage.highScores)
} else {
  localStorage.highScores = []
}

// start quiz
function startQuiz() {
  correctSound.play() // positive feedback, thanks for starting!

  // shuffle the questions
  questions.sort(() => Math.random() - 0.5)

  // initialize the timer
  let timerEl = document.querySelector('#timer')
  let intervalId = setInterval(() => {
    timerValue--
    timerEl.textContent = timerValue
    // if timer drops below 0, end the game
    if (timerValue <= 0) {
      endQuiz(intervalId)
    }
  }, 1000)

  // render first question 250ms after start quiz button is pressed
  setTimeout(renderQuestion, 250, 0, intervalId)
}

// render question from the shuffled questions array
function renderQuestion(i, intervalId) {
  // first, check if there are still questions left to render
  if (i < questions.length && playing) {
    // clear the quiz content section
    let quizContentEl = document.querySelector('#quiz-content')
    quizContentEl.remove()

    // create the container element
    let quizEl = document.createElement('div')
    quizEl.id = 'quiz-content'

    // get the question from the array and turn it into an h2
    let questionEl = document.createElement('h2')
    questionEl.className = 'question'
    questionEl.textContent = questions[i].question
    quizEl.appendChild(questionEl)

    // shuffle the choices for the chosen question
    let choices = questions[i].choices
    choices.sort(() => Math.random() - 0.5)
    let correctChoice = questions[i].correctChoice

    // loop through the shuffled choices and build button elements for each
    // j is the index for the array (0-3), k is for the keypress (1-4)
    for (let j = 0, k = 1; j < questions[i].choices.length; j++, k++) {
      let choiceEl = document.createElement('button')
      choiceEl.textContent = '(' + k + ') ' + choices[j]
      choiceEl.className = 'choice'
      choiceEl.id = 'choice' + k
      quizEl.appendChild(choiceEl)
      // if the choice matches the correct choice...
      if (choiceEl.textContent.slice(4) == correctChoice) {
        choiceEl.addEventListener('click', () => {
          correctSound.play() // positive feedback
          disableChoices() // temporarily disable the buttons
          score++ // increment the score
          timerValue++ // add a second to the timer
          resultEl.className = 'correct'
          resultEl.classList.add('move')
          resultEl.textContent = 'Correct! 1 second added!'
          // render next question if time remains
          if (timerValue > 0) {
            setTimeout(renderQuestion, 250, ++i) // render next question
          }
        })
      } else {
        choiceEl.addEventListener('click', () => {
          incorrectSound.play() // negative feedback
          disableChoices() // temporarily disable the buttons
          timerValue -= 5 // decrease the timer by 5
          resultEl.className = 'incorrect'
          resultEl.textContent = 'Incorrect! 5 seconds deducted!'
          if (timerValue > 0) {
            setTimeout(renderQuestion, 250, ++i) // render next question
          }
        })
      }
    }

    // add a keyboard listener to listen for choice shortcuts
    document.addEventListener('keydown', (e) => {
      // if either 1-4 are pressed, click on corresponding button
      if (['1', '2', '3', '4'].indexOf(e.key) >= 0 && playing) {
        document.querySelector('#choice' + e.key).click()
      }
    })

    // append question element to main
    mainEl.appendChild(quizEl)
  } else {
    // if there are no questions left to render, end the game
    playing = false
    endQuiz(intervalId)
  }
}

// briefly disable all choices after a selection is made
function disableChoices() {
  let choice1El = document.querySelector('#choice1')
  choice1El.setAttribute('disabled', 'true')
  let choice2El = document.querySelector('#choice2')
  choice2El.setAttribute('disabled', 'true')
  let choice3El = document.querySelector('#choice3')
  choice3El.setAttribute('disabled', 'true')
  let choice4El = document.querySelector('#choice4')
  choice4El.setAttribute('disabled', 'true')
}

// end the quiz when all questions are answered or timer hits 0
function endQuiz(intervalId) {
  playing = false
  let quizContentEl = document.querySelector('#quiz-content')
  quizContentEl.remove()

  // clear the results element
  resultEl.textContent = ''

  // stop the timer
  clearInterval(intervalId)

  // create the high score display
  let highScoreDisplayEl = document.createElement('h2')
  highScoreDisplayEl.textContent = 'Your score is: ' + score

  // create the form to ask for high score submission
  let highScoreFormEl = document.createElement('form')
  highScoreFormEl.innerHTML =
    '<label for="initials">Immortalize Your Initials </label><input type="text" id="initials" name="initials" size="3" maxlength="3" /><br /><button type="submit">Save</button>'
  highScoreFormEl.addEventListener('submit', (e) => {
    // create a high score object containing initials and score
    let highScoreObj = {
      // if user didn't give initials, use N/A
      initials: document.getElementById('initials').value || 'N/A',
      score,
    }
    // store that object in local storage
    highScores.push(highScoreObj)
    localStorage.highScores = JSON.stringify(highScores)
  })

  mainEl.appendChild(highScoreDisplayEl)
  mainEl.appendChild(highScoreFormEl)
}

function renderScores() {
  // sort scores from highest to lowest
  highScores.sort((a, b) => parseInt(b.score) - parseInt(a.score))

  let scoreListEl = document.querySelector('#score-list')
  let scoresModalEl = document.querySelector('#scores-modal')
  let closeModalEl = document.querySelector('#close-modal')
  let clearScoresEl = document.querySelector('#clear-scores')

  // close modal button functionality
  closeModalEl.addEventListener('click', () => {
    scoresModalEl.style.display = 'none'
    // delete all children of the scores list one by one
    // so the score list can be refreshed each time modal is opened
    while (scoreListEl.lastChild) {
      scoreListEl.removeChild(scoreListEl.lastChild)
    }
  })

  // clear scores button functionality
  clearScoresEl.addEventListener('click', () => {
    // clear it in localStorage and also in current memory
    localStorage.highScores = []
    highScores = []
    while (scoreListEl.lastChild) {
      scoreListEl.removeChild(scoreListEl.lastChild)
    }
  })

  // populate the scores modal
  for (let i = 0; i < highScores.length; i++) {
    let scoreEl = document.createElement('li')
    scoreEl.innerHTML =
      '<span>' +
      highScores[i].initials +
      '</span>' +
      '<span>' +
      highScores[i].score +
      '</span>'
    scoreListEl.appendChild(scoreEl)
  }

  // show the scores modal
  scoresModalEl.style.display = 'block'
}

// the questions
const questions = [
  {
    question: 'How would you access the second element in a given array?',
    choices: ['array[0]', 'array[1]', 'array[2]', 'array.1'],
    correctChoice: 'array[1]',
  },
  {
    question:
      "JavaScript's default behavior of moving declarations to the top is called:",
    choices: ['Bubbling', 'Hoisting', 'Funneling', 'Lifting'],
    correctChoice: 'Hoisting',
  },
  {
    question: 'Which element should contain our JavaScript?',
    choices: ['<javascript>', '<js>', '<code>', '<script>'],
    correctChoice: '<script>',
  },
  {
    question: 'How would you access an element with the class name of btn?',
    choices: [
      "document.getElementById('btn')",
      "document.getElementByClassName('btn')",
      "document.querySelector('.btn')",
      "document.querySelector('#btn')",
    ],
    correctChoice: "document.querySelector('.btn')",
  },
  {
    question: "What does '5' === 5 evaluate to?",
    choices: ['true', 'false', 'null', '5'],
    correctChoice: 'false',
  },
  {
    question: 'What is the length of array [0, 5, 25, 125, 5000]?',
    choices: ['4', '5', 'Not enough information', '5000'],
    correctChoice: '5',
  },
  {
    question: 'How many times will the for (let i = 0; i > 5; i++) loop run?',
    choices: ['4 times', '5 times', '6 times', '0 times'],
    correctChoice: '5 times',
  },
  {
    question: 'Which of the following is a data type in JavaScript?',
    choices: ['Boolean', 'Script', 'Constant', 'Element'],
    correctChoice: 'Boolean',
  },
  {
    question:
      'Which of the following is NOT a correct way to comment in JavaScript?',
    choices: ['// comment', '/* comment */', '<!-- comment -->', '// comment'],
    correctChoice: '<!-- comment -->',
  },
  {
    question: 'Which of the following will NOT create a new variable?',
    choices: ['var x = 0', 'let x = 0', 'const x = 0', 'init x = 0'],
    correctChoice: 'init x = 0',
  },
  {
    question: 'What is a callback function?',
    choices: [
      'A function passed to another function as an argument',
      'A function that can be called from the global scope',
      'A method on the document object',
      'A way to store phone numbers in an array',
    ],
    correctChoice: 'A function passed to another function as an argument',
  },
  {
    question: 'Which of the following is NOT a loop?',
    choices: ['for in', 'while', 'for of', 'during'],
    correctChoice: 'during',
  },
  {
    question: 'What does !true evaluate to?',
    choices: ['undefined', 'null', 'true', 'false'],
    correctChoice: 'false',
  },
  {
    question: 'Which of the following is NOT a valid string?',
    choices: ['""', '6', '"6"', "'6'"],
    correctChoice: '6',
  },
  {
    question: 'How would you remove the last element of an array?',
    choices: ['pop()', 'push()', 'evict()', 'remove()'],
    correctChoice: 'pop()',
  },
  {
    question: 'How would you remove the first element of an array?',
    choices: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctChoice: 'shift()',
  },
  {
    question: 'How do you stop execution inside a switch block?',
    choices: ['break', 'end', 'exit', 'default'],
    correctChoice: 'break',
  },
  {
    question:
      'Which of the following variable names demonstrates the best practice?',
    choices: ['albumCover', 'AlbumCover', 'album-cover', 'Album-Cover'],
    correctChoice: 'albumCover',
  },
  {
    question:
      'Which keyword stops the execution of JavaScript and acts as a breakpoint?',
    choices: ['debug', 'debugger', 'break', 'return'],
    correctChoice: 'debugger',
  },
  {
    question: 'What does strict equality (===) check for?',
    choices: [
      'Value',
      'Data type',
      'Value and data type',
      'Value and memory consumption',
    ],
    correctChoice: 'Value and data type',
  },
]
