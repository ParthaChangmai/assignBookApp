import axios from 'axios';

export default axios.create({
	baseURL: 'https://hirebus-backend.herokuapp.com/getData',
});
