import './App.css';
import React from "react";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import {BrowserRouter as Router, Switch, Route} from  "react-router-dom"
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard';
import { Redirect } from 'react-router-dom';
import Link from 'react-scroll/modules/components/Link';




export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {

  switch (action.type) {
    case "LOGIN":
     
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user:action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
     
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {

   const [state, dispatch] = React.useReducer(reducer, initialState);
   
   React.useEffect(() => {

   

     const user = JSON.parse(localStorage.getItem('user')||null);
     const token = JSON.parse(localStorage.getItem('token')||null);
     if(user && token){
       dispatch({
         type: 'LOGIN',
         payload: {
           user,
           token
         }
       })
     }
   },[])


   
   return (
   <div className="App">


      <AuthContext.Provider
         value={{
         state,
         dispatch
         }}
      >

   <Router >
   
      

   <Route exact path="/">
      <Home/>
   </Route>



   <Route  path="/register">
      <Register/>
   </Route>

   <Route  path="/login">
    <Login/>
   </Route>
   
   <Route  path="/dashboard">
      <Dashboard/>
   </Route>
  </Router>
      

      </AuthContext.Provider>
      </div>
  );
}

export default App;

