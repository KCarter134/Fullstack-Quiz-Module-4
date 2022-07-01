let questions = [
    {
        number: 1,
        question: "Commonly used data types DO NOT include:",
        correctAnswers: "3. alerts",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    },
    {
        number: 2,
        question:
            "The condition in an if/else statement is enclosed with _________.",
        correctAnswers: "3. parenthesis",
        answers: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets",
        ],
    },
    {
        number: 3,
        question: "Arrays in JavaScript can be used to store ___________.",
        correctAnswers: "4. all of the above",
        answers: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
    },
    {
        number: 4,
        question:
            "String values must be enclosed within _________ when being assigned to variables.",
        correctAnswers: "3. quotes",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    },
    {
        number: 5,
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        correctAnswers: "4. console.log",
        answers: [
            "1. Javascript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
    },
];

// const start_btn = document.querySelector(".start-btn button");
const startQuiz = document.querySelector(".quiz-start");
const quizContainer = document.querySelector(".quiz-container");
const resultsContainer = document.querySelector(".results-container");
const scoresContainer = document.querySelector(".scores-container");
const scoreHeader = scoresContainer.querySelector(".score-header")
const answerDisplay = document.querySelector(".question-answers");
const answerResponse = document.querySelector(".answer-response");
const optionBtn = document.querySelector(".option")
const timerDisplay = document.querySelector(".timer");
const scoreSubmitBtn = document.querySelector(".score-submit")
const highScoresLink = document.querySelector(".high-score-link")
const scoresList = document.querySelector(".scores-list")
const goBack = scoresContainer.querySelector(".scores-go-back")
const clearScores = scoresContainer.querySelector(".clear-scores")

// when the startQuiz button is clicked
startQuiz.classList.add("activeInfo");
clearHighScores()


document.querySelector('form').addEventListener('submit', (e) => {
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data['initials'])
    saveScore(data['initials'])
    showHighScores()
})

let counter;
let counterLine;
let questionCount = 0;
let timer;

// if start button is clicked
startQuiz.onclick = () => beginQuiz()
highScoresLink.onclick = () => showHighScores()
goBack.onclick = () => {
    startQuiz.classList.add("activeInfo");
    quizContainer.classList.remove("activeQuiz"); //hide quiz box
    resultsContainer.classList.remove("activeResult"); //hide result box
    scoresContainer.classList.remove("activeScore")
}
clearScores.onclick = () => clearHighScores()

function beginQuiz() {
    startQuiz.classList.remove("activeInfo");
    quizContainer.classList.add("activeQuiz"); //show quiz box
    resultsContainer.classList.remove("activeResult"); //hide result box
    scoresContainer.classList.remove("activeScores")
    questionCount = 0;
    timer = 75;

    showTimer()
    showOptions(questionCount); //calling showOptions function
}

function getStarted() {
    return JSON.parse(localStorage.getItem("started"))
}

function setStarted(started) {
    return localStorage.setItem("started", JSON.stringify(started))
}

function showPrevAnswerCorrect(userAnswer, correctAnswer) {
    let html = '<hr><br>'
    if (userAnswer === correctAnswer) {
        html += "Correct!"
    } else {
        html += "Wrong!"
        timer -= 15
    }
    answerResponse.innerHTML = html;
}

function showTimer() {
    timerDisplay.innerHTML = "Time: " + timer;
}

function hideTimer() {
    timerDisplay.remove()
}

// getting questions and options from array
function showOptions(index) {

    const questionTitle = document.querySelector(".question-title");
    const questionInfo = questions[index]

    let questionContainer = "<span>" + questionInfo.number + ". " + questionInfo.question + "</span>";
    let option1 = '<button class="option">' + questionInfo.answers[0] + '</button>'
    let option2 = '<button class="option">' + questionInfo.answers[1] + '</button>'
    let option3 = '<button class="option">' + questionInfo.answers[2] + '</button>'
    let option4 = '<button class="option">' + questionInfo.answers[3] + '</button>'

    questionTitle.innerHTML = questionContainer;
    answerDisplay.innerHTML = option1 + option2 + option3 + option4;

    const option = answerDisplay.querySelectorAll(".option");
    // set onclick attribute to all available options
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}

//if user clicked on option
function optionSelected(userSelection) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine

    let userAns = userSelection.textContent; //getting user selected option
    let correctAns = questions[questionCount].correctAnswers; //getting correct answer from array

    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuizQuestion(userAns, correctAns)

    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuizQuestion(userAns, correctAns) {
    showTimer()
    showOptions(questionCount);

    if (userAns !== null && correctAns !== null)
        showPrevAnswerCorrect(userAns, correctAns)
}

function showResult() {
    hideTimer()
    startQuiz.classList.remove("activeInfo"); //hide info box
    quizContainer.classList.remove("activeQuiz"); //hide quiz box
    resultsContainer.classList.add("activeResult"); //show result box
    const scoreText = resultsContainer.querySelector(".final-score");
    scoreText.innerHTML = 'Your final score is: ' + timer;
}

function saveScore(initials) {

    let scoresObj = JSON.parse(localStorage.getItem("scores"))
    let scoresMap = new Map(Object.entries(scoresObj))
    scoresMap.set(initials, timer)
    localStorage.setItem("scores", JSON.stringify(Object.fromEntries(scoresMap)))
}

function showHighScores() {
    startQuiz.classList.remove("activeInfo"); //hide info box
    quizContainer.classList.remove("activeQuiz"); //hide quiz box
    resultsContainer.classList.remove("activeResult"); //hide result box
    scoresContainer.classList.add("activeScore")

    scoreHeader.innerHTML = "High Scores"

    let scoresObj = JSON.parse(localStorage.getItem("scores"))
    let scoresMap = new Map(Object.entries(scoresObj))
    let sorted = new Map([...scoresMap.entries()].sort((a, b) => b[1] - a[1]))

    sorted.forEach((values, keys) => {
        scoresList.innerHTML += '<li>' + keys + ' - ' + values + '</li>'
    })

    goBack.innerHTML = "Go back"
    clearScores.innerHTML = "Clear high scores"

}

function clearHighScores() {
    localStorage.setItem("scores", JSON.stringify(Object.entries(new Map())))
}
