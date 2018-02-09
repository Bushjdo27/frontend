import axios from 'axios';
import {ADD_COMMENT , ALL_COMMENT , EDIT_COMMENT , DELETE_COMMENT } from './../Reducers/constanstName'


export const getAllComments = (id)=>{
    return async (dispatch)=>{
            const allComment = await Api('get',`/posts/${id}/comments`);
            dispatch({type: ALL_COMMENT , payload: allComment.data});
            return allComment.data;
    }
}

export const addComment = (comment)=>{
    return async (dispatch)=>{
        const addComment = await Api('post','/comments',comment);
        console.log(addComment.data)
        dispatch({type: ADD_COMMENT , payload:addComment.data});
        
        return addComment.data;
    }
}


export const editComment = (comment)=>{
    return async (dispatch)=>{
        const editComment = await Api('put',`/comments/${comment.id}` , comment);
        dispatch({type:EDIT_COMMENT , payload:editComment.data})
        return editComment.data;
    }
}

export const deleteComment = (id)=>{
    return async (dispatch)=>{
        const deleteComment = await Api('delete' , `/comments/${id}`);
        dispatch({type:DELETE_COMMENT , payload:deleteComment.data});
        return deleteComment.data
    }
}


export const upVoteComment = (id)=>{
    return async (dispatch)=>{
        const upVoteComment = await Api(`post`,`/comments/${id}`,{option:`upVote`});

        console.log(upVoteComment);
        dispatch({type:EDIT_COMMENT , payload:upVoteComment.data})
        return upVoteComment.data;

    }
}
export const downVoteComment = (id)=>{
    return async (dispatch)=>{
        const downVoteComment = await Api(`post`,`/comments/${id}`,{option:`downVote`});
        console.log(downVoteComment);
        dispatch({type:EDIT_COMMENT , payload:downVoteComment.data})
        return downVoteComment.data;

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
    return result;

}