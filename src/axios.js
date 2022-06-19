import axios from 'axios';

const apiClient = () => {
    const defaultOptions = {
        baseURL: 'http://localhost:5000/api/v1',
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    return axios.create(defaultOptions);
};

export default apiClient();
