import axios from 'axios';

export default axios.create({
  baseURL: 'https://create-quiz-app.firebaseio.com/',
});
