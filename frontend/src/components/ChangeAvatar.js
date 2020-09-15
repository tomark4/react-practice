import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import env from "../utils/environment";
import { editUserAction } from "../store/ducks/user";
import swal from "sweetalert";

const ChangeAvatar = ({ user }) => {
  const uri = env.appUrl;
  const dispatch = useDispatch();
  const token = useSelector((s) => s.user.token);
  const inputAvatar = useRef();
  const [avatarPath, setAvatarPath] = useState("");

  const avatarChangeHandler = (e) => {
    const archivo = e.target.files[0];
    setAvatarPath(URL.createObjectURL(archivo));
    const fd = new FormData();
    fd.append("avatar", archivo);

    fetch(`${uri}/users/avatar`, {
      method: "post",
      body: fd,
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok === true) {
          dispatch(editUserAction(data.user, data.token));
          swal("Profile", "Imagen updated", "success");
        } else {
          swal("Profile", "Error updated!", "error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user.avatar_path) {
      setAvatarPath(user.avatar_path);
    } else {
      setAvatarPath("/logo192.png");
    }
  }, [user]);

  return (
    <div className="text-center my-4">
      <div className="row my-2">
        <div className="col">
          <img
            src={avatarPath}
            alt="Avatar"
            width="120"
            height="120"
            style={{
              borderRadius: "50%",
              boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
      </div>
      <input
        type="file"
        name="avatar"
        style={{ display: "none" }}
        accept="image/*"
        ref={inputAvatar}
        onChange={avatarChangeHandler}
      />
      <button
        className="btn btn-danger"
        onClick={() => inputAvatar.current.click()}
      >
        Change avatar
      </button>
    </div>
  );
};

export default ChangeAvatar;
