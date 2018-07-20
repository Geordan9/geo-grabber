import React, { Component } from 'react';
import logo from './logo.svg';

import { Button } from 'rmwc/Button';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import TopBar from "./components/TopBar.js";
import Drawer from "./components/Drawer.js";
import { Elevation } from 'rmwc/Elevation';

class App extends Component {
  state = {
    tempOpen: true
  }
  render() {
    return (
      <div>
        <TopBar />
        <Drawer 
        open={this.state.tempOpen}
        onClose={() => this.setState({tempOpen: false})}
        />
        <Grid className="pt4">
          <GridCell className="flex justify-center" span="4"><Button onClick={() => this.setState({tempOpen: true})}>Hello World</Button></GridCell>
          <GridCell className="flex justify-center" span="4"><Elevation z={8}><Button>Hello World</Button></Elevation></GridCell>
          <GridCell className="flex justify-center" span="4"><Button>Hello World</Button></GridCell>
        </Grid>
      </div>
    );
  }
}

export default App;
