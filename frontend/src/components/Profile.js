import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import env from "../utils/environment";
import { editUserAction } from "../store/ducks/user";
import swal from "sweetalert";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3),
});

const Profile = () => {
  const user = useSelector((s) => s.user.identity);
  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();
  const inputAvatar = useRef();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  const uri = env.appUrl;
  const initialValues = {
    name: user.name,
  };

  const editUser = (values) => {
    fetch(`${uri}/users/${user._id}`, {
      method: "put",
      body: JSON.stringify(values),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok === true) {
          dispatch(editUserAction(data.user, data.token));
          swal("Profile", "Success updated!", "success");
        } else {
          swal("Profile", "Error updated!", "error");
        }
      })
      .catch((err) => console.log(err));
  };

  const avatarChangeHandler = (e) => {
    const archivo = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(archivo));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      editUser(values);
    },
  });
  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="text-center my-4">
            <div className="row my-2">
              <div className="col">
                <img src={avatarPreview} alt="Avatar" width="90" height="90" />
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
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <p className="static-control">{user.email}</p>
            </div>
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div>{formik.errors.name}</div>
            </div>
            <div className="form-group">
              <button className="btn btn-success">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
