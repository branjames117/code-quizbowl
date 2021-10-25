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
    questionEl.textContent = questions[i].question
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
]
