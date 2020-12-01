import React from "react";
import { Route, useHistory } from "react-router-dom";

export default function GuardRoute({
  component: Component,
  guards,
  meta,
  redirect,
  ...rest
}) {
  const history = useHistory();
  if (guards) {
    guards.map(guard => {
      const res = guard(meta, redirect);
      // console.log(res);
      if (!res) {
        redirect ? history.push(redirect) : history.push("/");
      }
    });
  }
  return (
    <Component>
      <Route {...rest} />
    </Component>
  );
}
