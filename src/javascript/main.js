import '/src/sass/main.css'
import axios from 'axios';

const apiUrl = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy';

const fetchQuestions = async () => {
  try {
    const response = await axios.get(apiUrl);
   response.data.results;
    console.log(response.data.results);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
};

fetchQuestions();

