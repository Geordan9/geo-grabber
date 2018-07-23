import React, { Component } from 'react';

import { Button } from 'rmwc/Button';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import TopBar from "./components/TopBar.js";
import Drawer from "./components/Drawer.js";
import { Elevation } from 'rmwc/Elevation';
import { LoginForm } from "./components/LoginForm.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

import { login } from "./API.js";


class App extends Component {
  state = {
    tempOpen: false
  }
  render() {
    return (
      <Router>
      <div>
          <TopBar />
          <div className="flex">
            <div style={{flexGrow: 1}} className="mt4 flex flex-column">
              <LoginForm className="mt4" />
              <Drawer 
              open={this.state.tempOpen}
              onClose={() => this.setState({tempOpen: false})}
              />
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" 
                  openDrawer={() => {
                    this.setState({ tempOpen: true })
                    console.log("SDF");
                  }}
                  component={GridComp} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const GridComp = (props) => {
  return (
    <Grid>
      <GridCell className="flex justify-center" span="4"><Button onClick={props.openDrawer}>Hello World</Button></GridCell>
      <GridCell className="flex justify-center" span="4"><Elevation z={8}><Button>Hello World</Button></Elevation></GridCell>
      <GridCell className="flex justify-center" span="4"><Button>Hello World</Button></GridCell>
    </Grid>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    login(res => {
      this.isAuthenticated = res.data.authed
    });
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props => {
      return fakeAuth.isAuthenticated ? (
        <Component {...props} {...rest} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
    }
  }
  />
  }


class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="pt4">
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from "react-router-dom";

// import { login } from "./API.js";

// ////////////////////////////////////////////////////////////
// // 1. Click the public page
// // 2. Click the protected page
// // 3. Log in
// // 4. Click the back button, note the URL each time

// const AuthExample = () => (
//   <Router>
//     <div>
//       <AuthButton />
//       <ul>
//         <li>
//           <Link to="/public">Public Page</Link>
//         </li>
//         <li>
//           <Link to="/protected">Protected Page</Link>
//         </li>
//       </ul>
//       <Route path="/public" component={Public} />
//       <Route path="/login" component={Login} />
//       <PrivateRoute path="/protected" component={Protected} />
//     </div>
//   </Router>
// );

// const Public = () => <h3>Public</h3>;
// const Protected = () => <h3>Protected</h3>;

// export default AuthExample;