import axios from 'axios'

const production  = 'https://aqueous-ridge-72628.herokuapp.com/api'; // server
const development = 'http://localhost:8080/api';
console.log(process.env.NODE_ENV)

const url = (process.env.NODE_ENV === 'development' ?  development:production);
console.log(url)
export default axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json"
    }
  });