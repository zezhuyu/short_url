import './App.css';
import '@feb-team/legao-react/dist/styles/css/legao.all.css';
import { Space, Input} from '@feb-team/legao-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import {BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { CreateCode, CheckInput} from './create';
import fetchAPI from './store';
import config from './config.json';
import {useState} from 'react';
import {Helmet} from 'react-helmet';


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
        if(keyword !== ""){
          seterr("This url has been shortened");
        }
        setshorturl(config.DOMAIN + "/" + newkeyword.code);
        return;
      }
      if(keyword !== ""){
        const newurl = await fetchAPI(null, keyword, false, false);
        if(newurl !== null && newurl !== ""){
          seterr("keyword already exists");
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{config.TITEL}</title>
        <meta name="description" content={config.DESCRIPTION}/>
        <link rel="icon" href={config.LOGOPATH} type="image/icon type"></link>
      </Helmet>
      <header className="App-header inset-1.5 bg-current bg-cover bg-no-repeat bg-center" style={{backgroundImage: 'url(' + config.BACKGROUND || null + ')'}} >
        <div className="space"/>
        <Img src={config.LOGOPATH} className="App-logo" alt=''/>
        <h1 className='text-5xl font-serif font-medium tracking-wide leading-loose text-sky-500'>{config.TITEL}</h1>
        <Space direction="" onKeyDown={onKeyEnter} className='grid gap-3 mb-6 md:grid-cols-2'>
          <Input className=" text-slate-900" clearable placeholder="URL(start with http/https)" size="large" id="url" required />
          <Input className=" text-slate-900" clearable placeholder="Keyword(optional)" size="large" id="keyword" />
          
        </Space>
        <button onClick={OnClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>点击保存</button>
        <span className='text-red-500 text-3xl leading-loose'>{err}</span>
        <CopyToClipboard text={shorturl} >
          <span className='text-cyan-500 text-5xl leading-normal'>{shorturl}</span>
        </CopyToClipboard>
        <QRC value={shorturl} size={300}/>
      </header>
      <footer className="md:p-5 text-center bg-gray-700 text-slate-50 inset-x-0 bottom-0">
        <span>Copyright &copy; {new Date().getFullYear()} {config.TITEL} All Rights Reserved.</span>
        <span><br/>Photo by <a href="https://unsplash.com/@omnis23?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pietro Guarino</a> on <a href="https://unsplash.com/s/photos/montain?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
      </footer>
    </div>
  );
}

const QRC = (input) => {
  if(input.value !== ""){
    return (
      <>
      <QRCode value={input.value} size={input.size} />
      <div className="space"/>
      </>
    );
  }
  return;
}

const Img = (input) => {
  if(input.src !== "" || input.src !== null){
    return (
      <img src={input.src} className="App-logo" alt={input.alt}/>
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
