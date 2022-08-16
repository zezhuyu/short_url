import logo from './logo.svg';
import './App.css';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';
import { Space, Input, Button} from '@feb-team/legao-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import {BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { CreateCode, CheckInput} from './create';
import fetchAPI from './store';
import config from './config.json';
import {useState} from 'react';


function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:code" element={<RedirectTo />} />
        </Routes>
      </Router>
    </div>
  );
}


function Home(){
  const [shorturl, setshorturl] = useState("");
  const [err, seterr] = useState("");
  const onKeyEnter = (e) => {
    if(e.keyCode === 13) {
       OnClick();
    }
  }
  const OnClick = async () => {
    setshorturl("");
    seterr("");
    var storeState = false;
    const url = document.getElementById("url").value;
    var keyword = document.getElementById("keyword").value;
    if(CheckInput(seterr)){
      const newkeyword = await fetchAPI(url, null, false, true);
      if(newkeyword !== null && newkeyword !== ""){
        seterr("该网址已存在");
        setshorturl(config.DOMAIN + "/" + newkeyword.code);
        return;
      }
      if(keyword !== ""){
        const newurl = await fetchAPI(null, keyword, false, false);
        if(newurl !== null && newurl !== ""){
          seterr("该自定义网址已存在");
          return;
        }
      }
      if(newkeyword !== null && newkeyword !== "" ){
        keyword = newkeyword.code;
        storeState = true;
        setshorturl(config.DOMAIN + "/" + keyword);
      }
      if(keyword === "" || keyword === null || keyword === undefined){
        keyword = await CreateCode();
        var ifcode = await fetchAPI(null, keyword, false, false);
        while(ifcode !== null && ifcode !== "" && ifcode.url !== undefined){
          keyword = await CreateCode();
          ifcode = await fetchAPI(null, keyword, false, false);
        }
      }
      if(!storeState){
        const result = await fetchAPI(url, keyword, true, false);
        if(result.message !== undefined && result.message === "success"){
          setshorturl(config.DOMAIN + "/" + keyword);
        }
      }
    }
  }
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Space direction="" onKeyDown={onKeyEnter}>
          <Input head="网址" className="flex text-slate-900" clearable size="large" id="url" required />
          <Input head="自定义网址" className="flex text-slate-900" clearable placeholder="optional" size="large" id="keyword" />
          
        </Space>
        <Button onClick={OnClick}>点击保存</Button>
        <span>{err}</span>
        <CopyToClipboard text={shorturl} >
          <span>{shorturl}</span>
        </CopyToClipboard>
        <QRC value={shorturl} size={300} />
      </header>
    </div>
  );
}

const QRC = (input) => {
  if(input.value !== ""){
    return (
      <QRCode value={input.value} size={input.size} />
    );
  }
  return;
}


function RedirectTo() {
  const {code} = useParams();
  var url = "";
  const fetchdata = async () => {
    url = await fetchAPI (null, code, false, false);
    if(url === null || url === ""){
      return window.location.replace(config.DOMAIN);
    }
    return  window.location.replace(url.url);
  }
  fetchdata();
}


export default App;
