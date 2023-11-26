import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthStatus } from './authSlice';
import axios from "axios";

// const setUserId = (state, action) => {
//     state.UserID = action.payload;
//   };

export const getImages = createAsyncThunk(
    "user/getImages",
    async (payload, thunkAPI) => {
      try {
        const res = await axios.get(`http://95.31.50.131/api/user/${payload.id}/image`);
        return res.data;
      } catch (error) {
        console.log(error);
  
        // Возвращаем сериализованную ошибку для обработки
        const serializedError = error.toJSON();
        return thunkAPI.rejectWithValue(serializedError);
      }
    }
  );

  const addImage = createAsyncThunk(
    "user/addImage",
    async (payload, thunkAPI) => {
        try {
            const dataOfImage = await axios.post(`http://95.31.50.131/api/user/${payload.id}/image`);
            console.log("dataOfImage ", dataOfImage);
            return dataOfImage;
        } catch (err) {
            console.log(err);
            const serializedError = err.toJSON();
            return thunkAPI.rejectWithValue(serializedError);
        }
    }
  )

export const createUser = createAsyncThunk(
    "user/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post('http://95.31.50.131/api/user/create', payload);
             const UserID = res.data.data.UserID;
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
        currentUser: [],
        favorite: [],
        isLoading: false,
        images: [],
        UserId: null,
    },
    reducers: {
        toggleFavorites: (state, action) => {
            const item = action.payload;
            const index = state.favorite.findIndex((favoriteItem) => favoriteItem.id === item.id);
            if (index === -1) {
              state.favorite.push(item);
            } else {
              state.favorite.splice(index, 1);
            }
          },
          addImageToPage: (state, action) => {
            const img = action.payload;
            state.images.push(img);
          },
          createUserAction: (state, action) => {
            const data = action.payload;
            state.currentUser.push(data);
          },
        setUserID: (state, action) => {
            state.UserId = action.payload;
            console.log("state.UserId success", state.UserId);
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

      builder
      .addCase(addImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.images = action.payload;
        state.isLoading = false;
      })
      .addCase(addImage.rejected, (state) => {
        state.isLoading = false;
      })

}})


export const selectUserID = (state) => state.user.userID;

export const { toggleFavorites, addImageToPage, createUserAction, setUserID } = userSlise.actions;

export default userSlise.reducer;
