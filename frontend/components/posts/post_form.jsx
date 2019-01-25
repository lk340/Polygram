import React from 'react';

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
    formData.append("post[photo]", this.state.photoFile);
    formData.append("post[user_id]", this.state.user_id);

    $.ajax({
      method: "POST",
      url: "/api/posts",
      data: formData,
      contentType: false,
      processData: false,
    }).then(
      response => console.log(response.message),
      errors => console.log(errors.responseJSON)
    );
  }
  
  render() {
    console.log(this.state);

    const preview = this.state.photoURL ? <img src={ this.state.photoURL } /> : null;
    
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="file" onChange={ this.handleFile } />
          <br/>
          <input type="text" placeholder="Your caption here." onChange={ this.handleChange("caption") } />
          <br/>
          <input type="submit" value="Share" />
        </form>
      </div>
    )
  }
}

// drag image
// import image from local file
// Need to create a button that'll take the user to the page, where they can upload a photo
