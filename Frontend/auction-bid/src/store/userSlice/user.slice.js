import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{},
        isAuthenticate:false,
    },
    reducers:{
        register(state,action){
            state.user = {},
            state,isAuthenticate = false
        },
        registerSuccess(state,action){
            state.isAuthenticate=true,
            state.user =  action.payload.user
        },
        registerFailed(state,action){
            state.isAuthenticate=false;
            state.user={}
        },
        loginRequest(state,action){
            state.user={};
            state.isAuthenticate=false;
        },
        loginSuccess(state,action){
            state.user=action.payload.user;
            state.isAuthenticate=true;
        },
        loginFailed(state,action){
            state.user={};
            state.isAuthenticate=false;
        }
    }
})