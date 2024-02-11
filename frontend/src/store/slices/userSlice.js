import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PATH_TO_SERVER } from "../../data/constants";

/*поиск всех картинок*/
export const searchImages = createAsyncThunk(
  "user/searchImages",
  async (payload, thunkAPI) => {
     /* полный запрос с фильтрами: 
    http://localhost:4500/api/user/65c51ff5b44f6ee2d13ead3d/image/search?searchQuery=k&dateFilter=DOWN&isFavorite=false */
    try {
      const { userId, userToken, searchQuery } = payload;
      console.log("search payload ", userId, userToken, searchQuery )
      let res;
      if (searchQuery !== "") {
        res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image/search?searchQuery=${searchQuery}`, {
          headers: {
            Authorization: 'Bearer ' + userToken,
          }
        });
        console.log("SEARCH IN MAIN", res.data.data);
        thunkAPI.dispatch(setIsSearching());
      }
      console.log("search data", res.data.data);
      return res;
    } catch (err) {
      console.error(err);
    }})

/*поиск избранных картинок */
export const searchFavoriteImages = createAsyncThunk(
  "user/searchImages/favorite",
  async (payload, thunkAPI) => {
    /* полный запрос с фильтрами: 
    http://localhost:4500/api/user/65c51ff5b44f6ee2d13ead3d/image/search?searchQuery=k&dateFilter=DOWN&isFavorite=false */
    try {
      const { userId, userToken, searchQuery } = payload;
      console.log("search fav payload", payload);
      const res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image/search?searchQuery=${searchQuery}&isFavorite=true`, {
        headers: {
          Authorization: 'Bearer ' + userToken,
        }
      });
      console.log("SEARCH IN FAVORITE", res);
      thunkAPI.dispatch(setIsSearching());
      return res.data;
    } catch (err) {
      console.error(err);
    }})

