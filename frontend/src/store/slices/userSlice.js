import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthStatus } from './authSlice';
import axios from "axios";


export const createUser = createAsyncThunk(
    "user/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post('http://95.31.50.131/api/user/create', payload);
            return res.data;
            
        } catch (error) {
            console.log(error);
            const serializedError = error.toJSON();
            return thunkAPI.rejectWithValue(serializedError);
        }
    },
);

//надо куда-то деть authToken
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post('http://95.31.50.131/api/auth', payload);
            const login = await axios('http://95.31.50.131/api/auth', payload);
            return login.data;
        } catch (error) {
            console.log(error);
            const serializedError = error.toJSON();
            return thunkAPI.rejectWithValue(serializedError);
        }
    }
);

export const updatePasswordUser = createAsyncThunk(
    "user/updatePasswordUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.put(`http://95.31.50.131/api/user/${payload.id}`, payload);
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload; 
};

const userSlise = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        favorite: [],
        isLoading: false,
    },
    reducers: {
        addImageToFavorite: (state, { payload }) => {
            let newFav = [...state.favorite];
            const found = state.favorite.find(({ id }) => id === payload.id);

            if (found) {
                return;
            } else {
                newFav.push(payload)
            }

            state.favorite = newFav;
        }
    },
    extraReducers: (builder) => {
    //     builder.addCase(addImageToFavorite.pending, (state) => {
    //         state.isLoading = true;
    //     });
        builder.addCase(createUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            addCurrentUser(state, { payload });
            setAuthStatus(true); 
    });
        builder.addCase(updatePasswordUser.fulfilled, addCurrentUser);
    //     builder.addCase(addImageToFavorite.rejected, (state) => {
    //         state.isLoading = false;
    //     });

}})

export const { addImageToFavorite } = userSlise.actions;

export default userSlise.reducer;
