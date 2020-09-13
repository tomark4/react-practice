import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(3).required(),
  password: Yup.string().min(3).required(),
});

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  const { errors, touched, values } = formik;

  return (
    <div>
      <h2 className="text-center my-4">Login</h2>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
                value={values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {errors.email && touched.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
                value={values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {errors.password && touched.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
