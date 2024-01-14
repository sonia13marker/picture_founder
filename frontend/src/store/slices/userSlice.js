import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthStatus } from './authSlice';
import axios from "axios";
import { PATH_TO_SERVER } from "../../data/constants";


/* получение картинок */
export const getImages = createAsyncThunk(
    "user/getImages",
    async (payload, thunkAPI) => {
      try {
        const { userId, userToken } = payload; 
        console.log('payload from main page', payload);
        const res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image`, {
          headers: {
            Authorization: 'Bearer ' + userToken,
          }  });
        console.log("GET DATA", res.data.images);
        return res.data.images;
      } catch (error) {
        console.error(error);
      }
    }
  );
    /* добавление картинки */
export const addUserImage = createAsyncThunk(
  "user/addImage",
  async (payload, thunkAPI) => {
      try {

        const { userId, userToken, image, imageName, imageTags } = payload;

          const formData = new FormData();
          formData.append('image', image.file);
          formData.append('imageName', imageName);
          imageTags.forEach((value) => {
            if (value.length !== 0) {
              formData.append('imageTags', value);
            } 
          });
        const res = await axios.post(`${PATH_TO_SERVER}/user/${userId}/image`,  formData , {
          headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'multipart/form-data'
          }
        }
        ); 
        // для сообщения о добавлении картинки
        //сейчас смс появляется даже при удалении картинки
        //thunkAPI.dispatch(showNotification("Картинка добавлена"));
      
      console.log("data about image", res);
      //обновление страницы сразу после добавления
      thunkAPI.dispatch(getImages({userId}, {userToken}));
      return res;

      } catch (err) {
        console.error(err);
      }
  }
)
    /* удаление картинки */
  export const deleteUserImage = createAsyncThunk(
    "user/deleteImage",
    async (payload, thunkAPI) => {
      try {
        const { userId, imageId, userToken } = payload;
        console.log(userId, imageId, userToken);
        const res = await axios.delete(`${PATH_TO_SERVER}/user/${userId}/image/${imageId}`);
         console.log("SUCCESS deleted image", res);
        thunkAPI.dispatch(getImages({userId}, {userToken}));
        return res;
      } catch (err) {
          console.log(err);
          const serializedError = err.toJSON();
          return thunkAPI.rejectWithValue(serializedError);
      }
    }
  )

  /* изменение данных о картинке - добавление в избранное и смена самих данных*/
  export const changeUserImage = createAsyncThunk(
    "user/changeImage",
    async (payload, thunkAPI) => {

      try {
//change  userId to id, userToken to token
        const { userId, imageId, userToken, imageName, imageTags, image, isFavotite} = payload;
        console.log("change img", payload);

        // let imageTags = tags2.split(",");
         console.log("imageTags", imageTags)
        
        const res = await axios.put(`${PATH_TO_SERVER}/user/${userId}/image/${imageId}`, {imageName: imageName, imageTags: imageTags, isFavorite: isFavotite}, {
          headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
          }
        }
        );

        // if (isFavotite === true) {
          // console.log(isFavotite, payload)
          //thunkAPI.dispatch(setStatusMessage('update'));
          thunkAPI.dispatch(getImages({userId}, {userToken}));
          thunkAPI.dispatch(addToFavorite(payload));
        //}

        //  if (res.config.data.isFavorite === true) {
        //   console.log(res.config.data.isFavorite, payload)
        //   thunkAPI.dispatch(addToFavorite(payload));
        // }
      
      console.log("changed data about image", res);
      // const succeededCode = res.status;
      // thunkAPI.dispatch(setErrorRegis(succeededCode));
      return res;
    } catch (err) {
      console.error(err);
      const serializedError = err.toJSON();
      // const error = err.response.status;
      // thunkAPI.dispatch(setErrorRegis(error));
      return thunkAPI.rejectWithValue(serializedError);
  } 
  }
  )

  /* создание (регистрация) */
export const createUser = createAsyncThunk(
    "user/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${PATH_TO_SERVER}/auth/regis`, payload);
            /* после отправки запроса я получаю данные: email & id,
            записываю их в переменные и передаю текущему юзеру */

             const UserID = res.data.data.UserID;
             console.log("UserID", UserID);
            /* добавление id текущего юзера */
            thunkAPI.dispatch(setUserID(UserID));
            thunkAPI.dispatch(setError(null));
            console.log(res);
            return res; 
        } catch (err) {
            const errCode = err.response.status;
            thunkAPI.dispatch(setError(errCode));
            console.log(err);
            // const serializedError = err.toJSON();
            // return thunkAPI.rejectWithValue(serializedError);
        }
    },
);

