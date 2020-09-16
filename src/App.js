import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import SliderCarousel from './components/SliderCarousel/SliderCarousel';


function App() {
  return (
    <div >
       <Router>
         <Switch>
           <Route exact path="/">
             <Header/>
             <SliderCarousel/>
           </Route>
           <Route path="*">
             <NotFound/>
           </Route>
         </Switch>
       </Router>
    </div>
  );
}

export default App;
