import React, { createContext, useState } from 'react';
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
import TravelDetails from './components/TravelDetails/TravelDetails';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'mapbox-gl/dist/mapbox-gl.css';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Router>
       <Header/>
         <Switch>
           <Route exact path="/">
             <SliderCarousel/>
           </Route>
           <Route path="/details/:destinationId">
             <TravelDetails/>
           </Route>
           <PrivateRoute path="/search/:travelId">
             <Search/>
           </PrivateRoute>
           <Route path="/login">
             <Login/>
           </Route>
           <Route path="*">
             <NotFound/>
           </Route>
         </Switch>
       </Router>
    </UserContext.Provider>
  );
}

export default App;
