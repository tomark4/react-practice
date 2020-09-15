import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import env from "../utils/environment";
import { editUserAction } from "../store/ducks/user";
import swal from "sweetalert";
import ChangeAvatar from "./ChangeAvatar";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3),
});

const Profile = () => {
  const user = useSelector((s) => s.user.identity);
  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();
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
          <ChangeAvatar user={user} />

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
                className={`form-control ${
                  formik.errors.name && formik.touched.name ? "is-invalid" : ""
                }`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <button className="btn btn-success" type="submit">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
