const questions = [
  {
    text: "Which number is the odd one out?",
    options: ["2", "4", "6", "9"],
    answer: "9"
  },
  {
    text: "Which shape has no corners?",
    options: ["Square", "Triangle", "Circle", "Rectangle"],
    answer: "Circle"
  },
  {
    text: "Which word doesn’t belong?",
    options: ["Apple", "Banana", "Carrot", "Grape"],
    answer: "Carrot"
  },
  {
    text: "What comes next: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "36"],
    answer: "32"
  },
  {
    text: "Which is the mirror image of 'b'?",
    options: ["d", "p", "q", "g"],
    answer: "d"
  }
];

let currentQuestion = 0;
let timeLeft = 60;
let timerInterval;

// Start the quiz
function startQuiz() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestions();
  showQuestion(currentQuestion);
  startTimer();
}

// Load all questions but hide them initially
function loadQuestions() {
  const form = document.getElementById("quizForm");

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question", "hidden", "bg-white", "text-black", "p-4", "rounded", "shadow", "animate-fade-in");
    div.setAttribute("id", `question${index}`);

    div.innerHTML = `<p class="font-semibold mb-2">Q${index + 1}: ${q.text}</p>`;
    q.options.forEach(opt => {
      div.innerHTML += `
        <label class="block mb-1 cursor-pointer">
          <input type="radio" name="q${index}" value="${opt}" class="mr-2" />
          ${opt}
        </label>
      `;
    });

    form.appendChild(div);
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.type = "button";
  nextBtn.onclick = nextQuestion;
  nextBtn.id = "nextBtn";
  nextBtn.className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition";
  form.appendChild(nextBtn);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit Answers";
  submitBtn.type = "button";
  submitBtn.onclick = submitQuiz;
  submitBtn.id = "submitBtn";
  submitBtn.className = "bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-400 transition hidden";
  form.appendChild(submitBtn);
}

// Show one question at a time
function showQuestion(index) {
  document.querySelectorAll(".question").forEach(q => q.classList.add("hidden"));
  document.getElementById(`question${index}`).classList.remove("hidden");

  document.getElementById("nextBtn").classList.toggle("hidden", index === questions.length - 1);
  document.getElementById("submitBtn").classList.toggle("hidden", index !== questions.length - 1);
}

// Move to next question
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  }
}

// Timer countdown
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

// Submit answers and show result
function submitQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  let score = 0;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("scoreText").textContent = `You scored ${score} out of ${questions.length}.`;
}

// Restart the quiz
function restartQuiz() {
  location.rel