/* получение картинок */
export const getImages = createAsyncThunk(
    "user/getImages",
    async (payload, thunkAPI) => {
      try {
        const { userId, userToken, filter, sort } = payload; 
          console.log('payload from main page', payload);
          let res;
          if (sort === "date" && filter === "NONE") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=NONE&type=DATE`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort date none");
          } else if (sort === "date" && filter === "DOWN") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=DOWN&type=DATE`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort date down");
          } else if (sort === "alph" && filter === "NONE") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=NONE&type=ALP`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort alphabet none");
          } else if (sort === "alph" && filter === "DOWN") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=DOWN&type=ALP`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort alphabet down");
          } else {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image`, {
                headers: {
                  Authorization: 'Bearer ' + userToken,
                } });
                console.log("no sorted");
          }
        console.log("GET DATA", res);
        return res;
      } catch (error) {
        console.error(error);
      }
    }
  );
  /* получение избранных картинок */
export const getFavoriteImages = createAsyncThunk(
  "user/getFavoriteImages",
    async (payload, thunkAPI) => {
      try {
        const { userId, userToken, isFavorite, filter, sort } = payload; 
        console.log('payload from change page', payload);
        let res;
        if (sort === "date" && filter === "NONE") {
          res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=NONE&type=DATE&isFavorite=${isFavorite}`, {
            headers: {
              Authorization: 'Bearer ' + userToken,
            } });
            console.log("sort date none");
          } else if (sort === "date" && filter === "DOWN") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=DOWN&type=DATE&isFavorite=${isFavorite}`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort date down");
          } else if (sort === "alph" && filter === "NONE") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=NONE&type=ALP&isFavorite=${isFavorite}`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort alphabet none");
          } else if (sort === "alph" && filter === "DOWN") {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?filter=DOWN&type=ALP&isFavorite=${isFavorite}`, {
              headers: {
                Authorization: 'Bearer ' + userToken,
              } });
              console.log("sort alphabet down");
          } else {
            res = await axios.get(`${PATH_TO_SERVER}/user/${userId}/image?isFavorite=${isFavorite}`, {
                headers: {
                  Authorization: 'Bearer ' + userToken,
                } });
                console.log("no sorted");
          }
        console.log("GET DATA favorite", res.data);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    }
)
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
      
      console.log("data about image", res);
      //обновление страницы сразу после добавления
      thunkAPI.dispatch(getImages({userId}, {userToken}));
      if (res.data.message === "image added") {
        thunkAPI.dispatch(showNotification("Изображение добавлено"));
      }
      return res.data;

      } catch (err) {
        console.error(err);
        //отлавливание ошибки про добавление дубликата картинки
        const error = err.response.data.code;
        console.log(error); 
        thunkAPI.dispatch(setError(error));
        return err;
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
          if (res.data.message === "image delete") {
            thunkAPI.dispatch(showNotification("Успешно удалено"));
          }
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
        const {  userId, userToken, imageId, imageName, imageTags, isFavor, favor} = payload;
        const isFavorite = true;
        console.log("change img", payload);
        let res;
         console.log("imageTags", imageTags, imageTags[0] === null,  imageTags[0] === "" )
         console.log("HELLO", imageName, imageTags, isFavor, userId, userToken);
         //если только сохранение в избранное, то проверяем на наличие переменной,
         //которую передаем только при добавлении в избранное
         if (favor === "yes") {
          res = await axios.put(`${PATH_TO_SERVER}/user/${userId}/image/${imageId}`, {isFavorite: isFavor}, {
            headers: {
              Authorization: 'Bearer ' + userToken,
              'Content-Type': 'application/json'
            }
          }
          );
          console.log("ONE")
         } else
         //если массив тегов пустой, то не отправлять их
          if (imageTags[0] === null) {
            res = await axios.put(`${PATH_TO_SERVER}/user/${userId}/image/${imageId}`, {imageName: imageName, isFavorite: isFavor}, {
              headers: {
                Authorization: 'Bearer ' + userToken,
                'Content-Type': 'application/json'
              }
            }
            );
            console.log("TWO")
            thunkAPI.dispatch(showNotification("Изменения сохранены"));
          } else 
          if (imageTags[0] === "") {
            res = await axios.put(`${PATH_TO_SERVER}/user/${userId}/image/${imageId}`, {imageName: imageName, isFavorite: isFavor, imageTags: null}, {
              headers: {
                Authorization: 'Bearer ' + userToken,
                'Content-Type': 'application/json'
              }
            }
            );
            console.log("THREE")
            thunkAPI.dispatch(showNotification("Изменения сохранены"));
          } 
          else
          //иначе отправлять вместе с тегами
          {
        res = await axios.put(`${PATH_TO_SERVER}/user/${userId}/image/${imageId}`, {imageName: imageName, imageTags: imageTags, isFavorite: isFavor}, {
          headers: {
            Authorization: 'Bearer ' + userToken,
            'Content-Type': 'application/json'
          }
        }
        );
        console.log("FOUR")
        thunkAPI.dispatch(showNotification("Изменения сохранены"));
      }
           thunkAPI.dispatch(getImages({userId}, {userToken}));
           thunkAPI.dispatch(getFavoriteImages({userId, userToken, isFavorite}));
      console.log("changed data about image", res);
      return res;
    } catch (err) {
      console.error(err);
  } 
  }
  )

  //ссылка на изображение 
export const getLink = createAsyncThunk(
  "user/getLink",
  async (payload, thunkAPI) => {
    try {
      const { userId, userToken, imageId } = payload;
      const res = await axios.get(`${PATH_TO_SERVER}/share/${userId}/getLink/${imageId}`, {
        headers: {
          Authorization: 'Bearer ' + userToken,
        }
      });
      console.log("get link payload", userId, userToken, imageId)
      const link = res.data.data.link;
      thunkAPI.dispatch(addLinkData(link))
      console.log("getLink data", link)
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  )

  /* создание (регистрация) */
export const createUser = createAsyncThunk(
    "user/createUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${PATH_TO_SERVER}/auth/regis`, payload);
            /*записываю успешный ответ от сервера */
            const singUpMessage = res.data.message;
            console.log("singUpMessage", singUpMessage)
            thunkAPI.dispatch(setMessage(singUpMessage));
            console.log(res);
            return res; 
        } catch (err) {
            const errCode = err.response.data.code;
            const existEmail = err.response.data.userEmail;            ;
            console.log("EXIST EMAIL ERROR", existEmail, errCode);
            thunkAPI.dispatch(setExistEmail(existEmail));
            thunkAPI.dispatch(setError(errCode));
            thunkAPI.dispatch(setStatus("failed"));
            console.error(err);
            return err;
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
      const userToken = res.data.data.token;
      console.log("userToken IN USERSLICE", userToken);
      thunkAPI.dispatch(setUserToken(userToken));

      /* получаю ID юзера и сохраняю его глобально */
      const userIdLogin = res.data.data.userId;
      console.log("userIdLogin IN USERSLICE", userIdLogin);
      thunkAPI.dispatch(setUserID(userIdLogin));

      /* записываю успешный ответ от сервера */
      const loginMessage = res.data.message;
      console.log("loginMessage", loginMessage)
      thunkAPI.dispatch(setMessage(loginMessage));
      console.log("res data from login userslice", res.data);
      //добавление даты последнего входа
      const upd = res.data.data.checkUpdate;
      console.log("upd", upd);
      thunkAPI.dispatch(setCheckUpdate(upd));
      return res.data;
      
    } catch (error) {
      const errCode = error.response.data.code;
      thunkAPI.dispatch(setError(errCode));
      console.error(error, errCode)
      return error;
    }
  }

)

