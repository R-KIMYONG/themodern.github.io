import { configureStore,createSlice } from '@reduxjs/toolkit'

let stock = createSlice({
    name: 'stock',
    initialState: [] ,
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
        addItem(state,action){
            let item = state.find((a)=>{return a.id==action.payload.id})
            if(item){
                item.count+=action.payload.count
            }else{
                state.push(action.payload)
            }
        },
        del(state,action){
            return state.filter((item) => item.id !== action.payload);
        },
        total(state){


        }

    }
});

let order = createSlice({
    name : 'order',
    initialState: false,
    reducers:{
        setordermodal(state,action){
            return !action.payload
            
        }
    }
});

let showTerms=createSlice({
    name: 'showTerms',
    initialState: false,
    reducers:{
        setShowTerms(state,action){
           return action.payload
        }
    }
})
export default configureStore({
    reducer: {
        stock : stock.reducer ,
        order : order.reducer,
        showTerms : showTerms.reducer
    }
})

export let {plus,minus,addItem,del} = stock.actions;

export let {setordermodal} = order.actions;

export let {setShowTerms} = showTerms.actions;