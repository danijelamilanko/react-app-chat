import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-chat-58a19.firebaseio.com/'
});

export default instance;
