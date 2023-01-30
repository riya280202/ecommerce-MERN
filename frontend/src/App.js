import { useEffect } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import {Routes, Route } from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Products from './containers/Products';
import Orders from './containers/Orders';
import PrivateRoute from "./components/HOC/PrivateRoute"
import { useDispatch, useSelector } from 'react-redux';
import {isUserLoggedIn, getInitialData} from "./actions"
import Category from './containers/Category';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
    
  } , [])

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute> <Products /> </PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /> </PrivateRoute>} />



          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
