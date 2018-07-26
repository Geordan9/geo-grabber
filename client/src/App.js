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
import axios from 'axios';

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
    tempOpen: false
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
    url: "https://youtube.com/",
    freshUrl: true,
    qualityOptions: [],
    videoSrc: null,
    filters: [],
    presets: [],
    filterTypes: {
      invert: {},
      brighten: {},
      grayScale: {},
      noise: {},
      sobelFilter: {
        width: 0,
        height: 0,
        invert: false
      },
      convFilter: {
        width: 0,
        height: 0,
        kernel: [],
        divisor: 9,
        bias: 0,
        count: 1
      },
      multiFilter: {
        width: 0,
        filterType: 0,
        mag: 0,
        multiplier: 1,
        adjacent: false
      },
      sunset: {
        width: 0
      },
      analogTV: {
        width: 0
      },
      emboss: {
        width: 0
      },
      blur: {
        width: 0,
        height: 0
      },
      sharpen: {
        width: 0,
        height: 0
      },
      strongSharpen: {
        width: 0,
        height: 0
      },
      clarity: {
        width: 0,
        height: 0
      },
      goodMorning: {
        width: 0,
        height: 0
      },
      acid: {
        width: 0,
        height: 0
      },
      urple: {
        width: 0,
        height: 0
      },
      forest: {
        width: 0
      },
      romance: {
        width: 0
      },
      hippo: {
        width: 0
      },
      longhorn: {
        width: 0
      },
      underground: {
        width: 0
      },
      rooster: {
        width: 0
      },
      mist: {
        width: 0
      },
      tingle: {
        width: 0
      },
      bacteria: {
        width: 0
      },
      dewdrops: {
        width: 0,
        height: 0
      },
      destruction: {
        width: 0,
        height: 0
      },
      hulk: {
        width: 0
      },
      ghost: {
        width: 0
      },
      twisted: {
        width: 0
      },
      security: {
        width: 0
      }
    }
  }

  constructor(props) {
    super(props);
    this.videoPlayer = React.createRef();
    this.videoPlayer2 = React.createRef();
    this.c1 = React.createRef();
    this.c2 = React.createRef();
  }

  componentDidMount() {
    let processor = {};

    const comp = this;

    processor.doLoad = function () {
            this.video = comp.videoPlayer.current;
            this.video2 = comp.videoPlayer2.current;
            this.c1 = comp.c1.current;
            this.ctx1 = this.c1.getContext('2d');
            this.c2 = comp.c2.current;
            this.ctx2 = this.c2.getContext('2d');
            let self = this;
            this.video.addEventListener('play', () => {
                self.width = self.video.videoWidth;
                self.height = self.video.videoHeight;
                self.c1.width = self.video.videoWidth;
                self.c1.height = self.video.videoHeight;
                self.c2.width = self.video.videoWidth;
                self.c2.height = self.video.videoHeight;
                self.video2.srcObject = self.c2.captureStream();
                self.timerCallback();
            }, false);
        },
        processor.timerCallback = function () {
            if (this.video.paused || this.video.ended) {
                return;
            }
            this.computeFrame();
            let self = this;
            setTimeout(() => {
                self.timerCallback();
            }, 0);
        },
        processor.computeFrame = function () {
            this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
            let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
            // web-dsp stuff
            for (let filter of comp.state.filters){
              const options = [];
              const filterOptions = comp.state.filterTypes[filter];
              for(let key in filterOptions) {
                options.push(filterOptions[key]);
              }
              frame.data.set(window.webdsp[filter](frame.data, ...options));
            }
            let l = frame.data.length / 4;

            for (let i = 0; i < l; i++) {
                let r = frame.data[i * 4];
                let g = frame.data[i * 4 + 1];
                let b = frame.data[i * 4 + 2];
                let a = frame.data[i * 4 + 3];
            }
            this.ctx2.putImageData(frame, 0, 0);
            return;
        }

      processor.doLoad();

      axios.get(`/api/getpresets/${sessionStorage.getItem("id")}`)
      .then(res => {
        this.setState({presets: res.data});
      });
      
  }

  handleSearchInput = (event) => {
    this.setState({
      url: event.target.value,
      freshUrl: true
    });
  }

  handleKeyPress = (e) => {
    if (e.key !== 'Enter' || !this.state.freshUrl) return;
    axios.post("/api/geturls", {url: this.state.url})
    .then(res => {
      const urlData = res.data;
      const qualityArray = [];
      urlData.adaptiveURLs.map((item, index) => {
        if (!item.quality_label) return;
        const name = item.quality_label.replace("p60", 'p 60fps') + ` ${item.type.split("/")[1]}`;
        qualityArray.push({
          label: name,
          value: item.url
        });
      });
      
      this.setState({
        freshUrl: false,
        qualityOptions: qualityArray
      });
    });
  }

  handleQualityChange = (e) => {
    if (e.target.value == "Quality") {
      this.setState({videoSrc: ""});
      return;
    }
    const url = e.target.value;
    axios.post("/api/sendurl", {url})
    .then(res => {
      this.setState({videoSrc: `/api/stream/${res.data}`});
    });
  }

  handleFilterClick = (e) => {
    const filter = e.target.value;
    if (filter !== "clear")
    {
      this.setState(prevState => ({
        filters: [...prevState.filters, filter]
      }));
    }
    else{
      this.setState({ filters: [] });
    }
  }

  handleOptionChange = (option, type, value) => {
    const options = Object.assign({}, this.state.filterTypes);
    options[type][option] = value;
    this.setState({options});
  }

  saveFilterPreset = () => {
    const preset = {
      options: this.state.filterTypes,
      filters: this.state.filters
    }
    axios.post(`/api/savepreset/${sessionStorage.getItem("id")}`, preset).then(res => {
      console.log(res);
    });
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
            options={this.state.qualityOptions}
            onChange={this.handleQualityChange}
          />
        </GridCell>
        <GridCell className="flex justify-center" desktop="6" tablet="8" phone="4">
        <video ref={this.videoPlayer} style={{height: "100%"}} id="video-player" src={this.state.videoSrc} controls></video>
        </GridCell>
        <GridCell desktop="6" tablet="8" phone="4">
          <canvas ref={this.c1} id="c1" style={{display: "none"}}></canvas>
          <canvas ref={this.c2} id="c2" style={{display: "none"}}></canvas>
          <video ref={this.videoPlayer2} id="video-player-2" controls></video>
        </GridCell>
        <GridCell desktop="12" tablet="8" phone="4">
          <div className="flex flex-column justify-between">
            <div>
              <GridCell desktop="6" tablet="4" phone="2">
                <Button unelevated onClick={this.handleFilterClick} value="clear">Clear Filters</Button>
                <Button unelevated onClick={this.saveFilterPreset}>Save as Preset</Button>
              </GridCell>
              <Select
                className="mt1 ml1"
                outlined={true}
                placeholder="Presets"
                options={this.state.presets}
                onChange={this.handlePresetChange}
              />
            </div>
            {Object.keys(this.state.filterTypes).map(key => {
              const elements = [];
              elements.push(<Button unelevated onClick={this.handleFilterClick} value={key}>{key}</Button>);
              const options = this.state.filterTypes[key];
              if (options){
                for (let option in options){
                  elements.push(<TextField label={option} type={key} value={options[option]} onChange={(e) => this.handleOptionChange(option, key, e.target.value)} style={{width: "140px"}}/>)
                }
              }
              return <div>{elements}</div>;
            })}
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

  auth = () => {
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
        <LoginForm auth={this.auth}/>
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