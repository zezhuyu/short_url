import axios from "axios"
import config from './config.json';

var data = {
    type: "",
    url: "",
    code: ""
  };
  
  let axiosHeader = {
    headers: {
        'Content-Type': 'application/json',
        'auth-token': config.AUTH_TOKEN,
        "Access-Control-Allow-Origin": "*"
    }
  };

  /*const fetchAPI = async (urlI, codeI, storemode, urlmode) => {
    data.url = urlI;
    data.type = "url";
    const response = await axios.post(`${config.API_URL}/check`, data, axiosHeader);
    return response.data;
    
  };*/

  const fetchAPI = async (urlI, codeI, storemode, urlmode) => {
    var suffix = "";
    if(storemode){
        suffix = "save";
        data.url = urlI;
        data.code = codeI;
    }
    else if(urlmode){
        suffix = "check";
        data.type = "url";
        data.url = urlI;
    }
    else{
        suffix = "check";
        data.type = "code";
        data.code = codeI;
    }
    const result = await axios.post(`${config.API_URL}/${suffix}`, data, axiosHeader);
    return result.data;
  }

export default fetchAPI;