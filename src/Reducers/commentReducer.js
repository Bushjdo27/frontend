import {ALL_COMMENT , 
    ADD_COMMENT ,
    DELETE_COMMENT ,
    EDIT_COMMENT} from './constanstName';


export const Comment = (state = [] , action)=>{
    switch(action.type){
        case ALL_COMMENT:
            return [
                ...state,
                ...action.payload
            ]
        case ADD_COMMENT:
        return [
            ...state,
            action.payload
        ]

        case EDIT_COMMENT:
            return state.map((comment)=>{
                if(comment.id === action.payload.id){
                    return action.payload
                }
                return comment;
            })

        case DELETE_COMMENT:
            return state.filter((comment)=>{
                return comment.id !== action.payload.id
            })

        default:
            return state;
    }
}