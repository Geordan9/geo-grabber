// import React, { Component } from 'react';
// import logo from './logo.svg';

// import { Button } from 'rmwc/Button';
// import { Grid, GridCell, GridInner } from 'rmwc/Grid';
// import TopBar from "./components/TopBar.js";
// import Drawer from "./components/Drawer.js";
// import { Elevation } from 'rmwc/Elevation';

// class App extends Component {
//   state = {
//     tempOpen: true
//   }
//   render() {
//     return (
//       <Router>
//         <div>
//           <TopBar />
//           <Drawer 
//           open={this.state.tempOpen}
//           onClose={() => this.setState({tempOpen: false})}
//           />
//           <Grid className="pt4">
//             <GridCell className="flex justify-center" span="4"><Button onClick={() => this.setState({tempOpen: true})}>Hello World</Button></GridCell>
//             <GridCell className="flex justify-center" span="4"><Elevation z={8}><Button>Hello World</Button></Elevation></GridCell>
//             <GridCell className="flex justify-center" span="4"><Button>Hello World</Button></GridCell>
//           </Grid>
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
    }
  />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

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
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default AuthExample;