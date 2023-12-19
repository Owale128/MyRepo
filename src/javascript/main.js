import '/src/sass/main.css'
import axios from 'axios';

const apiUrl = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy';

let currentQuestionIndex = 0;
let questions = [];

const fetchQuestions = async () => {
  try {
    const response = await axios.get(apiUrl);
    questions = response.data.results;
    displayQuestion();
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

fetchQuestions();

const displayQuestion = () => {
  const questionContainer = document.getElementById('question');
  const optionsContainer = document.getElementById('options');
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.innerHTML = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.incorrect_answers.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
    optionsContainer.appendChild(optionElement);
  });

  const correctOptionElement = document.createElement('div');
  correctOptionElement.innerHTML = `<input type="radio" name="option" value="correct"> ${currentQuestion.correct_answer}`;
  optionsContainer.appendChild(correctOptionElement);
}

const nextQuestion = () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  const feedBackContainer = document.getElementById('feedback');
  feedBackContainer.innerHTML = '';
  feedBackContainer.style.display = 'none';

  submitButton.style.display = 'none';

  if (selectedOption) {
    const selectedOptionValue = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feed'; 

    if (selectedOptionValue === 'correct') {
      feedbackElement.innerHTML = `<span style="color: green;"> Correct &#10004;</span>`;
    } else {
      feedbackElement.innerHTML = `<span style="color: red;"> &#10006;</span> Correct answer: ${currentQuestion.correct_answer}`;
    }

    feedBackContainer.appendChild(feedbackElement);

    feedBackContainer.style.display = 'block';

    const nextButton = document.createElement('button');
    nextButton.className = 'btn';
    nextButton.innerHTML = 'Next Question';
    nextButton.addEventListener('click', () => {
    feedBackContainer.style.display = 'none'; 
    submitButton.style.display = 'block'; 
    submitButton.style.marginLeft = '45%'
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      const restartQuiz = confirm('Quiz completed! - Try again?');
      if (restartQuiz) {
        currentQuestionIndex = 0;
        fetchQuestions();
      }
    }
  });

  feedBackContainer.appendChild(nextButton);

} else {
  alert('Please select an option before moving to the next question.');
}
};

const buttonContainer = document.getElementById('submit-container');
const submitButton = document.createElement('button');
submitButton.className = 'btn';
submitButton.innerHTML = 'Submit';
submitButton.addEventListener('click', nextQuestion);
buttonContainer.appendChild(submitButton);
