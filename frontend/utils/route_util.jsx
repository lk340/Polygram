import React from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { connect} from 'react-redux';

const Auth = ({ component: Component, path, signedIn, exact }) => {
  return (
    <Route path={ path } exact={ exact } render={ (props) => !signedIn ? (<Component { ...props } />) : ( <Redirect to="/" /> )} />
  )
};

const msp = state => {
  return {
    signedIn: Boolean(state.session.id)
  };
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));
