import React from 'react';
import Modal from 'react-modal';

export default class UserPostShowModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal isOpen={ this.props.modalOpen } onRequestClose={ this.props.modalClose } style={ this.props.modalStyle } >
          <div className="photo-modal">
            <div className="photo-modal-picture" onDoubleClick={this.handleHeartClick}>
              <img className="photo-modal-picture-image" src={ this.state.photoURL } alt="photo"/>
            </div>

            <div className="photo-modal-data">
              <div className="photo-modal-username"><div>{ this.props.currentUser.username }</div></div>

              <div className="photo-modal-caption-holder">
                <div className="photo-modal-caption">
                  <div className="photo-modal-caption-caption"><span>{this.props.currentUser.username} </span> {this.state.photoCaption}</div>
                  {/* <div><span>{this.props.currentUser.username} </span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptatibus, aliquid sit porro ex eos unde quaerat perspiciatis id suscipit pariatur laborum facere doloremque vitae reprehenderit alias, harum accusamus fugiat qui quos! Perferendis omnis error magnam officiis iste numquam deserunt quisquam, illum beatae ullam ratione expedita nobis ut dolores possimus. Ipsum enim vero distinctio, aspernatur ad hic facilis velit sint in natus rem adipisci. Natus tempore sed alias possimus molestias iste temporibus consequuntur iusto explicabo. Facilis nulla autem iure, reiciendis, vero animi ad maxime quidem porro mollitia molestias tempore! Tempore officiis maxime hic, commodi nulla corrupti, error ea reprehenderit officia temporibus quia quaerat aut vero minus, exercitationem perferendis. Repellat dolorem culpa voluptatum, illum doloribus harum molestiae adipisci quidem! Necessitatibus nisi culpa asperiores quaerat id perferendis, ipsum, doloribus aliquid animi suscipit similique hic repudiandae, autem modi reprehenderit blanditiis reiciendis totam accusamus? Officiis architecto aut consequuntur odio commodi. Dignissimos, cum. Delectus omnis sit velit ad nulla, autem quos impedit. Mollitia, enim quisquam sit exercitationem ullam autem quos ducimus omnis consectetur quidem nihil asperiores officiis laborum, corporis eligendi architecto obcaecati doloribus. Earum nemo repellat illum deleniti adipisci suscipit explicabo molestias, expedita, blanditiis beatae aliquam iste ab eum labore laborum optio veritatis voluptatibus similique, recusandae iure quae. Velit aut, sequi est accusamus possimus placeat omnis consequuntur eligendi dolores atque, at consequatur sunt quo impedit dolor beatae. Nemo est quos ipsa ratione mollitia quis, molestiae dicta facilis sit molestias culpa odio velit illum eum minus praesentium rem totam maiores adipisci. Obcaecati voluptas deleniti illo vero itaque? Laudantium animi soluta dicta mollitia deserunt distinctio! Modi, amet distinctio! Exercitationem ratione placeat quaerat, non quae molestiae nulla praesentium! Non, quos nam! Sequi ullam quasi enim mollitia voluptatibus. Odio accusantium totam sint placeat adipisci, recusandae cupiditate dolorem corrupti magnam aut. Qui, quam voluptate? Totam, cumque. Repellendus veritatis soluta maxime.</div> */}
                  <div className="photo-modal-caption-comments">
                    {/* <b>[Commenter Username]</b> Comments go here */}
                    <ul>
                      {commentLis}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="photo-modal-data-bottom">
                <div className="photo-modal-like-comment">
                  <div className="user-posts-heart-icon">
                    <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick}><i className="far fa-heart"></i></div>
                    <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick}><i className="fas fa-heart red-heart"></i></div>

                    <div>
                      <label htmlFor="show-post-comment">
                        <i className="far fa-comment"></i>
                      </label>
                    </div>
                  </div>

                  <div className="user-posts-bookmark-icon">
                    <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick}><i className="far fa-bookmark"></i></div>
                    <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick}><i className="fas fa-bookmark"></i></div>
                  </div>
                </div>
                
                <div className="photo-modal-number-likes">
                  {this.state.post_likers.length === 0 ? (<span>Be the first to <span className="first-to-like-this" onClick={this.spanLike}>like this</span></span>) : this.state.post_likers.length === 1 ? `${this.state.post_likers.length} like` : `${this.state.post_likers.length} likes`}
                </div>
                
                {/* <div className="photo-modal-post-date">
                  when it was posted
                </div> */}

                <div className="photo-modal-post-date"><a href="#">{formatTime(this.state.createdAt)}</a></div>

                <div className="photo-modal-comment-and-modal">
                  <div>
                    <form className="photo-modal-comment-form" onSubmit={this.handleCommentSubmit}>
                      <input id="show-post-comment" placeholder="Add a comment..." onChange={this.handleCommentChange} value={this.state.comment}/>
                    </form>
                    <span className="photo-modal-span" onClick={this.modalCeption}>...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
    );
  }
}