/* получение инфы о юзере */
export const getInfoAboutUser = createAsyncThunk(
  "user/getInfoAboutUser",
  async (payload, thunkAPI) => {
    try {
      const { userId, userToken } = payload; 
      console.log('payload from acc page', payload);
      const res = await axios.get(`${PATH_TO_SERVER}/user/${userId}`, 
      {
           headers: {
             Authorization: 'Bearer ' + userToken,
           }} );
           console.log("res data from userslice", res.data)
           /* записываю все данные о юзере, в том числе и эмейл,
           чтобы получить его на странице PersonalAccountPage */
           const userData = res.data;
           thunkAPI.dispatch(setAllUserData(userData))
           
           return res.data;
    } catch (err) {
      console.error(err)
      return err;
  }
}
)

/* обновление пароля */
export const updatePasswordUser = createAsyncThunk(
  "user/updatePasswordUser",
  async (payload, thunkAPI) => {
      try {
        const {userId, userToken, UserPassword} = payload;
          const res = await axios.put(`${PATH_TO_SERVER}/user/${userId}/chPass`, {UserPassword: UserPassword}, {
            headers: {
              Authorization: 'Bearer ' + userToken,
              'Content-Type': 'application/json'
            }
          });
          console.log("CHANGE PASS DATA", res.data);
          const sucMessage = res.data.message;
          thunkAPI.dispatch(setMessage(sucMessage));

          if (res.data.message === "user password updated") {
            thunkAPI.dispatch(showNotification("Пароль успешно сменен"));
          }
          return res.data;
      } catch (error) {
          const errCode = error.response.data.code;
          const errMessage = error.response.data.detail;
          thunkAPI.dispatch(setError(errCode));
          thunkAPI.dispatch(setMessage(errMessage));
          console.log(error);
          return error;
      }
  }
);

/* забыл пароль - отправка эмейла */
export const sendForgotEmail = createAsyncThunk(
  "user/sendForgotEmail",
  async (payload, thunkAPI) => {
    try {
      const {userEmail} = payload;
      console.log("forgot payload", payload)
        const res = await axios.get(`${PATH_TO_SERVER}/auth/forgotPass?email=${userEmail}`);
        console.log("res forgot", res);
        const succMess = res.data.message;
        thunkAPI.dispatch(setMessage(succMess));
        return res
      } catch (err) {
        const error = err.response.data.code;
        thunkAPI.dispatch(setError(error));
        console.error(err);
      }
    })

