import React, { useContext, createContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: window.localStorage.getItem("isAuthenticated"),
  signin(cb) {
    window.localStorage.setItem("isAuthenticated", true);
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    window.localStorage.removeItem("isAuthenticated")
    setTimeout(cb, 100);
  },
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          window.localStorage.getItem("isAuthenticated") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

const AuthProvider = { ProvideAuth, useAuth, PrivateRoute };
export default AuthProvider;