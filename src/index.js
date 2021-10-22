import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from 'react-router-dom'
import UserContext from './user-context';
import Home from "./home";
import NavBar from "./nav-bar";
import CreateAccount from "./create-account";
import Login from "./login";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Balance from "./balance";
import AllData from "./all-data";
import 'bootstrap/dist/css/bootstrap.css';

function Spa() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider value={{
        users: [
          {
            name: "abel",
            email: "abel@mit.edu",
            password: "secret",
            balance: 100,
          },
        ],
      }}>
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/create-account/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/balance/" component={Balance} />
          <Route path="/all-data/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  )
}

ReactDOM.render(<Spa />, document.getElementById("root"));
