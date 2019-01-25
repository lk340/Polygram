import React from 'react';
import { Link } from 'react-router-dom';

import Footer from './footer/footer';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "", name: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logInDemoUser = this.logInDemoUser.bind(this);
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

  logInDemoUser(event) {
    event.preventDefault();
    const demo = { username: "demoUser", email: "demoUser@demo", password: "demodemo" };
    this.props.processForm(demo);
  }

  render() {
    // ================================== CREATING ERROR LIS ==================================
    let errors;
    if (this.props.errors.session.length > 0) {
      errors = this.props.errors.session.map((error, index) => {
        return <li key={index}>{error}</li>
      })
    }
    // ================================== CREATING ERROR LIS ==================================

    let sessionFormClass;
    if (this.props.formType === "signin") {
      sessionFormClass = "sign-in-form"
    }
    else {
      sessionFormClass = "sign-up-form"
    }

    let facebook;
    let span;
    if (this.props.formType === "signup") {
      facebook = (
        <div className="sign-up-form-top-half">
          <h2>Sign up to see photos and videos from your friends.</h2>
          {/* <button><a href="https://www.facebook.com/" target="_blank">Log in with Facebook</a></button> */}
          <a href="https://github.com/lk340" target="_blank"><i className="fab fa-github"></i>&nbsp; <span>Check out my Github!</span></a>
          <div>
            <div className="s311c s311c-1"></div>
            <div className="or">OR</div>
            <div className="s311c s311c-2"></div>
          </div>
        </div>
      )

      span = (
        <div className="session-form-span-div">
          <span className="session-form-span">By signing up, you agree to our</span> <a href="#">Terms</a>, <a href="#">Data Policy</a> , and < a href="#" > Cookies Policy</a >.
        </div>
      )
    }

    let facebookTwo;
    if (this.props.formType === "signin") {
      facebookTwo = (
        <div className="sign-in-form-bottom-half">
          <div>
            <div className="s311c s311c-1"></div>
            <div className="or">OR</div>
            <div className="s311c s311c-2"></div>
          </div>
          <a className="facebookTwo-target-blank" href="https://github.com/lk340" target="_blank"><i className="fab fa-github"></i>&nbsp; <span>Check out my Github!</span></a>
          <br />
          <a className="facebookTwo-forgot-password" href="#">Forgot password?</a>
        </div>
      )
    }

    let signUpFormMessage;
    if (this.props.formType === "signup") {
      signUpFormMessage = (
        <div className="signUpFormMessage">
          <span className="session-form-span">By signing up, you agree to our</span> <a href="#">Terms</a>, <a href="#">Data Policy</a>, and <a href="#">Cookies Policy</a>.
        </div>
      )
    }

    let sessionFormContainer = "session-form-container";
    if (this.props.formType === "signup") {
      sessionFormContainer += " signUpFormHeight";
    }
    else {
      sessionFormContainer += " signInFormHeight";
    }


    let sessionFormButton = "session-form-submit-button";
    if ((this.state.email === "" && this.state.username === "") && this.props.formType === "signin") {
      sessionFormButton += " button-fade-out"
    }

    // ================================== DEMO USER LOGIN ==================================
    let demoUser;
    if (this.props.formType === "signin") {
      demoUser = (
        <div>
          <button className="demo-button" onClick={this.logInDemoUser} >Demo User Login</button>
        </div>
      )
    }
    // ================================== DEMO USER LOGIN ==================================

    // ================================== SIGN UP SLASH PAGE IMAGE ==================================
    // if our url is "/", then insert image into sessionFormContainer and css to the "session-form"
    let slashImage;
    let sessionForm = "session-form"
    if (this.props.slash === "/") {
      slashImage = (
        <img className="splashURL" src={window.splashURL} alt="polygram-slash-image" />
      )

      sessionFormContainer = ""
      sessionForm = "slash-image-session-form-css"
    }

    else if (this.props.slash === "/accounts/emailsignup") {
      sessionForm = "emailsignup-session-form"
    }
    // ================================== SIGN UP SLASH PAGE IMAGE ==================================

    // ================================== SIGN UP SPLASH PAGE USERNAME HTML TAG ==================================
    let fullName;
    if (this.props.formType === "signup") {
      fullName = (
        <div>
          <input type="text" value={this.state.full_name} placeholder="Full Name" className="field-input" onChange={this.handleChange("name")} />

          <br />
        </div>
      )
    }
    // ================================== SIGN UP SPLASH PAGE USERNAME HTML TAG ==================================

    return (
      <div>
        <div className="sessionFormUltimateMasterContainer">
          {/* <div id="sign-up-slash-image"> */}
          {slashImage}
          {/* </div> */}

          <div className={sessionFormContainer}>

            <div className={sessionForm}>
              {/* <h2>{this.props.formType === "signin" ? "Sign In" : "Sign Up"}</h2> */}
              <h1>Polygram</h1>

              <div>{facebook}</div>

              <form onSubmit={this.handleSubmit} className={sessionFormClass} >
                <input type="text" value={this.state.email} placeholder="Email" className="field-input" onChange={this.handleChange("email")} required />

                <br />

                {fullName}

                <input type="text" value={this.state.username} placeholder="Username" className="field-input" onChange={this.handleChange("username")} required />

                <br />

                <input type="password" value={this.state.password} placeholder="Password" className="field-input" onChange={this.handleChange("password")} required />

                <br />

                <input type="submit" value={this.props.formType === "signin" ? "Log In" : "Sign Up"} className={sessionFormButton} />

                <div>{demoUser}</div>

                <div> {facebookTwo} </div>
              </form>

              <ul className="session-errors">
                {errors}
              </ul>

              <div>
                {signUpFormMessage}
              </div>
            </div>

            <div className="sign-in-up">
              {this.props.formType === "signin" ? "Don't have an account?" : "Have an account?"} &nbsp;
              <Link to={this.props.formType === "signin" ? "/accounts/emailsignup" : "/accounts/login"}>
                {this.props.formType === "signin" ? "Sign Up" : "Log In"}
              </Link>
            </div>

            <div className="get-the-app">Get the app.</div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}