const userSlise = createSlice({
    name: 'user',
    initialState: {
        favorite: [],
        status: 'idle',
        error: null,
        message: null,
        images: [],
        UserId: null,
        userToken: null,
        allUserData: [],
        notificationName: "", 
        existEmail: "",
        checkUpdate: null,
        isSearching: false,
        linkData: ""
    },
    reducers: {
          setIsSearching: (state, action) => {
            state.isSearching = true;
          },
          addLinkData: (state, action) => {
            state.linkData = action.payload;
          },
          setAllUserData: (state, action) => {
              state.allUserData = action.payload;
          },
          setUserID: (state, action) => {
            state.UserId = action.payload;
          },
          setError: (state, action) => {
            const currError = action.payload;

            if (currError !== 200 || currError !== null) {
              state.error = currError;
            }
            console.log("err in state", currError);
          },
          setUserToken: (state, action) => {
            state.userToken = action.payload;
          },
          setStatus: (state, action) => {
            state.status = action.payload;
          },
          setMessage: (state, action) => {
            console.log("message in state", action.payload);
            state.message = action.payload;
          },
          setExistEmail: (state, action) => {
            console.log("this exist email in state", action.payload);
            state.existEmail = action.payload;
          },
          showNotification: (state, action) => {
            let newStirng = action.payload;
            console.log("newStirng", newStirng);
            if (newStirng !== "") {
              state.notificationName = newStirng;
            } else {
              state.notificationName = ""
            };
          },
          setCheckUpdate: (state, action) => {
            state.checkUpdate = action.payload;
          }
    },
    extraReducers: (builder) => {
//поиск всех картинок - searchImages
      builder 
      .addCase(searchImages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const img = action.payload?.data?.data;
        if (img !== undefined) {
          console.log("action.payload from search", action.payload?.data?.data)
          state.images = img; 
        }
        console.log("action.payload from search", action.payload?.data?.data)
      })
      .addCase(searchImages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
//поиск избранных картинок - searchFavoriteImages
      builder 
      .addCase(searchFavoriteImages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(searchFavoriteImages.fulfilled, (state, action) => {
        state.status = 'succeeded'
         const img = action.payload.data;
        console.log("action.payload from search 2", action.payload.data)
        state.favorite = img; 
      })
      .addCase(searchFavoriteImages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
//получение изображений - getImages
      builder 
      .addCase(getImages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log("action.payload.data", action.payload?.data, action.payload)
        state.images = action.payload?.data; 
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
//получение избранных - getFavoriteImages
      builder 
      .addCase(getFavoriteImages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getFavoriteImages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.favorite = action.payload; 
      })
      .addCase(getFavoriteImages.rejected, (state, action) => {
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
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
//вход в акк - loginUser
      //не ставить статусы и забыть про loginUser.pending, я это не поставила, потому что оно
      //мешает загрузке картинок на главной после входа
        builder
        .addCase(loginUser.fulfilled, (state, { payload }) => {
      })
      builder
        .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
});
//добавление картинки - addUserImage
      builder
      .addCase(addUserImage.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addUserImage.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(addUserImage.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      });
// изменение картинки - changeUserImage
      builder
      .addCase(changeUserImage.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(changeUserImage.fulfilled, (state, action) => {
         state.status = 'succeeded';
      } )
      .addCase(changeUserImage.rejected, (state, action) => {
        state.status = 'failed'
      })
// удаление картинки - deleteUserImage
      builder
      .addCase(deleteUserImage.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteUserImage.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(deleteUserImage.rejected, (state, action) => {
        state.status = 'failed'
      })
//сменa пароля юзера - updatePasswordUser
      builder
      .addCase(updatePasswordUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updatePasswordUser.fulfilled, (state, action) => {
       state.status = 'succeeded'
      })
      .addCase(updatePasswordUser.rejected, (state, action) => {
        state.status = 'failed'
      })
//отправка почты если забыл пароль - sendForgotEmail
      builder
      .addCase(sendForgotEmail.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(sendForgotEmail.fulfilled, (state, action) => {
      state.status = 'succeeded'
      })
      .addCase(sendForgotEmail.rejected, (state, action) => {
        state.status = 'failed'
      })

}})

export const notifName = (state) => state.user.notificationName;

export const { setIsSearching, addLinkData, setUserID, setError, setUserToken, setAllUserData, showNotification, setStatus, setMessage, setExistEmail, setCheckUpdate } = userSlise.actions;

export default userSlise.reducer;
