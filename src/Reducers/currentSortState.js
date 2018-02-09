export const sortState = (state = '' , action)=>{
    if(action.type === 'SORT_STATE'){
        console.log(action.state)
        return action.state;
    }
    return state;
}