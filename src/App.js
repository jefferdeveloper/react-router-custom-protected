import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import "./style.css";
import Home from "./Home";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import User from "./User";
import GuardSingle from "./GuardSingle";
import Login from "./Login";

import GuardRoute from "./GuardRoute";

/**
 * return props: meta & redirect
 * use meta to make a conditional middleware
 * use redirect to override default redirect when received return false
 * middleware must only return true or false
 */
function middleware(meta, redirect) {
  console.log(meta);
  console.log(redirect);
  return true;
}
function middleware2(meta, redirect) {
  return true;
}

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/user">User</NavLink>
          </li>
          <li>
            <NavLink to="/guard">GuardSingle</NavLink>
          </li>
        </ul>
        <Switch>
          <GuardRoute
            path="/admin"
            component={Admin}
            guards={[middleware, middleware2]}
            meta={{ auth: true }}
            redirect="/login"
          >
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/user" component={User} />
          </GuardRoute>
          <GuardRoute path="/guard" component={GuardSingle} />
          <GuardRoute path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
