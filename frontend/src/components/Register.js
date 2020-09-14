import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import environment from "../utils/environment";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().min(3).required(),
  password: Yup.string().min(3).required(),
});
const Register = (props) => {
  const uri = environment.appUrl;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "jose",
      email: "jose@jose.com",
      password: "123456",
    },
    validationSchema,
    onSubmit: (values) => {
      saveUser(values);
    },
  });

  const saveUser = (values) => {
    setLoading(true);
    fetch(`${uri}/users/register`, {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok === true) {
          swal("Register", data.message, "success").then(() => {
            props.history.push("/login");
          });
        } else {
          swal("Register", data.message, "error");
        }
      })
      .catch((err) => console.log(err));
  };

  const { errors, touched } = formik;
  return (
    <div>
      <div className="row my-3">
        <div className="col-md-6 mx-auto">
          <h2>Create an account</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {errors.name && touched.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {errors.email && touched.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {errors.password && touched.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {loading ? <span>Register</span> : <span>Saving...</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
