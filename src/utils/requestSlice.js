import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>{
            return action.payload;
        },
        removeRequests:(state,action)=>{
            const newarray = state.filter(r=> r._id!=action.payload);
            return newarray;
        }
    }
})

export const {addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;