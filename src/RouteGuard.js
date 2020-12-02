import React from "react";
import { Route, useHistory } from "react-router-dom";

export default function GuardRoute({
  component: Component,
  children,
  guards,
  meta,
  redirect,
  ...rest
}) {
  const history = useHistory();
  if (guards) {
    // guards.map(guard => {
    //   const res = guard(meta, redirect);
    //   // console.log(res);
    //   if (!res) {
    //     return redirect ? history.push(redirect) : history.push("/");
    //   }
    // });
    for (const guard of guards) {
      const res = guard(meta, redirect);
      // console.log(res);
      if (!res) {
        return redirect ? history.push(redirect) : history.push("/");
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
