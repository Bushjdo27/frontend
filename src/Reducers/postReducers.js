import {
    ADD_POST,
    ALL_POST,
    EDIT_POST,
    DELETE_POST
} from './constanstName'



export const Post = (state = [] , action)=>{
    switch(action.type){
        case ALL_POST:
        console.log(action);
            return [
                ...state,
                ...action.payload
            ]
        case ADD_POST:
            return [
                ...state,
                action.payload
            ]

        case EDIT_POST:
        return state.map((post)=>{
            if(post.id === action.payload.id){
                return action.payload;
            }
            return post;
        })

        case DELETE_POST:
        return state.filter((post)=>{
            return post.id !== action.payload.id
        })

        default: 
            return state;
    }
}