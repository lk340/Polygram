import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

import GreetingContainer from './greeting_container';
import SignInFormContainer from './sign_in_form_container';
import SignUpFormContainer from './sign_up_form_container';
import { AuthRoute } from '../utils/route_util';

import NavbarContainer from './posts/navbar_container';
// import Footer from './footer/footer';
import PostFormContainer from './posts/post_form_container';
import Uploadbar from './upload_bar/upload_bar';
import FooterContainer from './footer/footer_container';
import PostIndexContainer from './posts/post_index_container';
import UserProfileContainer from './user_profile/user_profile_container';
import UserPostsContainer from './user_profile/user_posts_container';
import UserProfileMasterContainer from './user_profile/user_profile_master_container'
import EditProfileContainer from './user_profile/edit_profile_container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUpdate(prevProps) {
    // Updates the app component when changing pages
    if (this.props.path !== prevProps.path) {
      if (document.documentElement.scrollTop !== 0) {
        window.scrollTo(0, -document.documentElement.scrollTop);
      }
      this.props.fetchUsers();
    }
  }
  
  render() {
    // console.log(window.scrollY);

    // if ( window.scrollY > 200 ) {
    //   console.log(document.getElementById("navbar-container"));
    // }

    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.body.scrollTop > 64 || document.documentElement.scrollTop > 64) {
        document.getElementById("navbar-cont").classList.remove("navbar-container");
        document.getElementById("navbar-cont").classList.add("navbar-container-resize");

        document.getElementById("navbar").classList.remove("navbar");
        document.getElementById("navbar").classList.add("navbar-resize");

        document.getElementById("nav-div").classList.remove("navbar-divider");
        document.getElementById("nav-div").classList.add("navbar-divider-resize");

        document.getElementById("nav-logo").classList.remove("navbar-logo");
        document.getElementById("nav-logo").classList.add("navbar-logo-resize");

        document.getElementById("search-dropdown").classList.remove("search-dropdown-square");
        document.getElementById("search-dropdown").classList.add("search-dropdown-square-hover");

        // document.getElementById("search-dropdown-square").classList.remove("search-dropdown-square");
        // document.getElementById("search-dropdown-square").classList.add("search-dropdown-square-hover");
      }
      else if (document.body.scrollTop <= 64 || document.documentElement.scrollTop <= 64) {
        document.getElementById("navbar-cont").classList.remove("navbar-container-resize");
        document.getElementById("navbar-cont").classList.add("navbar-container");

        document.getElementById("navbar").classList.remove("navbar-resize");
        document.getElementById("navbar").classList.add("navbar");

        document.getElementById("nav-div").classList.remove("navbar-divider-resize");
        document.getElementById("nav-div").classList.add("navbar-divider");

        document.getElementById("nav-logo").classList.remove("navbar-logo-resize");
        document.getElementById("nav-logo").classList.add("navbar-logo");

        document.getElementById("search-dropdown").classList.remove("search-dropdown-square-hover");
        document.getElementById("search-dropdown").classList.add("search-dropdown-square");

        // document.getElementById("search-dropdown-square").classList.remove("search-dropdown-square-hover");
        // document.getElementById("search-dropdown-square").classList.add("search-dropdown-square");
      }
    }
    
    return (
      <div className="app-container">
        <div className="app-body-container">
          <div className="app-main">
  
            <div className="app-body">
              <header>
                <nav>
                  <NavbarContainer path={this.props.url}/>
                  {/* <Route path="/users/:userId" component={NavbarContainer} /> */}
                </nav>
              </header>
  
              <Route exact path="/" component={ PostIndexContainer } />
  
              <div className="app-user-profile">
                {/* <Route exact path={`/users/${this.props.sessionId}`} component={UserProfileMasterContainer} /> */}
                <Route exact path="/users/:userId" component={UserProfileMasterContainer} />
              </div>
              
              <Route exact path="/accounts/edit" component={ EditProfileContainer } />
  
              <AuthRoute exact path="/" component={ SignUpFormContainer } />
              <AuthRoute exact path="/accounts/login" component={ SignInFormContainer } />
              <AuthRoute exact path="/accounts/emailsignup" component={ SignUpFormContainer } />
              {/* <Route exact path="/posts/new" component={ PostFormContainer } /> */}
            </div>
  
            <Uploadbar />
  
          </div>
        </div>
  
        <div className="app-footer">
          <Route path="/" component={ FooterContainer } />
        </div>
        
      </div>
    )
  }
}

// export default () => {
//   return (
//     <div className="app-container">
//       <div className="app-body-container">
//         <div className="app-main">

//           <div className="app-body">
//             <header>
//               <nav>
//                 <NavbarContainer />
//               </nav>
//             </header>

//             <Route exact path="/" component={ PostIndexContainer } />

//             <div className="app-user-profile">
//               <Route exact path="/users/profile" component={UserProfileMasterContainer} />
//             </div>
            
//             <Route exact path="/accounts/edit" component={ EditProfileContainer } />

//             <AuthRoute exact path="/" component={ SignUpFormContainer } />
//             <AuthRoute exact path="/accounts/login" component={ SignInFormContainer } />
//             <AuthRoute exact path="/accounts/emailsignup" component={ SignUpFormContainer } />
//             {/* <Route exact path="/posts/new" component={ PostFormContainer } /> */}
//           </div>

//           <Uploadbar />

//         </div>
//       </div>

//       <div className="app-footer">
//         <Route path="/" component={ FooterContainer } />
//       </div>
      
//     </div>
//   )
// }


            
{/* <UserProfileMasterContainer /> */}
{/* <Route exact path="/demoUser" component={ UserProfileContainer } />
<div className="app-user-profile-splitter">
  <Link to="/"><i className="fas fa-th"></i> POSTS</Link>
  <Link to="/"><i className="fas fa-tv"></i> IGTV</Link>
  <Link to="/"><i className="far fa-bookmark"></i>SAVED</Link>
  <Link to="/"><i className="fal fa-id-card-alt"></i> TAGGED</Link>
</div>
<Route exact path="/demoUser" component={ UserPostsContainer } /> */}