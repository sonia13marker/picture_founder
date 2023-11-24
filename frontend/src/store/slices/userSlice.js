import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthStatus } from './authSlice';
import axios from "axios";

const setUserId = (state, action) => {
    state.UserID = action.payload;
  };

export const getImages = createAsyncThunk(
    "user/getImages",
    async (payload, thunkAPI) => {
      try {
        const res = await axios.get(`http://95.31.50.131/api/user/${payload.id}/images`);
  
        // Возвращаем полученные данные
        return res.data;
      } catch (error) {
        console.log(error);
  
        // Возвращаем сериализованную ошибку для обработки
        const serializedError = error.toJSON();
        return thunkAPI.rejectWithValue(serializedError);
      }
    }
  );

export const createUser = createAsyncThunk(
    "user/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post('http://95.31.50.131/api/user/create', payload);
            const UserID = res.data.UserID;
            thunkAPI.dispatch(setUserID(UserID));
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
        images: [],
        UserId: null,
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
        }, 
        setUserID: (state, action) => {
            state.userId = action.payload;
          },
    },
    extraReducers: (builder) => {
       // builder.addCase(createUser.fulfilled, addCurrentUser);
       builder.addCase(createUser.fulfilled, (state, { payload }) => {
        addCurrentUser(state, { payload });
        setAuthStatus(true);
        state.userId = payload.id; // Добавьте эту строку
      });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            addCurrentUser(state, { payload });
            setAuthStatus(true); 
    });
        builder.addCase(updatePasswordUser.fulfilled, addCurrentUser);
    //     builder.addCase(addImageToFavorite.rejected, (state) => {
    //         state.isLoading = false;
    //     });
    builder
      .addCase(getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.images = action.payload; // Обновляем состояние с полученными картинками
        state.isLoading = false;
      })
      .addCase(getImages.rejected, (state) => {
        state.isLoading = false;
      });

}})


export const selectUserID = (state) => state.user.userID;

export const { addImageToFavorite, setUserID } = userSlise.actions;

export default userSlise.reducer;
