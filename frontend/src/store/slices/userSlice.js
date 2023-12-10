import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthStatus } from './authSlice';
import axios from "axios";


/* получение src картинки */
export const getSrcImage = createAsyncThunk(
  "user/getImages/getSrcImage",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`http://95.31.50.131/api/user/${payload.id}/image/${payload.imageId}`, {headers:{Authorization: `Bearer ${payload.token}`}});
      console.log("res from get src data", res);
      thunkAPI.dispatch(setImageSRC(res));
      return res;
     

    } catch (err) {
      console.log(err);
    }
  }
)

/* получение картинок */
export const getImages = createAsyncThunk(
    "user/getImages",
    async (payload, thunkAPI) => {
      try {
        console.log('payload from main page', payload);
        const res = await axios.get(`http://95.31.50.131/api/user/${payload.id}/image`, {headers:{Authorization: `Bearer ${payload.token}`}});
        console.log("GET DATA", res.data.images);
        return res.data.images;
      } catch (error) {
        console.log(error);
      }
    }
  );
    /* добавление картинки, когда юзер уже в своем акке */
export const addUserImage = createAsyncThunk(
  "user/addImage",
  async (payload) => {
      try {
        console.log("res data in addImage", payload.id, payload.token, payload.image, payload.imageName, payload.imageTags);

        const res = await axios.post(`http://95.31.50.131/api/user/${payload.id}/image`,
          {headers:{Authorization: `Bearer ${payload.token}`}
        }, payload.image, payload.imageName, payload.imageTags);
        return res;
      } catch (err) {
          console.log(err);
      }
  }
)
    /* удаление картинки */
  export const deleteUserImage = createAsyncThunk(
    "user/deleteImage",
    async (payload, thunkAPI) => {
      try {
        const imageID = payload.id;
        //исправила тут await axios.delete на await axios.get
        const res = await axios.get(`http://95.31.50.131/api/user/${payload.id}/image/${imageID}`);
        console.log("data about deleted image", res);
        thunkAPI.dispatch(deleteImagefromPage(res));
        return res;
      } catch (err) {
          console.log(err);
          const serializedError = err.toJSON();
          return thunkAPI.rejectWithValue(serializedError);
      }
    }
  )

  /* изменение данных о картинке */
  export const changeUserImage = createAsyncThunk(
    "user/changeImage",
    async (payload, thunkAPI) => {

      try {
      const imageID = payload.id;
      //тут только получаем данные о картинке
      // const dataOfImage = await axios.get(`http://95.31.50.131/api/user/${payload.id}/image/${imageID}`);
      // console.log("data about changed image", dataOfImage);
      const changedData = payload;
      const res = await axios.put(`http://95.31.50.131/api/user/${payload.id}/image/${imageID}`, changedData);
      console.log("changed data about image", res)
      //thunkAPI.dispatch(deleteImagefromPage(res));
      return res;
    } catch (err) {
      console.log(err);
      const serializedError = err.toJSON();
      return thunkAPI.rejectWithValue(serializedError);
  } 
  }
  )

  /* получение пользователя по ID */
export const getUser =  createAsyncThunk(
  "user/getUser",
  async (payload, thunkAPI) => {
    try {
      const userData = await axios.get(`http://95.31.50.131/api/user/${payload.id}`);
      return userData;

    } catch (err) {
      console.log(err);
      const serializedError = err.toJSON();
      return thunkAPI.rejectWithValue(serializedError);
    }
  } 
)

  /* создание (регистрация) */
export const createUser = createAsyncThunk(
    "user/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post('http://95.31.50.131/api/auth/regis', payload);
            /* после отправки запроса я получаю данные: email & id,
            записываю их в переменные и передаю текущему юзеру */

             const UserID = res.data.data.UserID;
             console.log("UserID", UserID);
            /* добавление id текущего юзера */
            thunkAPI.dispatch(setUserID(UserID));
            return res.data; 
            
            
        } catch (error) {
            console.log(error);
            const serializedError = error.toJSON();
            return thunkAPI.rejectWithValue(serializedError);
        }
    },
);

/* вход в аккаунт */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      //console.log('login p', payload);
      const res = await axios.post('http://95.31.50.131/api/auth/login', payload);
      /* получаю токен юзера и сохраняю его глобально */
      const userToken = res.data.token;
      console.log("userToken IN USERSLICE", userToken);
      thunkAPI.dispatch(setUserToken(userToken));

      /* получаю ID юзера и сохраняю его глобально */
      const userIdLogin = res.data.userId;
      console.log("userIdLogin IN USERSLICE", userIdLogin);
      thunkAPI.dispatch(setUserID(userIdLogin));

        // const userEmailLogin = res.data.userEmail;
        //       console.log("userEmailLogin login", userEmailLogin);
        //      /* добавление эмейла в текущего юзера */
        //       thunkAPI.dispatch(setCurrentUser(userEmailLogin));
      return res.data;
      
    } catch (error) {
      console.log(error)
      const serializedError = error.toJSON();
      return thunkAPI.rejectWithValue(serializedError);
    }
  }

)

