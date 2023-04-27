import config from "../config.js";

var url = "";
var keyword = "";


function CreateCode() {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i=0; i<config.KEYWORD_LENGTH; i++){
      var index = Math.floor(Math.random()*arr.length);
      keyword += arr[index];
    }
    return keyword;
}

function CheckInput(url, keyword = "", errmsg){
    const form = /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
    if (url === "") {
      errmsg = {error: "URL can not be empty!"};
      return false;
    }else if (!form.test(url)) {
        errmsg = {error: "URL format error!"};
      return false;
    }else if(!checkDomain(url)){
        errmsg = {error: "URL domain is not allowed!"};
      return false;
    }else if(keyword.indexOf(config.KEYWORD_BLACK_LIST) !== -1 || keyword.includes('/')){
        errmsg = {error: "Keyword contains illegal characters!"};
        return false;
    }
    return true;
    
  
  }
  
  function checkDomain(url) {
    const domain = url.split("//")[1].split("/")[0];
    if(domain === config.DOMAIN){
      return false;
    }
    for (var i = 0; i < config.BLACK_LIST.length; i++) {
      if (domain.endsWith(config.BLACK_LIST[i])) {
        return false;
      }
    }
    return true;
  }

export { CreateCode, CheckInput };

console.log(CheckInput("https://www.samproduce.com/contact", "contact"))