import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      modalOpen: false,
      caption: "",
      photoFile: null,
      photoURL: null,
      user_id: this.props.sessionId,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.showPost;
  }
  
  render() {
    let navbarHeart = "navbar-heart";

    let activityOnPosts = "activity-on-posts";
    
    let navBar;
    if (this.props.currentUser) {
      navBar = (
        <div className="navbar-container">
          <div className="navbar">

            <div className="navbar-polygram-logo">
              <a href="#">
                <i className="fab fa-instagram"></i>
                <div></div>
                <span className="navbar-logo">Polygram</span>
              </a>
            </div>

            {/* <i className="fas fa-search"></i> */}
            {/* <div className="navbar-search-bar"><input type="search" placeholder={`${<i className="fas fa-search"></i>} Search`} onSubmit={this.handleSubmit} /></div> */}
            <div className="navbar-search-bar"><i className="fas fa-search"></i><input type="search" placeholder="Search" onSubmit={this.handleSubmit} /></div>

            <div className="navbar-icons">
              {/* <div><Link to="/posts/new"> {<i className="far fa-plus-square"></i>} </Link></div> */}
              <div onClick={this.handleModalClick}><i className="far fa-plus-square"></i></div>
              <div className="navbar-compass"><Link to="/"> {<i className="far fa-compass"></i>} </Link></div>
              <div className={navbarHeart}><i className="far fa-heart"></i></div>
              {/* <div className="navbar-user"><Link to={`/${this.props.currentUser.username}`}>{<i className="far fa-user"></i>}</Link></div> */}
              <div className="navbar-user"><Link to={"/users/profile"}>{<i className="far fa-user"></i>}</Link></div>
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