/* обновление пароля */
// export const updatePasswordUser = createAsyncThunk(
//     "user/updatePasswordUser",
//     async (payload, thunkAPI) => {
//         try {
//             const res = await axios.put(`http://95.31.50.131/api/user/${payload.id}`, payload);
//             return res.data;
//         } catch (error) {
//             console.log(error);
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );
export const updatePasswordUser = createAsyncThunk(
  "user/updatePasswordUser",
  async (payload, thunkAPI) => {
      try {
          const res = await axios.put(`http://95.31.50.131/api/user/${payload.id}`);
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
        status: 'idle',
        error: null,
        images: [],
        imageSRC: '',
        UserId: null,
        userToken: null,
    },
    reducers: {
        toggleFavorites: (state, action) => {
            const item = action.payload;
            console.log(item)
            const index = state.favorite.findIndex((favoriteItem) => favoriteItem.id === item.idImage);
            if (index === -1) {
              state.favorite.push(item);
            } else {
              state.favorite.splice(index, 1);
            }
          },
          addImageToPage: (state, action) => {
            //state.images = action.payload;
            state.images.push(action.payload);
            
            // const addImage = action.payload;
            // state.images = {
            //   ...state,
            //   addImage
            // }
            //const imageState = state.images;
            //state.images = Object.values(img);
            // state.images([img]);
            console.log("IMAGE IN ADDIMAGETOPAGE FUNC",  state.images
            //'STATE ', imageState
            );
            
            // state.images.push({img});
          },
          deleteImagefromPage: (state, action) => {
            const image = action.payload;
            const deleteImage = state.images.findIndex((delImage) => delImage === image.id);
            if (deleteImage !== -1) {
              state.images.splice(image.id);
            }
          },
          updateImageInfo: (state, action) => {
            const { id, name, tags } = action.payload;
            const existingImage = state.images.find(image => image.id === id);
            if (existingImage) {
              existingImage.name = name;
              existingImage.tags = tags;
            }
          },
          // changeDataOfImage: (state, action) => {
          //   const currentImage = action.payload;

          // },
            setCurrentUser: (state, action) => {
                const UserEmail = action.payload;
                state.currentUser.push(UserEmail);
                console.log("current user email", UserEmail);
            },
            setUserID: (state, action) => {
            state.UserId = action.payload;
            console.log("UserId success", state.UserId);
            // state.currentUser.push(state.UserId);
            // console.log("CurrentUser + UserId", currentUser);
          },
          setUserToken: (state, action) => {
            state.userToken = action.payload;
            console.log("userToken success", state.userToken)
          },
          setImageSRC: (state, action) => {
            state.imageSRC = action.payload;
          }
    },
    extraReducers: (builder) => {
      builder 
      .addCase(getImages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.images = action.payload; 
        //state.images = state.images.concat(action.payload)
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
      // builder 
      // .addCase(getSrcImage.pending, (state, action) => {
      //   state.status = 'loading'
      // })
      // .addCase(getSrcImage.fulfilled, (state, action) => {
      //   state.status = 'succeeded'
      //   // Add any fetched posts to the array
      //   state.imageSRC = action.payload; 
      // })
      // .addCase(getSrcImage.rejected, (state, action) => {
      //   state.status = 'failed'
      //   state.error = action.error.message
      // });
       builder
       .addCase(createUser.fulfilled, (state, { payload }) => {
        addCurrentUser(state, { payload });
        setAuthStatus(true);
      });
        builder
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            addCurrentUser(state, { payload });
            setAuthStatus(true); 
    });
        builder
        .addCase(updatePasswordUser.fulfilled, addCurrentUser);
      //   builder
      // .addCase(getImages.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getImages.fulfilled, (state, action) => {
      //   state.images = action.payload; 
      //   state.isLoading = false;
      // })
      // .addCase(getImages.rejected, (state) => {
      //   state.isLoading = false;
      // });

      builder
      // .addCase(addUserImage.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(addUserImage.fulfilled, (state, action) => {
        //state.images = action.payload;
        state.images.push(action.payload);
        // state.isLoading = false;
      })
      // .addCase(addUserImage.rejected, (state) => {
      //   state.isLoading = false;
      // })

}})


export const selectUserID = (state) => state.user.userID;


export const { toggleFavorites, addImageToPage, deleteImagefromPage, updateImageInfo, createUserAction, setUserID, setCurrentUser, setUserToken, setImageSRC } = userSlise.actions;

export default userSlise.reducer;
