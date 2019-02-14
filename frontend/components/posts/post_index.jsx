import React from 'react';

import { formatTime } from '../../utils/date_util';
import PostIndexPostContainer from './post_index_post_container';

export default class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // timer: 0,
    };
  }
  
  componentDidMount() {
    this.props.users();
    this.props.likes();
    this.props.posts();
    this.props.getComments();
    // this.interval = setInterval(() => this.tick(), 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  
  componentDidUpdate(prevProps) {
    if ((prevProps.allPosts.length !== this.props.allPosts.length) || (prevProps.allComments.length !== this.props.allComments.length)) {
      this.props.getComments();
      this.props.posts();
    }
  }

  // tick() {
  //   this.setState(prevState => ({
  //     timer: prevState.timer + 1
  //   }));
  // }

  handleHeartClick(post) {
    return () => {
      if(!post.likers.includes(this.props.sessionId)) {
        // instantiate a new like object into back-end
        // add my session id to post.likers
        // change heart color to red.
        this.props.likePost({
          user_id: this.props.sessionId,
          post_id: post.id,
        });

        post.likers.push(this.props.sessionId);
      }
      else {
        // delete like object from back-end (somehow gotta find a way to get the like-id)
        // remove my session id from post.likers
        // change heart back to white.
        // this.props.unlikePost(this.props.allLikes[]);
        const likesArr = Object.values(this.props.allLikes);
        likesArr.forEach(like => {
          if (like.user_id === this.props.sessionId) this.props.unlikePost(like.id);
        });
        
        const user_id = post.likers.indexOf(this.props.sessionId);
        post.likers.splice(user_id, 1);
      }
    };
  }

  handleBookmarkClick() {
    if (this.state.bookmarkStatus === "bookmark-show" && this.state.bookmark2Status === "bookmark-hide") {
      this.setState({ bookmarkStatus: "bookmark-hide", bookmark2Status: "bookmark-show" });
    }
    else {
      this.setState({ bookmarkStatus: "bookmark-show", bookmark2Status: "bookmark-hide" });
    }
  }

  handleCommentSubmit(post) {
    return (event) => {
      event.preventDefault();
      this.props.makeComment({
        comment: this.state.comment,
        post_id: post.id,
        user_id: this.props.currentUser.id,
      });
      // this.setState({ comment: "" });
    };
  }
  
  spanLike(post) {
    return this.handleHeartClick(post);
  }

  handleCommentChange(event) {
    this.setState({ comment: event.currentTarget.value });
  }

  handleCommentDelete(commentObject) {
    if (commentObject.user_id === this.props.currentUser.id) {
      return () => {
        this.props.removeComment(commentObject.id);
      };
    }
  }
  
  render() {
    let posts;
    let commentLis;
    // if ((Object.keys(this.props.allUsers).length > 1) && (this.props.currentURL === "/")) {
    if ((this.props.currentUser) && (this.props.currentURL === "/")) {
      posts = this.props.allPosts.map((post, postIndex) => {
        if (this.props.allUsers[post.user_id]) {
          if (post.comment_objects) {
            commentLis = Object.values(post.comment_objects).map((commentObject, commentIndex) => {
              return <li key={`comment-${commentIndex}`}><b>{this.props.allUsers[commentObject.user_id].username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject)}>{commentObject.comment}</span></li>
            });
          }

          return (
            <PostIndexPostContainer key={`index-post-${postIndex}`} index={postIndex} post={post} />
          )
        }
      });
    }

    return (
      <div className="post-index">
        { posts }
      </div>
    );
  }
}
