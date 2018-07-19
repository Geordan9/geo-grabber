import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';

class App extends Component {
  render() {
    const drawerSettings = {
      isOpen: true
    }
    return (
      <div className="App">
        <AppBar position="fixed">
          ASdasd
        </AppBar>
      <Drawer
        anchor="right"
        open={drawerSettings.isOpen}>
        <Button>
          test
        </Button>
    </Drawer>
      </div>
    );
  }
}

export default App;
