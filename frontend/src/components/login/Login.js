import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from "material-ui";
import {primaryColor} from "../../styles/colors";
import { updateCredentials, apiAuthenticate } from '../../actions/user-actions';
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'inline-block',
    },
    cardHeader: {
        backgroundColor: primaryColor,
    },
    textField: {
        borderColor: primaryColor,
        color: primaryColor,
    },
};

class Login extends Component {

  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.onUpdateCredentials = this.onUpdateCredentials.bind(this);
  }

  // update local state by user's input
  onUpdateCredentials(event) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.props.onUpdateCredentials(username, password);
  }

  // send login request to api
  authenticate(event) {
    let username = this.props.user.username;
    let password = this.props.user.password;
    this.props.authenticate(username, password);
  }

  render() {
      return (
          <Card style={styles.card}>
              <CardHeader title="Login" style={styles.cardHeader} titleColor="white"/>
              <CardText>
                  <TextField
                      id="username"
                      floatingLabelText="Benutzername"
                      underlineFocusStyle={styles.textField}
                      floatingLabelFocusStyle={styles.textField}
                      onChange={this.onUpdateCredentials}
                  />
                  <br/>
                  <TextField
                      id="password"
                      floatingLabelText="Password"
                      type="password"
                      underlineFocusStyle={styles.textField}
                      floatingLabelFocusStyle={styles.textField}
                      onChange={this.onUpdateCredentials}
                  />
              </CardText>
              <CardActions>
                  <RaisedButton label="OK" primary={true} onClick={this.authenticate} />
              </CardActions>
              
          </Card>
      );
  }
}

// subscribes store to Login.props
const mapStateToProps = state => {
  return {
    user : state.user
  }
}

const mapActionsToProps = {
  authenticate: apiAuthenticate,
  onUpdateCredentials: updateCredentials
};

export default connect(mapStateToProps, mapActionsToProps)(Login);