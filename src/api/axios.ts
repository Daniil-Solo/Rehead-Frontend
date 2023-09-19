import axios from "axios";


const nodeEnv = process.env.NODE_ENV;
let baseURL = undefined;
if (nodeEnv === 'development')
    baseURL = process.env.REACT_APP_DEVELOP_API_URL;
else if (nodeEnv === 'test')
    baseURL = process.env.REACT_APP_TEST_API_URL;


export default axios.create({
    baseURL: baseURL
});