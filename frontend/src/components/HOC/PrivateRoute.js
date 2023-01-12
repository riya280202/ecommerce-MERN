import React from "react";
import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({component: Component, ...rest}) => {
//     return <Route {...rest} component={(props) => {
//         const token = window.localStorage.getItem('token');
//         if(token){
//             return <Component{...props} />
//         } else{
//             return <Navigate to= {`/signin`} />
//         }
//     }}  />
// }

const PrivateRoute = ({children}) => {
    const token = window.localStorage.getItem('token');
    if(token){
      return children;
    }else{
      return <Navigate to="/signin" />
    }
  }

export default PrivateRoute;


// function PrivateRoute({ element, path }) {
//     const authed = isauth() // isauth() returns true or false based on localStorage
//     const ele = authed === true ? element : <Navigate to="/Home"  />;
//     return <Route path={path} element={ele} />;
//   }