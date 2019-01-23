import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return event => {
      this.setState({ [field]: event.target.value });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.processForm(this.state);
  }

  render() {
    return (
      <div>
        <h2>{ this.props.formType === "signin" ? "Sign In" : "Sign Up" }</h2>
        
        <form onSubmit={ this.handleSubmit } >
          <label>
            Username:
            <input type="text" value={ this.state.username } onChange={ this.handleChange("username") } />
          </label>

          <br/>
          <br/>

          <label>
            Password:
            <input type="password" value={ this.state.password } onChange={ this.handleChange("password") } />
          </label>

          <br/>
          <br/>

          <label>
            Email:
            <input type="text" value={ this.state.email } onChange={ this.handleChange("email") } />
          </label>

          <br/>
          <br/>

          <input type="submit" value={ this.props.formType === "signin" ? "Sign In" : "Sign Up" } />
        </form>

        <Link to={ this.props.formType === "signin" ? "/signup" : "/signin" }>
          {this.props.formType === "signin" ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    )
  }
}
