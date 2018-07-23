import React, { Component } from 'react';

import { Button } from 'rmwc/Button';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { TextField } from "rmwc/TextField";
import TopBar from "./components/TopBar.js";
import Drawer from "./components/Drawer.js";
import { Elevation } from 'rmwc/Elevation';
import { LoginForm } from "./components/LoginForm.js";
import { Select } from 'rmwc/Select';
import jss from "jss";
import preset from "jss-preset-default";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

import { login } from "./API.js";

jss.setup(preset())

const styles = {
  "w100": {
    "width": "80%"
  }
}
const { classes } = jss.createStyleSheet(styles).attach()

class App extends Component {
  state = {
    tempOpen: false,
    url: "asdas"
  }

  render() {
    return (
      <Router>
      <div>
          <TopBar />
          <div className="flex">
            <div style={{flexGrow: 1}} className="mt4 flex flex-column">
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
                  component={GridComp} 
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

class GridComp extends Component {
  state = {
    url: "youtube.com/",
    freshUrl: true
  }

  handleSearchInput = (event) => {
    this.setState({ url: event.target.value });
    this.setState({ freshUrl: true })
  }

  handleKeyPress = (e) => {
    if (e.key !== 'Enter' || !this.state.freshUrl) return;
    this.setState({ freshUrl: false })
    
  }

  render() {
    return (
      <Grid style={{width: "90%"}}>
        <GridCell className="flex justify-center" desktop="12" tablet="8" phone="4">
          <TextField onKeyPress={this.handleKeyPress} onChange={this.handleSearchInput} value={this.state.url} className={classes.w100} withLeadingIcon="search" label="Search" />
          <Select
            className="mt1 ml1"
            outlined={true}
            placeholder="Quality"
            options={['Cookies', 'Pizza', 'Icecream']}
          />
        </GridCell>
        <GridCell className="flex justify-center" desktop="6" tablet="8" phone="4">
        <video style={{height: "100%"}} id="video-player" controls></video>
        </GridCell>
        <GridCell desktop="6" tablet="8" phone="4">
          <canvas id="c1" style={{display: "none"}}></canvas>
          <canvas id="c2" style={{display: "none"}}></canvas>
          <video id="video-player-2" controls></video>
        </GridCell>
        <GridCell desktop="12" tablet="8" phone="4">
          <div className="flex justify-between">
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
            <Button unelevated>Unelevated</Button>
          </div>
        </GridCell>
      </Grid>
    );
  }
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
        <LoginForm login={false} create={this.login} />
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