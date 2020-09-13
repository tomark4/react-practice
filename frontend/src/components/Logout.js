import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/ducks/user";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    swal("Logout", "See you!", "success").then(() => {
      dispatch(logout());
    });
  });

  return (
    <>
      <Redirect to="/login" />
    </>
  );
};

export default Logout;
