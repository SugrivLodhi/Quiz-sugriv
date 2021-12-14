const questions = [
    {
        question: "WHO full form?",
        answers: ["World Health Organigatuon", "World Health Optimigation", "Work from Home Organigation", "None of these"],
        correctIndex: 0
    },
    {
        question: "Who is wrote Mahabharat?",
        answers: ["TulsiDas", "Vedvyas", "Kabir Das", "Surdas"],
        correctIndex: 1
    },
    {
        question: "Who is Prime Minister of India present time",
        answers: ["Amithasah", "Soniya Gandhi", "Rahul Gandhi", "Narendra Modi"],
        correctIndex: 3
    },
    {
        question: "Indian Railway first five star Hotal situated in",
        answers: ["Mumbai", "Gujrat", "Delhi", "Haidrabad"],
        correctIndex: 1
    },
    {
        question: "Who is founder of Microsoft",
        answers: ["Zefbesose", "Sunder Pichai", "Bill Gates", "Ravindra Chandran"],
        correctIndex: 2
    },
    {
        question: "Indian First President",
        answers: ["APJ Abdul Kalam", "Partibha Patil", "Ramnath Kovind", "Dr. Rajendra Prasad"],
        correctIndex: 3
    },
    {
        question: "Indian Richest Person",
        answers: ["Ratan Tata", "Ajim Prem Ji", "Mukesh Ambani", "None of these"],
        correctIndex: 2  
    }
]

const instructions = [
    {
        text: questions.length + ' questions are there.'
    },
    {
        text: 'This test duration is ' + questions.length + ' minutes.'
    }
]

let selectedIndex = 0

const app = document.getElementById('app')

window.onload = () => {
    initUI()
    addEvents()
}

function addEvents() {
    const startQuizBtn = document.getElementById('start-button')
    startQuizBtn.addEventListener('click', function() {
        startQuiz()
    })
}

function startQuiz() {
    const questionListHTML = plotQuestionList()
    app.innerHTML = `
        <div class="quiz-header">
            <button class="button" id="end-quiz">Submit</button>
        </div>
        <div class="quiz-container" id="quiz-container">
            <div id="question-list-container">${questionListHTML}</div>
            <div id="question-details-container"></div>
        </div>
    `
    addEventsToQuestions()
    addEventToSubmit()
    plotSelectedQuestion()
}

function addEventToSubmit() {
    document.getElementById('end-quiz').addEventListener('click', function(ev) {
        const score = calculateScore()
        app.innerHTML = `
            <div class="score-container">
                <div class="score-header">Your score is:</div>
                <div class="score">${score}</div>
                <button class="button" id="retake">Retake</button>
            </div>
        `
        document.getElementById('retake').addEventListener('click', function() {
            window.location.reload()
        })
    })
}

function calculateScore() {
    const score = questions.reduce((acc, question) => {
        return acc + (question.correctIndex === question.selectedAnswer ? 1 : 0)
    }, 0)
    return score
}

function addEventsToQuestions() {
    document.getElementById('quiz-container').addEventListener('click', function(ev) {
        const target = ev.target
        const action = target.getAttribute('action')
        switch (action) {
            case 'select-question':
                const index = target.getAttribute('q-index')
                selectedIndex = parseInt(index)
                plotSelectedQuestion()
                break;
            case 'select-answer':
                const qIndex = target.getAttribute('q-index')
                const aIndex = target.getAttribute('a-index')
                questions[parseInt(qIndex)].selectedAnswer = parseInt(aIndex)
                // plotSelectedQuestion()
                break;
            case 'select-answer-list':
                const qIndex1 = target.getAttribute('q-index')
                const aIndex1 = target.getAttribute('a-index')
                questions[parseInt(qIndex1)].selectedAnswer = parseInt(aIndex1)
                plotSelectedQuestion()
                break;
            default:
                break;
        }
    })
}

function plotSelectedQuestion() {
    const selectedQuestionDetailsHTML = plotSelectedQuestionDetails()
    document.getElementById('question-details-container').innerHTML = selectedQuestionDetailsHTML
}

function initUI() {
    
    const instructionsHTML = getInstructions()
    app.innerHTML = `
        <div id="instructions">
            <h3 class="instruction-header">Instructions</h3>
            ${instructionsHTML}
        </div>
        <div class="start-button-container">
            <button class="button" id="start-button">Start quiz</button>
        </div>
    `
}

function getInstructions () {
    const instrustionItems = instructions.map(instruction => {
        return `<li class="instruction-list-item">${instruction.text}</li>`
    }).join('')

    return `
        <ul class="instruction-list">
            ${instrustionItems}
        </ul>
    `
}

function plotQuestionList() {
    const questionItems = questions.map((question, index) => {
        return `
            <li class="question-list-item" action="select-question" q-index="${index}">
                <div class="question-number" action="select-question" q-index="${index}">
                    Q${index + 1}.
                </div>
                <div class="question-list-item-content" action="select-question" q-index="${index}">
                    ${question.question}
                </div>
            </li>
        `
    }).join('')
    return `
        <ul class="question-list">
            ${questionItems}
        </ul>
    `
}

function plotSelectedQuestionDetails() {
    const selectedQuestion = questions[selectedIndex]
    const optionList = plotAnswerOptions(
        selectedIndex, selectedQuestion.answers, selectedQuestion.selectedAnswer
    )
    return `
        <div class="question-number">Question ${selectedIndex + 1}</div>
        <div class="qustion-content">${selectedQuestion.question}</div>
        <div class="option-list-container">${optionList}</div>    
    `
}

function plotAnswerOptions(qIndex, options, selectedAnswer) {
    const optionsHTML = options.map((option, index) => {
        return `
            <li class="answer-option" action="select-answer-list" q-index="${qIndex}" a-index="${index}">
                <input type="radio" name="answer" id="${'ans-' + qIndex + '-' + index}" action="select-answer" q-index="${qIndex}" a-index="${index}" ${index === selectedAnswer && 'checked'}>
                <label class="option-content" for="${'ans-' + qIndex + '-' + index}" action="select-answer" q-index="${qIndex}" a-index="${index}">${option}</label>
            </li>
        `
    }).join('')

    return `
        <ul class="option-list">
            ${optionsHTML}
        </ul>
    `
}

