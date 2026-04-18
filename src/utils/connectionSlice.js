import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connector",
    initialState:[],
    reducers:{
        addConnections:(state,action) => action.payload,
        removeconnections: () => null,
    }
})

export const {addConnections,removeconnections}=connectionSlice.actions;

export default connectionSlice.reducer;