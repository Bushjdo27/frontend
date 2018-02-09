import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import serializeForm from 'form-serialize';
import moment from 'moment';
import Header from './Header';
import InforPost from './InforPost';
import Modal from './Modal';
import {getAllComments ,addComment} from './../Actions/commentActions';
import {editPost} from './../Actions/postActions';

class DetailPost extends Component{
    constructor(props){
        super(props);
        this.state = {
          sortBy:'none',
          isShowModal: false,
          typeModal:'',
          currentPost:{},
          currentComment:{},
          allComments: [],
          authorComment:'',
          bodyComment:'',
          error:''
        }
      }
    componentDidMount(){
        const {id,category} = this.props.match.params;
        this.props.dispatch(getAllComments(id)).then((Comments)=>{
            this.setState((prevState)=>{
                return {
                    allComments: [...Comments],
                    currentPost:{...this.props.Posts.filter(post => post.id===id&&post.category===category)[0]}
                }
            })
        })
      }
    handleEdit = (post)=>{
        this.setState((prevState)=>{
            return {
                isShowModal: !prevState.isShowModal,
                typeModal:'edit',
                currentPost:post
            }
        })
      }
    handleDelete = (post)=>{
          this.setState((prevState)=>{
              return{
                  isShowModal: !prevState.isShowModal,
                  typeModal:'delete',
                  currentPost:post
              }
          })
      }

    handleEditComment = (comment)=>{
        this.setState((prevState)=>{
            return{
                isShowModal: !prevState.isShowModal,
                typeModal:'edit_comment',
                currentComment:comment
              }
          })
      }

      handleDeleteComment = (comment)=>{
        this.setState((prevState)=>{
            return{
                isShowModal: !prevState.isShowModal,
                typeModal:'delete_comment',
                currentComment:comment
            }
        })

      }

    handleAddComment = (e)=>{
        e.preventDefault();
        const {author , body} = serializeForm(e.target , {hash:true});
        const {id} = this.props.match.params;
        if(author && body){
            const comment = 
            {
                id: `${Date.now()}`,
                parentId :id,
                timestamp: Date.now(),
                body,
                author,
                voteScore: 0,
                deleted: false,
                parentDeleted: false
            }
            this.props.dispatch(addComment(comment)).then((addComment)=>{
                const postTemp = this.state.currentPost;
                postTemp.commentCount = postTemp.commentCount + 1;
                this.props.dispatch(editPost(postTemp)).then(()=>{
                    this.setState((prevState)=>{
                        return {
                            allComments: [...prevState.allComments , addComment],
                            authorComment:'',
                            bodyComment:''
                        }
                    })
                })
                
            })
        }else{
            this.setState({error:'error'})
        }
    }

    handleAuthorComment = (e)=>{
        this.setState({authorComment: e.target.value ,error:''});
    }
    handleBodyComment = (e)=>{
        this.setState({bodyComment: e.target.value,error:''});
    }
    updateUI = (typeEvent , data)=>{
        switch(typeEvent){
            case 'upVoteComment':
                this.setState((prevState)=>{
                    return {
                        allComments: prevState.allComments.map((comment)=>{
                        if(comment.id === data.id){
                            return data;
                        }
                        return comment;
                        })
                    }
                })
                 break;
            case 'downVoteComment':
                    this.setState((prevState)=>{
                        return {
                            allComments: prevState.allComments.map((comment)=>{
                            if(comment.id === data.id){
                                return data;
                            }
                            return comment;
                        })
                        }
                    })
                    break;
            case 'edit_comment':
                    this.setState((prevState)=>{
                        return {
                            allComments: prevState.allComments.map((comment)=>{
                            if(comment.id === data.id){
                                return data;
                            }
                            return comment;
                        })
                        }
                    })
                    break;
            case 'delete_comment':
                    const postTemp = this.state.currentPost;
                    postTemp.commentCount = postTemp.commentCount - 1;
                    this.props.dispatch(editPost(postTemp)).then(()=>{
                        this.setState((prevState)=>{
                            return {
                                allComments : prevState.allComments.filter(comment=>comment.id!==data.id&&comment.body!==data.body)
                            }
                        })
                    })
                    
                    break;

            case 'edit_post':
                this.props.dispatch(editPost(data)).then((postChanged)=>{
                  
                    this.setState({currentPost: postChanged})
                })
                    break;

                default:
                    break;
            }
        }
        
