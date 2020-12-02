import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function GuardRoute({
  component: Component,
  children,
  guards,
  meta,
  redirect,
  ...rest
}) {
  if (guards) {
    for (const guard of guards) {
      const res = guard(meta, redirect);
      // console.log(res);
      if (!res) {
        return redirect ? <Redirect to={redirect} /> : <Redirect to="/" />;
      }
    }
  }
  // return (
  //   <Route
  //     {...rest}
  //     render={
  //       props =>
  //         isLogin && children ? (
  //           <Component {...props}>{children}</Component> //group route
  //         ) : isLogin && children == null ? (
  //           <Component {...props} /> //single route
  //         ) : (
  //           <Redirect to="/login" />
  //         ) //auth failed
  //     }
  //   />
  // );
  return (
    <Route
      {...rest}
      render={
        props => <Component {...props}>{children}</Component> //group route
      }
    />
  );
}
