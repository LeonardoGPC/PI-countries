import './App.css';
import { Route } from 'react-router-dom';

import Landing from './components/LandingPage/landing.jsx';
import Activity from './components/Activity_Form/activity.jsx';
import Home from './components/Home/home';
import Nav from './components/Nav/nav';
import Details from './components/Details/details';
import bg from "./img/earth.jpg";
import { useState } from 'react';
import About from './components/About/about.jsx';

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
        <Route path='/home/activity'>
          <Activity/>
        </Route>
        <Route path='/home/about'>
          <About/>
        </Route>
    </div>
  );
}

export default App;
