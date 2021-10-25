console.log('Begin')

// quiz start button
let quizStartEl = document.querySelector('#quiz-start')
quizStartEl.addEventListener('click', startQuiz)

function startQuiz() {
  // initialize the timer
  let timerEl = document.querySelector('#timer')
  let timerValue = 60
  let intervalId = setInterval(() => {
    timerValue--
    timerEl.textContent = timerValue
    // if timer drops below 0, end the game
    if (timerValue <= 0) {
      endQuiz(intervalId)
    }
  }, 1000)

  // remove quiz intro
  let quizContentEl = document.querySelector('#quiz-content')
  quizContentEl.remove()

  // begin question loop
  let mainEl = document.querySelector('main')

  for (let i = 0; i < questions.length; i++) {
    let quizEl = document.createElement('div')
    quizEl.id = 'quiz-content'

    // get the question from the questions array
    let questionEl = document.createElement('h2')
    questionEl.textContent =
      'Question ' + (i + 1) + '. ' + questions[i].question
    quizEl.appendChild(questionEl)

    for (let j = 0; j < questions[i].choices.length; j++) {
      let choiceEl = document.createElement('button')
      choiceEl.textContent = questions[i].choices[j]
      quizEl.appendChild(choiceEl)
      if (choiceEl.textContent == questions[i].correctChoice) {
        choiceEl.addEventListener('click', () => {
          console.log('Correct choice clicked!')
        })
      } else {
        choiceEl.addEventListener('click', () => {
          console.log('Incorrect choice clicked!')
          timerValue -= 5
        })
      }
    }

    mainEl.appendChild(quizEl)
  }
}

function endQuiz(intervalId) {
  console.log('Game over!')
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
    choices: ['// comment', '/* comment */', '<!-- comment -->'],
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
