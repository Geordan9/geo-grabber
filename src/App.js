import React, { Component } from 'react';
import logo from './logo.svg';

import { Button } from 'rmwc/Button';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';

{/* Standard Grid. For convenience, GridInner is added for you */}
<Grid>
  <GridCell span="4">1</GridCell>
  <GridCell span="4">2</GridCell>
  <GridCell span="4">3</GridCell>
</Grid>

class App extends Component {
  render() {
    return (
      <Grid>
        <GridCell className="flex justify-center" span="4"><Button>Hello World</Button></GridCell>
        <GridCell className="flex justify-center" span="4"><Button>Hello World</Button></GridCell>
        <GridCell className="flex justify-center" span="4"><Button>Hello World</Button></GridCell>
      </Grid>
    );
  }
}

export default App;
