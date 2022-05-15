// Quiz questions from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
const navigation = document.querySelector("#navigation");
const startButton = document.querySelector("#startBtn");
const counter = document.querySelector("#counter");
const quizContainer = document.querySelector("#quizContainer");
const quizTitle = document.querySelector("#quizTitle");
const quizIntro = document.querySelector("#quizIntro");
const answerContainer = document.querySelector("#answerContainer");
const quizQuestion = document.querySelector("#quizQuestion");
const quizResult =  document.querySelector("#quizResult");

const initialsContainer = document.querySelector("#initialsContainer");
const finalScore = document.querySelector("#finalScore");
const submitButton = document.querySelector("#submitBtn");
const initialsInput = document.querySelector("#initials");
const scoreContainer = document.querySelector("#scoreContainer");
const scoreList = document.querySelector("#scoreList");
const showHighScore = document.querySelector("#showHighScore");

const optionA = document.querySelector("#optionA");
const optionB = document.querySelector("#optionB");
const optionC = document.querySelector("#optionC");
const optionD = document.querySelector("#optionD");

let score = 0;
let currentNum = 0;
let seconds = 60;
let countDownTimer;
let highScores = [];

const questions = [
    {
        question: "What HTML tags do you use to enclose your Javascript?",
        options: {
            a: "<scripting>", 
            b: "<script>", 
            c: "<js>", 
            d: "<javascript>"
        },
        answer: "b"
    }, 
    {
        question: 'How do you write "Hello World" in an alert box?',
        options: {
            a: "msg(\"Hello World\");", 
            b: "msgBox(\"Hello World\");", 
            c: "alert(\"Hello World\");", 
            d: "alertBox(\"Hello World\");"
        },
        answer: "c"
    }, 
    {
        question: "How do you write an IF statement in Javascript?",
        options: {
            a: "if i == 5 then", 
            b: "if i = 5", 
            c: "if (i == 5)", 
            d: "if i = 5 then"
        },
        answer: "c"
    },
    {
        question: "How does a FOR loop start?",
        options: {
            a: "for i = 1 to 5", 
            b: "for (let i = 0; i <= 5; i++)", 
            c: "for (let i = 0; i <= 5)", 
            d: "for (i <= 5; i++)"
        },
        answer: "b"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: {
            a: 'const colors = ["red", "green", "blue"]', 
            b: 'const colors = (1:"red", 2:"green", 3:"blue")', 
            c: 'const colors = "red", "green", "blue"', 
            d: 'const colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'
        },
        answer: "a"
    }
]

const changeTimer = function() {
    countDownTimer = setInterval(timer, 1000);
}

// Create timer
const timer = function() {
    seconds--;

    if (seconds < 0) {
        seconds = 0;
        highScoreInitials();
        clearInterval(countDownTimer);
    }
    counter.textContent = `Time: ${seconds}`;
}

// Create question elements and set their text
const createQuestions = function(currentQuestionChoices) {
    // Set the text inside the questions
    optionA.textContent = currentQuestionChoices.a;
    optionB.textContent = currentQuestionChoices.b;
    optionC.textContent = currentQuestionChoices.c;
    optionD.textContent = currentQuestionChoices.d;

    optionA.onclick = selectAnswerHandler;
    optionB.onclick = selectAnswerHandler;
    optionC.onclick = selectAnswerHandler;
    optionD.onclick = selectAnswerHandler;
};

// Go through each of the answer options and return the correct answer
const findCorrectAnswer = function() {
    const currentQuestionChoices = questions[currentNum].options;
    quizQuestion.textContent = questions[currentNum].question;
    createQuestions(currentQuestionChoices);

    // Get the key that matches the value of the answer
    const answerKey = function(answer) {
        return answer === questions[currentNum].answer;
    }

    // Get an array of the options' keys and find the first one that matches the answer's value
    const findAnswer = Object.keys(questions[currentNum].options).find(answerKey);
    const answer = questions[currentNum].options[findAnswer];

    return answer;
}

// Check their answer and show correct or incorrect message
const selectAnswerHandler = function(event) {
    setTimeout(function() {
        quizResult.classList.add("fade");
    }, 800);

    if (event.target.textContent === findCorrectAnswer()) {
        quizResult.textContent = "You are correct!";
        quizResult.style.color = "#AAE5D0";
        score+=10;
    } else {
        quizResult.textContent = "Sorry, you are incorrect!";
        quizResult.style.color = "#EFD29E";
        seconds-=10;
    }
    quizResult.classList.remove("fade");

    currentNum++;

    if (currentNum < questions.length) {
        findCorrectAnswer();
    } else {
        highScoreInitials();
    }
}

// Show the high score
const highScoreInitials = function() {
    answerContainer.classList.add("hidden");
    initialsContainer.classList.remove("hidden");
    finalScore.textContent = `Your final score is ${score}`;
    clearInterval(countDownTimer);
}

// Create the elements
const createHighScoreEl = function(scoreObject) {

    const scoreItemEl = document.createElement("li");
    scoreItemEl.className = "score-item";
    scoreItemEl.className = "score-list-item";

    const scoreInitialsEl = document.createElement("div");
    scoreInitialsEl.innerHTML = "<p>" + scoreObject.name + "</p>";

    const scoreNumberEl = document.createElement("div");
    scoreNumberEl.innerHTML = "<p>" + scoreObject.score + "</p>";

    scoreList.appendChild(scoreItemEl);
    scoreItemEl.appendChild(scoreInitialsEl);
    scoreItemEl.appendChild(scoreNumberEl);

    // Add high score to array
    highScores.push(scoreObject);

    // Save scores to local storage
    saveScores();
}

// Save to local storage
const saveScores = function() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Loads scores from local storage
const loadScores = function() {
    let savedScores = localStorage.getItem("highScores");

    // Sets to empty if scores is null
    if (!savedScores) {
        return false;
    } 

    savedScores = JSON.parse(savedScores);
    savedScores.forEach(function(score) {
        createHighScoreEl(score);
    });
}

// Handle form submission
const highScoreHandler = function() {
    const initialsValue = initialsInput.value;

    const highScoreObject = {
        name: initialsValue,
        score: score
    };

    loadScores();
    createHighScoreEl(highScoreObject);

    navigation.classList.add("hidden");
    const backButton = document.createElement("button");
    backButton.textContent = "Go back";
    backButton.classList.add("primary-button");
    scoreContainer.appendChild(backButton);

    backButton.onclick = function() {
        reset();
        backButton.remove();
    }
}

// Reset the quiz
const reset = function() {
    score = 0;
    currentNum = 0;
    seconds = 60;

    scoreContainer.classList.add("hidden");
    quizTitle.classList.remove("hidden");
    quizIntro.classList.remove("hidden");
    navigation.classList.remove("hidden");
    startButton.classList.remove("hidden");

    counter.textContent = "Time: 0";
}

// Submit high score
submitButton.onclick = function(e) {
    // Show alert if the input is empty
    if (initialsInput.value === '') {
        alert("Please enter your initials.");
        return false;
    }
    e.preventDefault();
    initialsContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    highScoreHandler();
    initialsInput.value = '';
}

// Start the quiz
startButton.onclick = function() {
    changeTimer();
    answerContainer.classList.remove("hidden");
    quizTitle.classList.add("hidden");
    quizIntro.classList.add("hidden");
    quizResult.classList.remove("hidden");
    startButton.classList.add("hidden");
    findCorrectAnswer();
}