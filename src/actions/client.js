import axios from 'axios'

export default () => {
    if(localStorage.getItem('token'))
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    const client =  axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_BACKEND_VERSION}`
      })
    return client;
};