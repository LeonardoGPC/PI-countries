import './App.css';
import { Route, Routes } from 'react-router-dom';

import Landing from './components/landing';
import Activity from './components/activity';
import Home from './components/home';
import Nav from './components/nav';
import Details from './components/details';
import Error from './components/error';
import bg from "./img/earth.jpg";
import { useState } from 'react';
import About from './components/about';

function App() {

  const [srch, setSrch] = useState(false);
  const [dtls, setDtls] = useState(false);

  return (
    <div className="App">
      <img src={bg} className="Bg_img"/>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path='/home' element={<Nav setSrch={setSrch}/>} >
          <Route path='/home' element={<Home srch={srch} setSrch={setSrch} dtls={dtls} setDtls={setDtls}/>} >
            <Route exact path='/home/details' element={<Details dtls={dtls}/>}/>
          </Route>
          <Route exact path='/home/activity' element={<Activity/>} />
          <Route path='/home/about' element={<About/>}/>
        </Route>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
