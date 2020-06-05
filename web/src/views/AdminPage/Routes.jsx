import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Home from "../../components/Home/Home";
import UserCrud from "../User/UserCrud";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={UserCrud} />
      <Redirect fromt="*" to="/" />
    </Switch>
  );
}
