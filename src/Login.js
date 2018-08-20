import React, { Component } from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import './Login.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserNameChange(e) {
    this.setState({userName: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  render() {
      console.log(this.state);
      return(
        <div className="Login">
          <div className="ui-g">
            <div className="ui-g-12" align="center">
              <h1>Login</h1>
            </div>

            <div className="ui-g-4"></div>
            <div className="ui-g-4">
              <span className="ui-float-label InputField">
                <InputText id="userName" value={this.state.userName} onChange={this.handleUserNameChange} />
                <label htmlFor="userName">Username</label>
              </span>
            </div>
            <div className="ui-g-4"></div>

            <div className="ui-g-4"></div>
            <div className="ui-g-4" >
              <span className="ui-float-label InputField">
                <Password id="password" value={this.state.password} feedback={false} onChange={this.handlePasswordChange} />
                <label htmlFor="password">Password</label>
              </span>
            </div>
            <div className="ui-g-4"></div>

          </div>
        </div>
      );
  }
}

export default Login;
