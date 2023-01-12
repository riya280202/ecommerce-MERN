import { useEffect } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import {Routes, Route } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from "./components/HOC/PrivateRoute"
import { useDispatch, useSelector } from 'react-redux';
import {isUserLoggedIn} from "./actions"

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    
  } , [])

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
