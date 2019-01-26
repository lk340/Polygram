import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    const { sessionId } = this.props;
    this.state = { caption: "", photoFile: null, photoURL: null, user_id: sessionId };

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFile(event) {
    // debugger;
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

  handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("post[caption]", this.state.caption);
    if (this.state.photoFile) {
      formData.append("post[photo]", this.state.photoFile);
    }
    formData.append("post[user_id]", this.state.user_id);

    this.props.createAWS(formData); // thunk action creator

    // $.ajax({
    //   method: "POST",
    //   url: "/api/posts",
    //   data: formData,
    //   contentType: false,
    //   processData: false,
    // }).then(
    //   response => console.log(response.message),
    //   errors => console.log(errors.responseJSON)
    // );

  }
  
  render() {
    // console.log(this.state);

    const preview = this.state.photoURL ? <img className="post-form-image-preview" src={ this.state.photoURL } /> : null;
    let postForm;
    if (this.props.currentUser) {
      postForm = (
        <form onSubmit={this.handleSubmit}>
          <input className="post-form-file-button" type="file" onChange={this.handleFile} />
          <br />
          <br />
          {/* <input type="text" placeholder="Your caption here." onChange={this.handleChange("caption")} /> */}
          <textarea maxLength="2200" type="text" placeholder="Your caption here." onChange={this.handleChange("caption")} />
          <br />
          <input className="post-form-submit-button" type="submit" value="share" onClick={ this.postRedirect } />
          <br />
          <div className="post-form-preview-divider"></div>
          <h3> Preview </h3>
          <h3><i className="fas fa-sort-down"></i></h3>
          { preview }
        </form>
      )
    }

    let redirect;
    if (!this.props.currentUser) {
      redirect = <Redirect to="/" />
    }
    
    return (
      <div className="post-form-container">
        <h2>Polygram</h2>
        <div className="post-form">
          { postForm }
          { redirect }
        </div>
      </div>
    )
  }
}

// drag image
// import image from local file
// Need to create a button that'll take the user to the page, where they can upload a photo
