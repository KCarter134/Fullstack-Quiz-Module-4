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

//getting questions and options from array
function pullQuestions() {
    const puller = document.querySelector("");
}

// const start_btn = document.querySelector(".start-btn button");
const startQuiz = document.querySelector(".quiz-start");
const endSubmit = startQuiz.querySelector(".buttons .submit");
const continueBtn = startQuiz.querySelector(".buttons .start");
const quizContainer = document.querySelector(".quiz-container");
const resultsContainer = document.querySelector(".results-container");
const answerDisplay = document.querySelector(".question-answers");
const answerResponse = document.querySelector(".answer-response");
const optionBtn = document.querySelector(".option")
const timerDisplay = document.querySelector(".timer");

// when the startQuiz button is clicked

startQuiz.classList.add("activeInfo");

// if continueQuiz button clicked
continueBtn.onclick = () => {
    //hide intro container
    startQuiz.classList.remove("activeInfo");
    //show quiz container
    quizContainer.classList.add("activeQuiz");
    showOptions(0);
    questionCounter(1);
};

let counter;
let counterLine;
let questionCount = 0;
let timer;

const quit_quiz = resultsContainer.querySelector(".buttons .submit");

// if start button is clicked
startQuiz.onclick = () => {
    quizContainer.classList.add("activeQuiz"); //show quiz box
    resultsContainer.classList.remove("activeResult"); //hide result box
    questionCount = 0;
    timer = 75;

    showTimer()
    showOptions(questionCount); //calling showOptions function
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
};

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

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(correctAnswer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine

    let userAns = correctAnswer.textContent; //getting user selected option
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
    scoreText.innerHTML = timer
}