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
    let errors;
    if (this.props.errors.session.length > 0) {
      errors = this.props.errors.session.map((error, index) => {
        return <li key={index}>{ error }</li>
      })
    }

    let sessionFormClass;
    if (this.props.formType === "signin") {
      sessionFormClass = "sign-in-form"
    }
    else {
      sessionFormClass = "sign-up-form"
    }
    
    return (
      <div className="session-form">
        <h2>{ this.props.formType === "signin" ? "Sign In" : "Sign Up" }</h2>
        
        <form onSubmit={ this.handleSubmit } className={ sessionFormClass } >
          <input type="text" value={this.state.email} placeholder="Email" onChange={this.handleChange("email")} />

          <br/>
          <br/>

          <input type="text" value={this.state.username} placeholder="Username" onChange={ this.handleChange("username") } />

          <br/>
          <br/>

          <input type="password" value={ this.state.password } placeholder="Password" onChange={ this.handleChange("password") } />

          <br/>
          <br/>

          <input type="submit" value={ this.props.formType === "signin" ? "Sign In" : "Sign Up" } />
        </form>

        <ul>
          { errors }
        </ul>

        <div>
          { this.props.formType === "signin" ? "Don't have an account?" : "Already have an account?" } &nbsp;
          <Link to={this.props.formType === "signin" ? "/accounts/emailsignup" : "/accounts/login"}>
            {this.props.formType === "signin" ? "Sign Up" : "Log In"}
          </Link>
        </div>
        
      </div>
    )
  }
}
