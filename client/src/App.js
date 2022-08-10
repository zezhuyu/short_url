import config from './config.json';
import logo from './logo.svg';
import './App.css';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';
import { Space, Input, Button } from '@feb-team/legao-react';
import {Store, CheckURL, GetURL} from './store';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';

var shorturl = "";

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Space direction="">
          <Input head="网址" className="flex text-slate-900" size="large" id="url" required/>
          <Input head="自定义网址" className="flex text-slate-900" clearable placeholder="optional" size="large" id="keyword"/>
          
        </Space>
        <Button onClick={createCode}>点击保存</Button>
        <CopyToClipboard text={shorturl} >
          <span>Copy to clipboard with span</span>
        </CopyToClipboard>
        <QRCode value={shorturl} size={300} />
      </header>
    </div>
  );
}

function createCode() {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const form = /^(?:(http|https):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
  const url = document.getElementById("url").value;
  var keyword = document.getElementById("keyword").value;
  if (url === "") {
    alert("网址不能为空！");
    return;
  }else if (!form.test(url)) {
    alert("网址格式不正确！");
    return;
  }
  else if(keyword.length > config.KEYWORD_LENGTH){
    alert("自定义网址长度不能超过" + config.KEYWORD_LENGTH + "位");
    return;
  }else if(!checkDomain(url)){
    alert("网站被禁止");
    return;
  }
  
  if (keyword === "") {
    for(var i=0; i<config.KEYWORD_LENGTH; i++){
      var index = Math.floor(Math.random()*arr.length);
      keyword += arr[index];
    }
  }
  alert(config.DOMAIN + "/" + keyword);
  shorturl = config.DOMAIN + "/" + keyword;
  
  Store(url, keyword);

}

function checkDomain(url) {
  const domain = url.split("//")[1].split("/")[0];
  if(domain === config.DOMAIN){
    return false;
  }
  for (const i = 0; i < config.BLACK_LIST.length; i++) {
    if (domain.endsWith(config.BLACK_LIST[i])) {
      return false;
    }
  }
  return true;
}

export default App;