    handleTypeModal = ()=>{
        const {typeModal} = this.state;
        
        if(typeModal === 'edit'){
            return <Modal data={this.state.currentPost} toogleModal = {this.toogleModal}  typeModal = 'edit' updateUI = {this.updateUI}/>
        }else if(typeModal === 'delete'){
            return <Modal data={this.state.currentPost} toogleModal = {this.toogleModal} typeModal = 'delete' updateUI = {this.updateUI}/>
        }else if(typeModal === 'edit_comment'){
            return <Modal data={this.state.currentComment} toogleModal={this.toogleModal} typeModal = 'edit_comment' updateUI = {this.updateUI}/>
        }else if(typeModal === 'delete_comment'){
            return <Modal data={this.state.currentComment} toogleModal={this.toogleModal} typeModal = 'delete_comment' updateUI = {this.updateUI}/>
        }
    }
    toogleModal = ()=>{
        this.setState((prevState)=>{
            return {
                isShowModal: !prevState.isShowModal,
                typeModal:''
            }
        })
    }

    render(){
        const {category , id} = this.props.match.params;
        const Comments = this.state.allComments.filter(comment => comment.parentId === id);
        const postShowing = this.props.Posts.filter(post => post.id===id&&post.category===category)
        
        return(
            <div>
                <Header />
                <div className="detail-content">
                    {postShowing.length > 0 ? postShowing.map((post)=>{
                        return <div key={post.id} >
                            <h2 className="heading-2">{post.title}</h2>
                            <p>Author : {post.author}</p>
                            <p>Published : {moment(post.timestamp).format("MMMM Do YYYY, h:mm a")}</p>
                            <InforPost 
                            commentCount = {post.commentCount}
                            voteScore = {post.voteScore}
                            inDetail = {true}
                            post = {post}
                            handleEdit = {this.handleEdit}
                            handleDelete = {this.handleDelete}
                            />
                            <div className="detail-body">
                                <div className="small_line"></div>
                                <p>{post.body}</p>
                            </div>

                            
                        </div>

                    }): <p> Post not found ! <Link to="/">Comeback to HomePage</Link>
                        </p>}
                </div>
                {postShowing.length > 0 &&
                    <div className="comment">
                        <h3 className="heading-3">Comment : </h3>

                        {/* {Comments.length > 0 && this.renderCommentHelper(Comments)} */}
                        {Comments.length > 0 && Comments.map((comment,index)=>{
                            return (
                                <div className="comment__content" key={index}>
                                    <h4 className="heading-4">{comment.author}</h4>
                                    <p>{comment.body}</p>
                                    <p className="comment__content-timestamp">{moment(comment.timestamp).format("MMMM Do YYYY, h:mm a")}</p>
                                    <InforPost 
                                    inComment = {true}
                                    comment = {comment}
                                    voteScore = {comment.voteScore}
                                    handleEdit = {this.handleEditComment}
                                    handleDelete = {this.handleDeleteComment}
                                    updateUI = {this.updateUI}
                                    />
                                    <div className="small_line"></div>
                                </div>
                            )
                        })}

                        <form action="" className="form-comment" onSubmit={this.handleAddComment}>
                            <input type="text" name="author" placeholder="Your Name" onChange={this.handleAuthorComment} value={this.state.authorComment}/>
                            {this.state.error && <p style={{fontSize: '1.6rem' , color:'red', fontStyle:'italic'}}>Must enter author name</p>}
                            <input type="text" name="body" id="" placeholder="Leave Comment here" onChange={this.handleBodyComment} value={this.state.bodyComment}/>
                            {this.state.error && <p style={{fontSize: '1.6rem' , color:'red', fontStyle:'italic'}}>Must enter body comment</p>}
                            <button className="btn btn-submit btn-comment">Add Comment</button>
                        </form>
                    </div>
                }

                {this.state.typeModal && this.handleTypeModal()}
                

            </div>
        )
    }
}

const mapStateToProps = (state , ownProps)=>{
    
    return {
        Posts: state.Post,
        Comments: state.Comment
    }
}

export default connect(mapStateToProps)(DetailPost);