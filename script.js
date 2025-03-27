const startBtn = document.getElementById('start-btn');
const quizSection = document.getElementById('quiz-section');
const questionText = document.getElementById('question');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const answers = document.getElementsByName('answer');
const resultSection = document.getElementById('result-section');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
let currentQuestion = 0;
let score = 0;

const questions = [
  {
    question: "1. What does HTTP stand for?",
    answers: ["Hypertext Transfer Protocol", " High Transfer Protocol", "Hyperlink Text Protocol"],
    correctAnswer: 0
  },
  {
    question: "2. What does TCP stand for?",
    answers: ["Transmission Control Protocol", "Transfer Communication Protocol", "Transmission Communication Protocol"],
    correctAnswer: 0
  },
  {
    question: "3. Which of the following is not a network device?",
    answers: ["Router", " Printer", "Switch"],
    correctAnswer: 1
  },

  {
    question: "4. Which protocol is responsible for email transmission?",
    answers: ["HTTP", "SSH", "SMTP"],
    correctAnswer: 2
  },

  {
    question: "5. Which network topology provides the most redundancy?",
    answers: ["Mash ", "Star", "Bus"],
    correctAnswer: 0
  },

  {
    question: "6. Which layer of the OSI model handles data transmission over the physical medium?",
    answers: ["Transport Layer", "Physical Layer", "Data Link Layer"],
    correctAnswer: 1
  }
];

// Function to load the current question and answers
function loadQuestion() {
  const currentQ = questions[currentQuestion];
  questionText.textContent = currentQ.question;
  document.getElementById('ans1').nextElementSibling.textContent = currentQ.answers[0];
  document.getElementById('ans2').nextElementSibling.textContent = currentQ.answers[1];
  document.getElementById('ans3').nextElementSibling.textContent = currentQ.answers[2];
  
  // Reset the selected answer
  answers.forEach(answer => answer.checked = false);
  
  // Manage button visibility
  prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
}

// Function to calculate the score
function calculateScore() {
  const selectedAnswer = Array.from(answers).find(answer => answer.checked);
  if (selectedAnswer) {
    const answerIndex = Array.from(answers).indexOf(selectedAnswer);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      score++;
    }
  }
}

// Start the quiz when the start button is clicked
startBtn.addEventListener('click', () => {
  document.getElementById('start-container').style.display = 'none';
  quizSection.style.display = 'block';
  loadQuestion();
});

// Go to the next question
nextBtn.addEventListener('click', () => {
  calculateScore(); // Check the answer before moving to the next question
  currentQuestion++;
  loadQuestion();
});

// Go to the previous question
prevBtn.addEventListener('click', () => {
  currentQuestion--;
  loadQuestion();
});

// Submit the quiz and show the score
submitBtn.addEventListener('click', () => {
  calculateScore(); // Check the final answer
  
  // Hide quiz section and show result section
  quizSection.style.display = 'none';
  resultSection.style.display = 'block';
  
  // Display the score
  scoreText.textContent = `You scored ${score} out of ${questions.length}!`;
});

// Restart the quiz
restartBtn.addEventListener('click', () => {
  score = 0;
  currentQuestion = 0;
  resultSection.style.display = 'none';
  document.getElementById('start-container').style.display = 'block';
});
