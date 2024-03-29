import { createSlice } from "@reduxjs/toolkit";


const cartSlice= createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        //actions
        //function to add items to cart array
        addToCart:(state,action)=>{
            state.push(action.payload)
          },
          //function to remove items from cart array state
          removeFromCart:(state,action)=>{
            return  state.filter(item=>item.id!==action.payload)
          },

          //function to empty cart
          emptycart:(state)=>{
            return state=[]
          }


    }

})

export const {addToCart , removeFromCart ,emptycart} = cartSlice.actions

export default cartSlice.reducer