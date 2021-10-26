let mainEl = document.querySelector('main')
let resultEl = document.querySelector('#result-content')

// quiz start button
let quizStartEl = document.querySelector('#quiz-start')
quizStartEl.addEventListener('click', startQuiz)

let timerValue = 60

// what do we need to do
/*
When the page loads, the high score is loaded from localStorage.

When the Start Quiz button is clicked, the startQuiz() function is called, which clears the content section with a call to clearContent() function, then populates the section with a quiz questions consisting of a question and 2-4 possible choices. When one of the choices is clicked, the choice is compared to the correct answer.
  If the incorrect choice is clicked, the timer is reduced, and an Incorrect message appears before the section is cleared again and the next question produced.
  If the correct choice is clicked, a Correct message appears instead, and the score is incremented.
  Regardless, when a choice is clicked, the other choices become unclickable.

When the timer reaches 0 or all questions have been answered, the endQuiz() function is called, which presents an entry box for the user's initials (3 letters) and stores the score in localStorage.



*/

function startQuiz() {
  // initialize the score
  let score = 0

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

  // loop through the choices and build elements out of each
  for (let j = 0, k = 1; j < questions[i].choices.length; j++, k++) {
    let choiceEl = document.createElement('button')
    choiceEl.textContent = j + 1 + '. ' + questions[i].choices[j]
    choiceEl.className = 'choice'
    choiceEl.id = 'choice' + k
    quizEl.appendChild(choiceEl)
    if (choiceEl.textContent.slice(3) == questions[i].correctChoice) {
      choiceEl.addEventListener('click', () => {
        disableChoices()
        console.log('Correct choice clicked!')
        i++
        resultEl.textContent = 'Correct!'
        setTimeout(renderQuestion, 250, i)
      })
    } else {
      choiceEl.addEventListener('click', () => {
        disableChoices()
        console.log('Incorrect choice clicked!')
        timerValue -= 5
        i++
        resultEl.textContent = 'Incorrect!'
        setTimeout(renderQuestion, 250, i)
      })
    }
  }

  // add a keyboard listener
  document.addEventListener('keydown', (e) => {
    // if either 1-4 are pressed, click on corresponding button
    console.log(e.key)
    if (['0', '1', '2', '3', '4'].indexOf(e.key)) {
      console.log(e.key)
      document.querySelector('#choice' + e.key).click()
    }
  })

  mainEl.appendChild(quizEl)
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

function endQuiz(intervalId) {
  console.log('Game over!')
  clearContent()
  // stop the timer
  clearInterval(intervalId)
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
