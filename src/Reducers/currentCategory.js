export const category = (state = '' , action)=>{
    if(action.type === 'CATEGORY'){
        console.log(action.category)
        return action.category;
    }
    return state;
   
}