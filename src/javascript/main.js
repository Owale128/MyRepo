import '/src/sass/main.css'
import axios from 'axios';

const apiUrl = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy';

let currentQuestionIndex = 0;
let questions = [];

const fetchQuestions = async () => {
  try {
    const response = await axios.get(apiUrl);
   questions = response.data.results;
    displayQuestion()
    
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

  currentQuestion.incorrect_answers.forEach((option, index)=>{
  const optionElement = document.createElement('div');
  optionElement.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
  optionsContainer.appendChild(optionElement);
    });
  const correctOptionElement = document.createElement('div');
  correctOptionElement.innerHTML = `<input type="radio" name="option" value="correct">${currentQuestion.correct_answer}`;
  optionsContainer.appendChild(correctOptionElement);
}

const nextQuestion = () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if(selectedOption){
    const selectedOptionValue = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOptionValue === 'correct') {
      alert('Correct!');
    } else {
      alert(`Incorrect! The correct answer is: ${currentQuestion.correct_answer}`);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion()
    } else {
      confirm('Quiz completed! - Try again?');
      currentQuestionIndex = 0;
      fetchQuestions()
    }
  } else {
    alert('Please select an option before moving to the next question.');
  }
}
