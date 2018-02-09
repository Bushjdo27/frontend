import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Header from './Header';
import InforPost from './InforPost';
import Modal from './Modal';
import sortBy from 'sort-by';
import {sortStateManager , categoryManager} from './../Actions/stateSortAndCategory';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sortBy:'none',
      category: '',
      isShowModal: false,
      typeModal:'',
      currentPost:{}
    }
  }
  componentDidMount(){
    console.log("Fetching data");
    const lastSort = localStorage.getItem("lastSort");
    const lastCategory = localStorage.getItem("lastCategory");
    
    if(lastSort && lastCategory){
        this.setState(()=>({sortBy:lastSort , category:lastCategory}));
    }else if(lastSort && !lastCategory){
      this.setState({sortBy:lastSort})
    }else if (!lastSort && lastCategory){
      this.setState({category:lastCategory})
    }
    
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
      console.log(post);
      this.setState((prevState)=>{
          return{
              isShowModal: !prevState.isShowModal,
              typeModal:'delete',
              currentPost:post
          }
      })
  }

  handleTypeModal = ()=>{
      const {typeModal} = this.state;

      if(typeModal === 'edit'){
          return <Modal data={this.state.currentPost} type='edit' toogleModal = {this.toogleModal} typeModal = 'edit' inMain={true}/>
      }else if(typeModal === 'delete'){
          return <Modal data={this.state.currentPost} type='delete' toogleModal = {this.toogleModal} typeModal = 'delete'/>
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

  handleSelect = (e)=>{
    localStorage.setItem("lastSort",e.target.value)
    this.props.dispatch(sortStateManager(e.target.value))

  }
  handleSelectCategory = (e)=>{
    localStorage.setItem("lastCategory",e.target.value)
    this.props.dispatch(categoryManager(e.target.value))
  }

  renderHelperSort = (Posts)=>{
    if(Posts){
      if(this.props.Sort){
        switch(this.props.Sort){
          case 'Days':
            return Posts.sort(sortBy('timestamp'))
    
          case 'Score':
            return Posts.sort(sortBy('voteScore'))
    
          default:
            return Posts
        }

      }else{
        switch(this.state.sortBy){
          case 'Days':
            return Posts.sort(sortBy('timestamp'))
    
          case 'Score':
            return Posts.sort(sortBy('voteScore'))
    
          default:
            return Posts
        }
      }
      

    }else{
      return this.props.Posts;
    }
    
  }
  renderHelperCategory = (Post)=>{
    console.log(this.state.category)
    if(this.props.Category){
      if(this.props.Category === 'All'){
        return this.props.Posts;
      }else{
        return Post.filter(post=>post.category === this.props.Category)
      }
     

    }else{
      if(this.state.category === 'All'){
        return this.props.Posts;
      }else{
       
        return Post.filter(post=>post.category === this.state.category)
      }
      
    }
    
  }

  handleRenderCategory = (e)=>{
    const target = e.target;
    console.log(target.name);
  }
  render() {
    console.log(this.props);
    const PostsSort = this.renderHelperSort(this.props.Posts)
    const Posts = this.renderHelperCategory(PostsSort);
    return (
      <div>
      <Header />
      <section className="main">
        <div className="choosen">
        <select name="category" value={this.props.Sort ? this.props.Sort : this.state.sortBy}  onChange={this.handleSelect}>
          <option value="none">Sort By</option>
          <option value="Days">Days</option>
          <option value="Score">Score</option>
        </select>

        <select name="category" value={this.props.Category ? this.props.Category : this.state.category}  onChange={this.handleSelectCategory}>
          <option value="All">All</option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </select>
        </div>
      
      
      {Posts.length > 0 ? Posts.map((post)=>{
        const urlDetail = "/"+post.category+"/"+post.id;
          return(
            <div key={post.id} className="content">
            <h2 className="heading-2">{post.title}</h2>
            <p className="content__author">Author : {post.author}</p>
            <p>Published : {moment(post.timestamp).format("MMMM Do YYYY, h:mm a")}</p>
            <InforPost 
              urlDetail = {urlDetail}
              commentCount = {post.commentCount}
              voteScore = {post.voteScore}
              inDetail = {false}
              post = {post}
              handleEdit = {this.handleEdit}
              handleDelete = {this.handleDelete}
              typeModal = {this.state.typeModal}
            />
            <div className="line"></div>
          </div>
          )
        }) : <p>Have No data</p>}
      
      
      </section>

      {this.state.typeModal && this.handleTypeModal()}
        
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  console.log(state)
  return {
    Posts: state.Post,
    Category: state.category,
    Sort: state.sortState
  }
}

export default connect(mapStateToProps)(App);

//import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />