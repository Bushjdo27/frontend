import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import {upVotePost,downVotePost} from './../Actions/postActions';
import {upVoteComment , downVoteComment} from './../Actions/commentActions';
import {connect} from 'react-redux';
class InforPost extends Component{

    constructor(props){
        super(props);
        this.state={
            UpVote: 0,
            DownVote:0,
           
        }
    }

    handleUpVote = ()=>{
        console.log("up vote")
        const {dispatch , inComment} = this.props;
        console.log(inComment)
        if(inComment){
            const {comment , updateUI} = this.props;
            dispatch(upVoteComment(comment.id)).then((upVoteComment)=>{
                console.log("Upvote comment Success . Inforpost")
                updateUI('upVoteComment',upVoteComment)
            })
        }else{
            const {post} = this.props;
            dispatch(upVotePost(post.id)).then((data)=>{
                console.log("UpVote success , in InforPosst")
                console.log(data)
            })
        }
        

    }
    handleDownVote = ()=>{
        const {dispatch , inComment} = this.props;
        if(inComment){
            const {comment , updateUI} = this.props;
            dispatch(downVoteComment(comment.id)).then((downVoteComment)=>{
                console.log("Downvote comment Success . Inforpost")
                updateUI('downVoteComment',downVoteComment)
            })
        }else{
            const {post} = this.props;
            dispatch(downVotePost(post.id)).then((data)=>{
                console.log("UpVote success , in InforPosst")
                console.log(data)
            })
        }
        
    }
    renderButton = ()=>{
        const {inDetail ,inComment} = this.props;

        if(inDetail){
            const {commentCount ,voteScore ,post} = this.props;
            return (
                <div>
                <div className="inforPost">
                    <span>Comment</span>
                    <span>{commentCount}</span>
                    <span>Score</span>
                    <span>{voteScore}</span>
                    <span className="vote" onClick={this.handleUpVote}>UpVote</span>
                    <span className="vote" onClick={this.handleDownVote}>DownVote</span>
                </div>
                    <button onClick={()=>{this.props.handleEdit(post)}} className="btn btn-text edit">Edit</button>
                    <button onClick={()=>{this.props.handleDelete(post)}} className="btn btn-text delete">Delete</button> 
                </div>
            )
        }else if(inComment){
            const {comment ,voteScore} = this.props;
            return (
            <div>
                <div className="inforPost">
                    <span>Score</span>
                    <span>{voteScore}</span>
                    <span className="vote" onClick={this.handleUpVote}>UpVote</span>
                    <span className="vote" onClick={this.handleDownVote}>DownVote</span>
                </div>
                <button onClick={()=>{this.props.handleEdit(comment)}} className="btn btn-text edit">Edit</button>
                <button onClick={()=>{this.props.handleDelete(comment)}} className="btn btn-text delete">Delete</button> 
            </div>
            )
        }else{
            const {urlDetail , commentCount ,voteScore ,post} = this.props;
            return (
                <div>
                <div className="inforPost">
                    <span>Comment</span>
                    <span>{commentCount}</span>
                    <span>Score</span>
                    <span>{voteScore}</span>
                    <span className="vote" onClick={this.handleUpVote}>UpVote</span>
                    <span className="vote" onClick={this.handleDownVote}>DownVote</span>
                </div>
                    <Link to={urlDetail} className="btn btn-text detail">Detail</Link>  
                    <button onClick={()=>{this.props.handleEdit(post)}} className="btn btn-text edit">Edit</button>
                    <button onClick={()=>{this.props.handleDelete(post)}} className="btn btn-text delete">Delete</button>
                </div>
            )
        }
    }

    
    render(){
        return(
            <div>
            {this.renderButton()}
           
            </div>
        )
    }
}


export default connect()(InforPost);