import config from './config.json';

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

function CheckInput(seterr){
    url = document.getElementById("url").value;
    keyword = document.getElementById("keyword").value;
    const form = /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
    if (url === "") {
      seterr("网址不能为空！");
      return false;
    }else if (!form.test(url)) {
      seterr("网址格式不正确！");
      return false;
    }
    else if(keyword.length > config.KEYWORD_LENGTH){
      seterr("自定义网址长度不能超过" + config.KEYWORD_LENGTH + "位");
      return false;
    }else if(!checkDomain(url)){
      seterr("网站被禁止");
      return false;
    }else if(keyword.indexOf(config.KEYWORD_BLACK_LIST) !== -1){
        seterr("自定义网址不能包含黑名单字符");
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