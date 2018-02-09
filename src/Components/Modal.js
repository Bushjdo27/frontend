import React , {Component} from 'react';
import * as PostActions from './../Actions/postActions';
import * as CommentActions from './../Actions/commentActions';
import serializeForm from 'form-serialize';
import {connect} from 'react-redux'

class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            timestamp: Date.now(),
            title: '',
            body: '',
            author: '',
            category: '',
            voteScore: 0,
            deleted: false,
            commentCount: 0,
            error:''

        }
    }
    componentDidMount(){
        if(this.props.typeModal === 'edit'){
            const {title , body , author,category ,id} = this.props.data;
            this.setState({title,body,author,category,id});
        }else if(this.props.typeModal === 'edit_comment'){
            console.log(this.props);
            const {body,author,id} = this.props.data;
            this.setState({id,author,body});
        }
        

    }
    handleTitleChange = (e)=>{
        const title = e.target.value;
        this.setState(()=>{
            return{
                id:`${this.props.data.id}`,
                title
            }
        });

    }
    handleAuthorChange = (e)=>{
        const author = e.target.value;
        this.setState(()=>{
            return{
                author
            }
        });
    }
    handleBodyChange = (e)=>{
        const body = e.target.value;
        this.setState(()=>{
            return{
                body
            }
        });
    }
    handleSelect = (e)=>{
        this.setState({category:e.target.value});
    }

    handleEditPost = (e)=>{
        e.preventDefault();
        const {Title , AuthorName , category , body} = serializeForm(e.target , {hash:true});
        if(Title && AuthorName && category && body){
            const postChange = {...this.props.data};
            postChange.title = Title;
            postChange.author = AuthorName;
            postChange.category = category;
            postChange.body = body;
            postChange.timestamp = Date.now();
            console.log(postChange)
            this.props.dispatch(PostActions.editPost(postChange)).then((editPost)=>{
                if(!this.props.inMain){
                    console.log(editPost);
                    this.props.updateUI('edit_post',editPost);
                }
                
            })
            this.setState({title:'',body:'',author:'', error:'Success'})
        }else{
           this.setState({error:'Failure'})
        }
        
    }
    handleSubmitEditComment = (e)=>{
        e.preventDefault();
        const {body} = serializeForm(e.target , {hash:true});
        const commentTemplate = {
            ...this.props.data,
            body
        }
        if(body){
            this.props.dispatch(CommentActions.editComment(commentTemplate)).then((editComment)=>{
                this.props.updateUI('edit_comment',editComment);
                this.setState({title:'',body:'',author:'', error:'Success'})
            });
            
        }else{
           this.setState({error:'Failure'})
        }
    }

    handleDeleteComment = ()=>{
        this.props.dispatch(CommentActions.deleteComment(this.props.data.id)).then((deleteComment)=>{
           this.props.updateUI('delete_comment',deleteComment);
           this.setState({error:'Success'})
        })
    }
    handlDeletePost = ()=>{
        this.props.dispatch(PostActions.deletePost(this.props.data.id)).then((data)=>{
            this.setState({error:'Success'})
        })
    }
    renderForm = ()=>{
        const {title , body , author,category ,error} = this.state;
        const {typeModal ,toogleModal} = this.props;
        if(typeModal === 'edit'){
            return (
                <div className="Add-Post Post-Edit">
                    <h2 className="heading-2">Edit Post</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore expedita possimus, hic dolor suscipit consectetur distinctio modi ducimus, praesentium beatae rem? Vitae eius necessitatibus officia ducimus, labore dolorum ratione accusamus.</p>
                    
                    <form action="" onSubmit={this.handleEditPost} className="form">
                        <input type="text" placeholder="Title Post" name="Title" value={title} onChange={this.handleTitleChange}/>
                        <input type="text" placeholder="Author Name" name="AuthorName" value={author} onChange={this.handleAuthorChange}/>
                        <select name="category" value={category}  onChange={this.handleSelect}>
                            <option value="none">Choose Category</option>
                            <option value="udacity">Udacity</option>
                            <option value="react">React</option>
                            <option value="redux">Redux</option>
                        </select>
                        <textarea name="body" id="" cols="30" rows="10" placeholder="Body Post" value={body} onChange={this.handleBodyChange}>
                        </textarea>
                        <button className="btn btn-submit btn-edit">Edit {error && error}</button>
    
                    </form>
                    {error && <p className={error} onClick={toogleModal}>Edit Post {error} </p>}
                    
                </div>
            )

        }else if(typeModal === 'edit_comment'){
            return (
                <div className="Add-Post Post-Edit">
                    <h2 className="heading-2">Edit {author} Comment</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore expedita possimus, hic dolor suscipit consectetur distinctio modi ducimus, praesentium beatae rem? Vitae eius necessitatibus officia ducimus, labore dolorum ratione accusamus.</p>
                    
                    <form action="" onSubmit={this.handleSubmitEditComment} className="form">
                        <textarea name="body" id="" cols="30" rows="10" placeholder="Body Post" value={body} onChange={this.handleBodyChange}>
                        </textarea>
                        <button className="btn btn-submit btn-edit">Edit {error && error}</button>
    
                    </form>
                    {error && <p className={error} onClick={toogleModal}>Edit Comment {error} </p>}
                    
                </div>
            )
        }else if(typeModal === 'delete_comment'){
            return (
                <div className="Add-Post Post-Edit">
                    <h2 className="heading-2">Delete Comment</h2>
                    <p>Are you sure !!!</p>
                    <button onClick={this.handleDeleteComment} className="btn btn-submit btn-delete">Delete {error ? error : 'now'} !</button>
                    {error && <p className={error} onClick={toogleModal}>Delete comment {error} </p>}
                </div>
            )

        }else if(typeModal === 'delete'){
            return (
                <div className="Add-Post Post-Edit">
                    <h2 className="heading-2">Delete Post</h2>
                    <p>Are you sure !!!</p>
                    <button onClick={this.handlDeletePost} className="btn btn-submit btn-delete">Delete {error ? error : 'now'} !</button>
                    {error && <p className={error} onClick={toogleModal}>Delete Post {error} </p>}
                </div>
            )
        }
        
        
    }
    render(){
        return(
            <div>
            <div className="modal" onClick={this.props.toogleModal}></div>

            {this.props.typeModal && this.renderForm()}
            </div>
           
        )
    }
}

export default connect()(Modal);