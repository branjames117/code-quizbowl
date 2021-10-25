console.log('Begin')

// quiz start button
let quizStartEl = document.querySelector('#quiz-start')
quizStartEl.addEventListener('click', startQuiz)

function startQuiz() {
  // initialize the timer
  let timerEl = document.querySelector('#timer')
  let timerValue = 60
  setInterval(() => {
    timerValue--
    timerEl.textContent = timerValue
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
    }

    mainEl.appendChild(quizEl)
  }
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
]
