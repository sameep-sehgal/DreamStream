import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://dream-stream-sameep.herokuapp.com/'
    }
)