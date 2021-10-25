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

  for (let i = 1; i <= 20; i++) {
    let questionEl = document.createElement('div')
    questionEl.id = 'quiz-content'
    mainEl.appendChild(questionEl)
  }
}
