import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";

function isLogin() {
  return true;
}

const PrivateRoute = ({ component, path, ...rest }) => {
  return isLogin() ? (
    <Route component={component} path={path} {...rest} />
  ) : (
    <Redirect to="/login" {...rest} />
  );
};

const PublicRoute = ({ component, path, ...rest }) => {
  return isLogin() ? (
    <Redirect to="/todos" {...rest} />
  ) : (
    <Route component={component} path={path} {...rest} />
  );
};

function App() {
  return (
    <div className="container">
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/todos" component={TodoList} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </Switch>
    </div>
  );
}

export default App;