/* вход в аккаунт */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${PATH_TO_SERVER}/auth/login`, payload);
      /* получаю токен юзера и сохраняю его глобально */
      const userToken = res.data.token;
      console.log("userToken IN USERSLICE", userToken);
      thunkAPI.dispatch(setUserToken(userToken));

      /* получаю ID юзера и сохраняю его глобально */
      const userIdLogin = res.data.userId;
      console.log("userIdLogin IN USERSLICE", userIdLogin);
      thunkAPI.dispatch(setUserID(userIdLogin));

        const userEmailLogin = res.data.UserEmail;
              console.log("userEmailLogin login", userEmailLogin);
             /* добавление эмейла в текущего юзера */
              thunkAPI.dispatch(setCurrentUser(userEmailLogin));
      return res.data;
      
    } catch (error) {
      console.error(error)
      //const serializedError = error.toJSON();
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
          const res = await axios.put(`${PATH_TO_SERVER}/user/${payload.id}`);
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
        UserId: null,
        userToken: null,
        notificationName: ""
    },
    reducers: {
        // toggleFavorites: (state, action) => {
        //     const item = action.payload;
        //     console.log(item)
        //     const index = state.favorite.findIndex((favoriteItem) => favoriteItem.id === item.idImage);
        //     if (index === -1) {
        //       state.favorite.push(item);
        //     } else {
        //       state.favorite.splice(index, 1);
        //     }
        //   },
          addToFavorite: (state, action) => {
            console.log("aaaaaaaaaaaaaa", action.payload);
//const existImageIndex = state?.favorite?.find(item => `${item.imageId}` === action.payload.imageId);
//const existImageIndex = state.user?.favorite?.includes(action.payload.imageId);
//console.log( existImageIndex, action.payload.imageId);
            // if (existImageIndex) {
            //   alert("no");
            // } else {
            //   const imageData = { ...action.payload };
            //   console.log("imageData", imageData)
            //   state.favorite.push(imageData);
            // }
            
  //           const fav = imageData.isFavotite;
  //           console.log("fav", fav)
  //             const imageId = imageData.imageId;
  //           console.log("imageId", imageId)
  //           let isImageInFavorite = false;

  // for (const item of state.user?.favorite || []) {
  //   if (item.imageId === imageId) {
  //     isImageInFavorite = true;
  //     break;
  //   }
  // }
            
          },
          // addAllImages: (state, action) => {
          //   console.log(action.payload);
          //   state.user.images = action.payload;
          // },
          addImageToPage: (state, action) => {
            //state.images = action.payload;
            //state.images.push(action.payload);
            
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
            setCurrentUser: (state, action) => {
                //const UserEmail = action.payload;
                const userData = action.payload;
                console.log("USER DATA IN ACTION", userData);
                console.log("NOW CURRENT USER EMPTY", userData === null)
                //console.log("current user email", UserEmail);
                

                if (userData === null) {
                 
                  state.currentUser = [];
                } else {
                  state.currentUser.push(userData);
                }
            },
            setUserID: (state, action) => {
            state.UserId = action.payload;
          },
          setError: (state, action) => {
            state.error = action.payload;
            console.log("err in state", state.error);
          },
          setUserToken: (state, action) => {
            state.userToken = action.payload;
          },
          setStatus: (state, action) => {
            state.status = action.payload;
          },
          showNotification: (state, action) => {
            let newStirng = action.payload;
            console.log("newStirng", newStirng);
            if (newStirng !== "") {
              state.notificationName = newStirng;
            } else {
              state.notificationName = ""
            }
           
            // setTimeout(() => state.notificationName = "", 10000)
            
          }
          // setStatusMessage: (state, action) => {
          //   console.log('SET STATUS', action.payload);
          //   state.status = action.payload;
          //   console.log("status in state", state.status);
          // }
    },
    extraReducers: (builder) => {
      //получение изображений - getImages
      builder 
      .addCase(getImages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.images = action.payload; 
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
      //регистрация - createUser
       builder
       .addCase(createUser.pending, (state, action) => {
        state.status = 'loading'
      })
       .addCase(createUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        addCurrentUser(state, { payload });
        setAuthStatus(true);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
      //вход в акк - loginUser
        builder
        .addCase(loginUser.pending, (state, action) => {
          //state.status = 'loading'
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
           //state.status = 'succeeded'
            addCurrentUser(state, { payload });
            setAuthStatus(true); 
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed'
        state.error = action.error.message
});
//обновление пароля - updatePasswordUser
        builder
        .addCase(updatePasswordUser.fulfilled, addCurrentUser);
//добавление картинки - addUserImage
      builder
      .addCase(addUserImage.fulfilled, (state, action) => {
        let image = action.payload;
        console.log("IMAGE IN addUserImage.fulfilled",image)
      });
// изменение картинки - changeUserImage
      builder
      .addCase(changeUserImage.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(changeUserImage.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        //let updImage = action.payload;
        //console.log("IMAGE IN updateImageInfo.fulfilled", updImage);
        // state.images.push({updImage})
      } )
      .addCase(changeUserImage.rejected, (state, action) => {
        state.status = 'failed'
      })
      // .addCase(addUserImage.rejected, (state) => {
      //   state.isLoading = false;
      // })

}})


export const selectUserID = (state) => state.user.userID;


export const { setStatusMessage, addAllImages, toggleFavorites, toggleFavorite2, addToFavorite, addImageToPage, deleteImagefromPage, updateImageInfo, createUserAction, setUserID, setError, setCurrentUser, setUserToken, showNotification, setStatus } = userSlise.actions;

export default userSlise.reducer;
