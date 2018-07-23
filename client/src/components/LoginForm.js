import React, { Component } from "react";
import { TextField } from "rmwc/TextField";
import jss from "jss";
import preset from "jss-preset-default"

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
    firstName: "",
    email: "",
    password: ""
  }

  render() {
    return (
      <Card style={{ width: "21rem", alignSelf: "center", marginTop: "64px" }}>
        <div className="flex flex-column m1">
          <TextField className={classes.button} style={{ flexGrow: "1" }} box withTrailingIcon="person" label="Username" />
          { this.props.login ? null : <TextField className={classes.button} style={{ flexGrow: "1" }} box withTrailingIcon="email" label="Email" />}
          <TextField className={classes.button} style={{ flexGrow: "1" }} box withTrailingIcon="lock" label="Password" />
        </div>
        <CardPrimaryAction>
          <CardActions className="flex justify-center">
            <CardActionButtons>
              <CardAction onClick={this.props.create}>
                { this.props.login ? "Login" : "Create Account" }
              </CardAction>
            </CardActionButtons>
          </CardActions>
        </CardPrimaryAction>
      </Card>
    );
  }
}

