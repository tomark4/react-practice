import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3),
});

const Profile = () => {
  const user = useSelector((s) => s.user.identity);
  const initialValues = {
    name: user.name,
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="text-center my-4">
            <div className="row my-2">
              <div className="col">
                <img src="..." alt="Avatar" />
              </div>
            </div>
            <button className="btn btn-danger">Change avatar</button>
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
