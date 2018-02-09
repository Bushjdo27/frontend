import axios from 'axios';
import {ADD_POST , ALL_POST , EDIT_POST , DELETE_POST} from './../Reducers/constanstName'

export const getAllPost = ()=>{
    return async (dispatch)=>{
        const allPost = await Api('get','/posts');
        dispatch({type: ALL_POST , payload: allPost.data});
        return allPost;
    }
}

export const addPost = (post)=>{
    return async (dispatch)=>{
        const addPost = await Api('post','/posts',post);
        dispatch({type: ADD_POST , payload:addPost.data});

    }
}


export const editPost = (post)=>{
    return async (dispatch)=>{
        const editPost = await Api('put',`/posts/${post.id}` , post);
        dispatch({type:EDIT_POST , payload:editPost.data})
        return editPost.data;
    }
}

export const deletePost = (id)=>{
    return async (dispatch)=>{
        const deletePost = await Api('delete' , `/posts/${id}`);
        dispatch({type:DELETE_POST , payload:deletePost.data});
        return deletePost.data;
    }
}
export const upVotePost = (id)=>{
    return async (dispatch)=>{
        const upVotePost = await Api(`post`,`/posts/${id}`,{option:`upVote`});
        console.log(upVotePost);
        dispatch({type:EDIT_POST , payload:upVotePost.data})
        return upVotePost;

    }
}
export const downVotePost = (id)=>{
    return async (dispatch)=>{
        const downVotePost = await Api(`post`,`/posts/${id}`,{option:`downVote`});
        console.log(upVotePost);
        dispatch({type:EDIT_POST , payload:downVotePost.data})
        return downVotePost;

    }
}


const Api = async (method , url , data = {})=>{
    let result = {};
    let config = {
        url:url,
        baseURL:'http://localhost:3001/',
        headers: { 'Authorization': 'whatever-you-want' },
        method: method,
        data:data
    }
    result = await axios(config);
    
    //console.log(result);
    return result;

}

