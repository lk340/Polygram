import { connect } from 'react-redux';
import Footer from './footer';

const msp = (state, ownProps) => {
  return {
    footerPath: ownProps.match.path,
  };
};

export default connect(msp)(Footer);