export const sortStateManager = (sortState) =>{
    console.log(sortState)
    return {
        type: 'SORT_STATE',
        state:sortState
    }
}


export const categoryManager = (category)=>{
    console.log(category)
    return {
        type:'CATEGORY',
        category
    }
}