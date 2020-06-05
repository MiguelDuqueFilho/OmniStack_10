import React from "react";
import { Switch, Route, Redirect } from "react-router";
import MainAdmin from "./MainAdmin";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/admin" component={MainAdmin} />
      {/* <Route path="/users" component={UserCrud} /> */}
      <Redirect fromt="*" to="/admin" />
    </Switch>
  );
}
