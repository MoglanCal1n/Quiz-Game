const questions = [
    {
        question: "Cine a spus primul Te Iubesc",
        answers: [
            {text: "Calin (logic)", correct: true},
            {text: "Anastasia (ilogic)", correct: false},
            {text: "Adrian Iacoban Bass (adica Calin)", correct: false},
            {text: "Nesty", correct: false},
        ]
    } ,
    {
        question: "Care este parfumul care iti place tie asa de mult",
        answers: [
            {text: "Toskovat Age of Innocence", correct: false},
            {text: "Armani Stronger Than You", correct: false},
            {text: "Armani Stronger With You", correct: true},
            {text: "Sauvage (de care purta si iubitu mamei tale)", correct: false},
        ]
    },
    {
        question: "Care a fost primul film la care am fost impreuna",
        answers: [
            {text: "Puss in Buuts", correct: true},
            {text: "Barbie", correct: false},
            {text: "Mica Sirena ", correct: false},
            {text: "Miami Bici", correct: false},
        ]
    },
    {
        question: "Care este adresa mea din buletin!",
        answers: [
            {text: "Camin Economica 1 Clooj", correct: false},
            {text: "Strada Vasile Gemeniuc nr 79", correct: false},
            {text: "Strada Jean Bart", correct: true},
            {text: "Strada Paris 1 (la cat stau pe la tine)", correct: false},
        ]
    },
    {
        question: "Cat de mult te iubesc?",
        answers: [
            {text: "Mult", correct: true},
            {text: "Foarte mult", correct: false},
            {text: "Cel mai mult", correct: false},
            {text: "Te iubesc de mi sar ochii din cap", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Ai ghicit ${score} din cele ${questions.length} intrebari!`;
    nextButton.innerHTML = "Te iubesc mult puiu meu";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();