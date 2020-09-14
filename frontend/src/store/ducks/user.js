import env from "../../utils/environment";

const initialState = {
  identity: null,
  token: "",
  errorMsg: "",
};

const EDIT_USER = "EDIT_USER";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_USER: {
      return {
        ...state,
        identity: action.payload.user,
        token: action.payload.token,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        identity: action.payload.user,
        token: action.payload.token,
      };
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        identity: null,
        token: "",
        errorMsg: action.payload,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        identity: null,
        token: "",
        errorMsg: "",
      };
    }

    default: {
      return state;
    }
  }
}

export const login = ({ email, password }) => (dispatch) => {
  fetch(`${env.appUrl}/users/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.ok === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
        saveStorage(data.token, data.user);
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: data.message,
        });
        deleteStorage();
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  deleteStorage();
};

export const editUserAction = (user, token) => (dispacth) => {
  dispacth({
    type: EDIT_USER,
    payload: {
      user,
      token,
    },
  });
  saveStorage(token, user);
};

const saveStorage = (token, user) => {
  localStorage.setItem("identity", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
};

const deleteStorage = () => {
  localStorage.removeItem("identity");
  localStorage.removeItem("token");
};
