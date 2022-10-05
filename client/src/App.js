import './App.css';
import { Route } from 'react-router-dom';

import Landing from './components/LandingPage/landing.jsx';
import Activity from './components/activity';
import Home from './components/home';
import Nav from './components/nav';
import Details from './components/details';
// import Error from './components/error';
import bg from "./img/earth.jpg";
import { useState } from 'react';
import About from './components/about';

function App() {

  const [scroll, setScroll] = useState(0);

  const max = document.documentElement.scrollHeight;
  
  const onScroll = () => {
    setScroll((window.scrollY * 1900) / (max - (max / 5)));
  }

  window.addEventListener('scroll', onScroll)

  return (
    <div className="App">
      <img src={bg} className="Bg_img" style={{objectPosition: `50% ${scroll}%`}} alt='Background'/>
        <Route exact path='/'>
          <Landing/>
        </Route>
        {/* <Route path='/home' element={<Nav setSrch={setSrch}/>} >
          <Route path='/home' element={<Home srch={srch} setSrch={setSrch} dtls={dtls} setDtls={setDtls}/>} >
            <Route exact path='/home/details' element={<Details dtls={dtls}/>}/>
          </Route>
          <Route exact path='/home/activity' element={<Activity/>} />
          <Route path='/home/about' element={<About/>}/>
        </Route> */}
        <Route path='/home'>
          <Nav/>
        </Route>
        <Route path='/home/countries'>
          <div className='dtls_home' key={'div_app'}>
            <Home/>
            <Route path='/home/countries/details'>
              <Details/>
            </Route>
          </div>
        </Route>
        {/* <Route path='/home/details'>
          <div className='dtls_home'>
          <Home srch={srch} setSrch={setSrch} dtls={dtls} setDtls={setDtls}/>
          <Details dtls={dtls}/>
          </div>
        </Route> */}
        <Route path='/home/activity'>
          <Activity/>
        </Route>
        <Route path='/home/about'>
          <About/>
        </Route>
        {/* <Route path='*'><Error/></Route> */}
    </div>
  );
}

export default App;
