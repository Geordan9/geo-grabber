import React, { Component } from "react";
import { TextField } from "rmwc/TextField";
import jss from "jss";
import preset from "jss-preset-default";
import axios from 'axios';

import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "rmwc/Card";

jss.setup(preset())

const styles = {
  "button": {
    "flex-grow": 1,
    "background-color": "white !important",
    "&:hover": {
        "background-color": "white !important"
    },
    "&:before": {
      "background-color": "white !important"
    },
    "&:after": {
      "background-color": "white !important"
    }
  }
}
const { classes } = jss.createStyleSheet(styles).attach()

export class LoginForm extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  }

  login = () => {
    const account = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post("/api/login", account).then(res => {
      if (!res.data) return;
      sessionStorage.setItem("id", res.data);
      this.props.auth();
    });
  }

  create = () => {
    const account = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post("/api/register", account).then(res => {
      if (!res.data) return;
      this.props.auth();
    });
  }

  handleTextChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({[name]: value});
  }

  render() {
    return (
      <Card style={{ width: "21rem", alignSelf: "center", marginTop: "64px" }}>
        <div className="flex flex-column m1">
          <TextField className={classes.button} style={{ flexGrow: "1" }} box withTrailingIcon="person" 
          label="Username" name="username" value={this.state.username} 
          onChange={this.handleTextChange}/>
          <TextField className={classes.button} style={{ flexGrow: "1" }} box withTrailingIcon="lock" 
          label="Password" name="password" value={this.state.password} 
          onChange={this.handleTextChange}/>
        </div>
        <CardPrimaryAction>
          <CardActions className="flex justify-center">
            <CardActionButtons>
              <CardAction onClick={this.login}>
                Login
              </CardAction>
              <CardAction onClick={this.create}>
                Create Account
              </CardAction>
            </CardActionButtons>
          </CardActions>
        </CardPrimaryAction>
      </Card>
    );
  }
}

