// grab some initial elements
let mainEl = document.querySelector('main')
let resultEl = document.querySelector('#result-content')

// Start Quiz button
let quizStartEl = document.querySelector('#quiz-start')
quizStartEl.addEventListener('click', startQuiz)
// if Enter is pressed, click the Start Quiz button
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    quizStartEl.click()
  }
})

// initialize gameplay variables
let timerValue = 60
let score = 0
let playing = true

// to do: get high scores from local storage

function startQuiz() {
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

  // begin question loop
  setTimeout(renderQuestion, 250, 0)
}

function renderQuestion(i) {
  // first, check if there are still questions left to render
  console.log(i)
  if (i < questions.length) {
    // clear the quiz content section
    clearContent()

    // create the elements for rendering a question
    let quizEl = document.createElement('div')
    quizEl.id = 'quiz-content'

    // get the question from the questions array and build more elements
    let questionEl = document.createElement('h2')
    questionEl.className = 'question'
    questionEl.textContent = questions[i].question
    quizEl.appendChild(questionEl)

    // shuffle the choices
    questions[i].choices.sort(() => Math.random() - 0.5)

    // loop through the choices and build elements out of each
    for (let j = 0, k = 1; j < questions[i].choices.length; j++, k++) {
      let choiceEl = document.createElement('button')
      choiceEl.textContent = '(' + k + ') ' + questions[i].choices[j]
      choiceEl.className = 'choice'
      choiceEl.id = 'choice' + k
      quizEl.appendChild(choiceEl)
      // if the choice matches the correct choice...
      if (choiceEl.textContent.slice(4) == questions[i].correctChoice) {
        choiceEl.addEventListener('click', () => {
          disableChoices()
          i++
          score++
          timerValue++
          resultEl.className = 'correct'
          resultEl.textContent = 'Correct! 1 second added!'
          setTimeout(renderQuestion, 250, i)
        })
      } else {
        choiceEl.addEventListener('click', () => {
          disableChoices()
          timerValue -= 5
          i++
          resultEl.className = 'incorrect'
          resultEl.textContent = 'Incorrect! 5 seconds deducted!'
          setTimeout(renderQuestion, 250, i)
        })
      }
    }

    // add a keyboard listener
    document.addEventListener('keydown', (e) => {
      // if either 1-4 are pressed, click on corresponding button
      if (['1', '2', '3', '4'].indexOf(e.key) >= 0 && playing) {
        document.querySelector('#choice' + e.key).click()
      }
    })

    mainEl.appendChild(quizEl)
  } else {
    // if there are no questions left to render, end the game
    endQuiz()
  }
}

function clearContent() {
  let quizContentEl = document.querySelector('#quiz-content')
  // remove quiz intro
  quizContentEl.remove()
}

// briefly disable all choices after selection is made
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
  clearContent()
  resultEl.textContent = ''
  // stop the timer
  clearInterval(intervalId)

  let highScoreDisplayEl = document.createElement('h2')
  highScoreDisplayEl.textContent = 'Your high score is: ' + score

  // create the form to ask for high score submission
  let highScoreFormEl = document.createElement('form')
  highScoreFormEl.innerHTML =
    '<label for="initials">Enter your initials: </label><input type="text" id="initials" name="initials" size="5" maxlength="5" /><br /><button type="submit">Submit</button>'
  highScoreFormEl.addEventListener('submit', (e) => {
    e.preventDefault()
    // to do: use local storage to add the initials + score
    console.log('Submitted')
  })

  mainEl.appendChild(highScoreDisplayEl)
  mainEl.appendChild(highScoreFormEl)
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
