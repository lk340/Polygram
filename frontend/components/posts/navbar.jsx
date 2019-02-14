import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SearchUsers from './search_users';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      caption: "",
      photoFile: null,
      photoURL: null,
      user_id: this.props.sessionId,
      displayExplore: "hide-explore",
      displaySite: "hide-sites",
      search: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleCompassClick = this.handleCompassClick.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.showExplore = this.showExplore.bind(this);
    this.hideExplore = this.hideExplore.bind(this);
    this.showSites = this.showSites.bind(this);
    this.hideSites = this.hideSites.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }
  
  // componentDidUpdate(prevProps) {
  //   if (prevProps.path !== this.props.path) {
  //     setState({ search: "" });
  //   }
  // }
  
  handleFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoURL: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleChange(field) {
    return event => {
      this.setState({ [field]: event.target.value });
    };
  }
  
  handleModalClick() {
    this.setState({ modalOpen: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false });
    this.setState({ photoFile: null, photoURL: null });
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("post[caption]", this.state.caption);
    if (this.state.photoFile) {
      formData.append("post[photo]", this.state.photoFile);
    }
    formData.append("post[user_id]", this.props.sessionId);

    this.props.createAWS(formData); // thunk action creator
    this.onModalClose();
    this.setState({ photoFile: null, photoURL: null });
  }

  handleCompassClick(event) {
    alert("This is under development!");
  }

  handleHeartClick(event) {
    alert("This is under development!");
  }

  showExplore() {
    this.setState({ displayExplore: "show-explore" });
  }

  hideExplore() {
    this.setState({ displayExplore: "hide-explore" });
  }

  showSites() {
    this.setState({ displaySite: "show-sites" });
  }

  hideSites() {
    this.setState({ displaySite: "hide-sites" });
  }

  handleSearchChange(event) {
    this.setState({ search: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.showPost;
  }

  clearSearch() {
    this.setState({ search: "" });
  }
  
  render() {
    // document.addEventListener("keydown", event => {
    // arrow key hover navigation functionality
    //   if (event.which === )
    // });
    
    const searchDivs = Object.values(this.props.allUsers).map((user, index) => {
      if (user.username.toLowerCase().includes(this.state.search) && this.state.search !== "") {
        return (
          <div className="search-users-component">
            <div className="search-users-container">

              <div><img src={window.userDefaultProfilePicture} alt="profile-picture"/></div>

              <div>
                <div className="search-users-username">
                  <Link to={`/users/${user.id}`} onClick={this.clearSearch}>{user.username}</Link>
                </div>

                <div className="search-users-name">
                  {user.name}
                </div>
              </div>

            </div>
          </div>
        )
        
        // <div key={`search-users-${index}`}><SearchUsers user={user} onClick={this.clearSearch} /></div>
      }
    });
    
    let navbarHeart = "navbar-heart";

    let activityOnPosts = "activity-on-posts";
    
    let navBar;
    if (this.props.currentUser) {
      navBar = (
        <div id="navbar-cont" className="navbar-container">
          <div id="navbar" className="navbar">

            <div className="navbar-polygram-logo">
              <a href="#">
                <i className="fab fa-instagram"></i>
                <div id="nav-div" className="navbar-divider"></div>
                <span id="nav-logo" className="navbar-logo">Polygram</span>
              </a>
            </div>

            {/* <i className="fas fa-search"></i> */}
            {/* <div className="navbar-search-bar"><input type="search" placeholder={`${<i className="fas fa-search"></i>} Search`} onSubmit={this.handleSubmit} /></div> */}
            <div className="navbar-search-bar">
              <img src={window.search} alt="search"/>
              <input type="search" placeholder="Search" onChange={this.handleSearchChange} onSubmit={this.handleSubmit} value={this.state.search} />
              <div className="search-dropdown">
                {searchDivs}
              </div>
            </div>

            <div className="navbar-icons">
              {/* <div><Link to="/posts/new"> {<i className="far fa-plus-square"></i>} </Link></div> */}
              {/* <div onClick={this.handleModalClick}><i className="far fa-plus-square"></i></div>
              <div className="navbar-compass" onClick={this.handleCompassClick}><Link to="/"> {<i className="far fa-compass"></i>} </Link></div>
              <div className={navbarHeart} onClick={this.handleHeartClick}><i className="far fa-heart"></i></div> */}
              <div onClick={this.handleModalClick}><img className="navbar-icons-plus" src={window.plus} alt="plus"/></div>
              {/* <div className="navbar-compass" onClick={this.handleCompassClick}><Link to="/"> {<img className="navbar-icons-compass" src={window.compass} alt="compass"/>} </Link></div> */}
              <div className="navbar-compass" onMouseEnter={this.showExplore} onMouseLeave={this.hideExplore} >
                <img className="navbar-icons-compass" src={window.compass} alt="compass"/>
                <div>
                  <div className="compass-heart-spacer"></div>
                  <a className={this.state.displayExplore} href="http://www.loydkim.com/" target="_blank">Website</a>
                </div>
              </div>
              {/* <div className={navbarHeart} onClick={this.handleHeartClick}><img className="navbar-icons-heart" src={window.heart_white} alt="heart"/></div> */}
              <div className={navbarHeart} onMouseEnter={this.showSites} onMouseLeave={this.hideSites} >
                <img className="navbar-icons-heart" src={window.heart_white} alt="heart"/>
                <div>
                  <div className="compass-heart-spacer"></div>
                  <a className={this.state.displaySite} href="http://www.loydkim.com/PokeBlox/" target="_blank">PokéBlox</a>
                  <a className={this.state.displaySite} href="https://github.com/lk340" target="_blank">GitHub</a>
                  <a className={this.state.displaySite} href="https://www.linkedin.com/in/loyd-k-b58176166/" target="_blank">LinkedIn</a>
                </div>
              </div>
              {/* <div className="navbar-user"><Link to={`/${this.props.currentUser.username}`}>{<i className="far fa-user"></i>}</Link></div> */}
              {/* <div className="navbar-user"><Link to={"/users/profile"}>{<i className="far fa-user"></i>}</Link></div> */}
              {/* <div className="navbar-user"><Link to={`/users/${this.props.sessionId}`}>{<i className="far fa-user"></i>}</Link></div> */}
              <div className="navbar-user"><Link to={`/users/${this.props.sessionId}`}>{<img className="navbar-icons-user" src={window.user} alt="user"/>}</Link></div>
            </div>

          </div>
        </div>
      )
    }

    let postFormSubmitButton = "post-form-submit-button";
    // if the caption is empty and if there is no selected image
    if (this.state.photoURL === null) {
      postFormSubmitButton += " faded-submit";
    }

    const preview = this.state.photoURL ? <img className="post-form-image-preview" src={this.state.photoURL} /> : null;
    let postForm;
    if(this.props.currentUser) {
      postForm = (
        <div className="post-form-container">
          <h2>Polygram</h2>
          <div className="post-form">
            <form className="post-form-file-input-form" onSubmit={this.handleSubmitForm}>
              <label htmlFor="post-form-file-input">Choose An Image</label>
              <input id="post-form-file-input" className="post-form-file-button" type="file" onChange={this.handleFile} />

              <br />
              <br />

              <textarea maxLength="2200" type="text" placeholder="Your caption here." onChange={this.handleChange("caption")} />
              <br />

              <input className={postFormSubmitButton} type="submit" value="share" />

              <br />

              <div className="post-form-preview-divider"></div>
              <h3> Image Preview </h3>
              <h3><i className="fas fa-sort-down"></i></h3>
              {preview}
            </form>
          </div>
        </div>
      )
    }

    const modalStyle = {
      overlay: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5",
        zIndex: 999999,
      },
      content: {
        margin: "auto",
        padding: 0,
        margin: 0,
        border: 0,
        // height: "64%",
        // height: "626px",
        backgroundImage: "linear-gradient(rgb(0, 102, 255), rgb(103, 201, 193))",
        borderRadius: "8px",
        animation: "postFormModal 0.7s linear",
      }
    }

    return (
      <div>
        {navBar}
        
        <div className="navbar-heart-pop-up" >
          <div className="triangle"></div>
          <div className={activityOnPosts}>
            <div>Heart</div>
            <div>Activity On Your Posts</div>
            <div>When someone likes or comments on one of your posts, you'll see it here.</div>
          </div>
        </div>

        {/* { modal } */}
        <Modal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose} style={modalStyle}>
          {postForm}
        </Modal>
      </div>
    )
  }
}