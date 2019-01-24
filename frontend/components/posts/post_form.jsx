import React from 'react';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    const { sessionId } = this.props;
    this.state = { caption: "", image_url: null, user_id: sessionId };

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.currentUser) this.props.posts();
  }

  handleFile(event) {
    this.setState({ image_url: event.currentTarget.files[0] });
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
    formData.append("post[image]", this.state.image_url);
    formData.append("post[user_id]", this.state.user_id);
    
    this.props.create(formData);
  }
  
  render() {
    console.log(this.state);
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