// {/* <Modal isOpen={ this.state.modalOpen } onRequestClose={ this.onModalClose } style={ modalStyle } >
//           <div className="photo-modal" onDoubleClick={this.handleHeartClick}>
//             <div className="photo-modal-picture">
//               <img className="photo-modal-picture-image" src={ this.state.photoURL } alt="photo"/>
//             </div>

//             <div className="photo-modal-data">
//               <div className="photo-modal-username"><div>{ this.props.currentUser.username }</div></div>

//               <div className="photo-modal-caption-holder">
//                 <div className="photo-modal-caption">
//                   <div className="photo-modal-caption-caption"><span>{this.props.currentUser.username} </span> {this.state.photoCaption}</div>
//                   {/* <div><span>{this.props.currentUser.username} </span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptatibus, aliquid sit porro ex eos unde quaerat perspiciatis id suscipit pariatur laborum facere doloremque vitae reprehenderit alias, harum accusamus fugiat qui quos! Perferendis omnis error magnam officiis iste numquam deserunt quisquam, illum beatae ullam ratione expedita nobis ut dolores possimus. Ipsum enim vero distinctio, aspernatur ad hic facilis velit sint in natus rem adipisci. Natus tempore sed alias possimus molestias iste temporibus consequuntur iusto explicabo. Facilis nulla autem iure, reiciendis, vero animi ad maxime quidem porro mollitia molestias tempore! Tempore officiis maxime hic, commodi nulla corrupti, error ea reprehenderit officia temporibus quia quaerat aut vero minus, exercitationem perferendis. Repellat dolorem culpa voluptatum, illum doloribus harum molestiae adipisci quidem! Necessitatibus nisi culpa asperiores quaerat id perferendis, ipsum, doloribus aliquid animi suscipit similique hic repudiandae, autem modi reprehenderit blanditiis reiciendis totam accusamus? Officiis architecto aut consequuntur odio commodi. Dignissimos, cum. Delectus omnis sit velit ad nulla, autem quos impedit. Mollitia, enim quisquam sit exercitationem ullam autem quos ducimus omnis consectetur quidem nihil asperiores officiis laborum, corporis eligendi architecto obcaecati doloribus. Earum nemo repellat illum deleniti adipisci suscipit explicabo molestias, expedita, blanditiis beatae aliquam iste ab eum labore laborum optio veritatis voluptatibus similique, recusandae iure quae. Velit aut, sequi est accusamus possimus placeat omnis consequuntur eligendi dolores atque, at consequatur sunt quo impedit dolor beatae. Nemo est quos ipsa ratione mollitia quis, molestiae dicta facilis sit molestias culpa odio velit illum eum minus praesentium rem totam maiores adipisci. Obcaecati voluptas deleniti illo vero itaque? Laudantium animi soluta dicta mollitia deserunt distinctio! Modi, amet distinctio! Exercitationem ratione placeat quaerat, non quae molestiae nulla praesentium! Non, quos nam! Sequi ullam quasi enim mollitia voluptatibus. Odio accusantium totam sint placeat adipisci, recusandae cupiditate dolorem corrupti magnam aut. Qui, quam voluptate? Totam, cumque. Repellendus veritatis soluta maxime.</div> */}
//                   <div className="photo-modal-caption-comments">
//                     {/* <b>[Commenter Username]</b> Comments go here */}
//                     <ul>
//                       {commentLis}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div className="photo-modal-data-bottom">
//                 <div className="photo-modal-like-comment">
//                   <div className="user-posts-heart-icon">
//                     <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick}><i className="far fa-heart"></i></div>
//                     <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick}><i className="fas fa-heart red-heart"></i></div>

//                     <div>
//                       <label htmlFor="show-post-comment">
//                         <i className="far fa-comment"></i>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="user-posts-bookmark-icon">
//                     <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick}><i className="far fa-bookmark"></i></div>
//                     <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick}><i className="fas fa-bookmark"></i></div>
//                   </div>
//                 </div>
                
//                 <div className="photo-modal-number-likes">
//                   {this.state.post_likers.length === 0 ? (<span>Be the first to <span className="first-to-like-this" onClick={this.spanLike}>like this</span></span>) : this.state.post_likers.length === 1 ? `${this.state.post_likers.length} like` : `${this.state.post_likers.length} likes`}
//                 </div>
                
//                 {/* <div className="photo-modal-post-date">
//                   when it was posted
//                 </div> */}

//                 <div className="photo-modal-post-date"><a href="#">{formatTime(this.state.createdAt)}</a></div>

//                 <div className="photo-modal-comment-and-modal">
//                   <div>
//                     <form className="photo-modal-comment-form" onSubmit={this.handleCommentSubmit}>
//                       <input id="show-post-comment" placeholder="Add a comment..." onChange={this.handleCommentChange} value={this.state.comment}/>
//                     </form>
//                     <span className="photo-modal-span" onClick={this.modalCeption}>...</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal> */}