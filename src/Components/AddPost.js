import React , {Component} from 'react';
import * as PostActions from './../Actions/postActions';
import serializeForm from 'form-serialize';
import {connect} from 'react-redux';
import Header from './Header';

class AddPost extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: `${Date.now()}`,
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
    handleTitleChange = (e)=>{
        const title = e.target.value;
        this.setState(()=>{
            return{
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

     handleSubmit = (e)=>{
        e.preventDefault();
        const {Title , AuthorName , category , body} = serializeForm(e.target , {hash:true});
        if(Title && AuthorName && category && body){
            this.props.dispatch(PostActions.addPost(this.state));
            this.setState({title:'',body:'',author:'', error:'Success'})
        }else{
           this.setState({error:'Failure'})
        }
        
    }
    render(){
        const {title , body , author,category ,error} = this.state;    
        return (
            <div className="container">
                <Header inAddPost={true}/>
            <div className="Add-Post">
                <h2 className="heading-2">Create Post</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore expedita possimus, hic dolor suscipit consectetur distinctio modi ducimus, praesentium beatae rem? Vitae eius necessitatibus officia ducimus, labore dolorum ratione accusamus.</p>
                
                <form action="" onSubmit={this.handleSubmit} className="form">
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
                    <button className="btn btn-submit">Create</button>

                </form>
                {error && <p className={error}>Add New Post {error} </p>}
                
            </div>
            </div>
        )
    }
}

export default connect()(AddPost);