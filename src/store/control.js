import{createSlice} from '@reduxjs/toolkit'

let stock = createSlice({
    name: 'stock',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ] ,
    reducers : {
        plus(state,action){
            let itemId = action.payload;

            let item = state.find((a)=>{
                return a.id===itemId
            })
            if(item){
                item.count++
            }
        },
        minus(state,action){
            let itemId = action.payload;

            let item = state.find((a)=>{
                return a.id===itemId
            })
            if(item){
                item.count--;
                item.count = Math.max(item.count, 0);
            }
        },
        incart(state,action){
            let cartitem = action.payload
            let item = state.findIndex((a)=>{
                return a.id === cartitem.id
            })
            state.push(action.payload)
        }

    }
});


export default stock
