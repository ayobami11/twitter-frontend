import axios from 'axios';

const apiClient = () => {
    const defaultOptions = {
        baseURL: 'https://twitter-backend-poqg.onrender.com/api/v1',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    return axios.create(defaultOptions);
};

export default apiClient();
