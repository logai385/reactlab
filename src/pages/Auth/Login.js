import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAct } from "../../redux/auth/AuthAction";
import { CHECK_AUTH_API } from "../../redux/auth/AuthConst";

export const Login = () => {
  const dispatch = useDispatch();

  const { authLoading, isAuthenticated } = useSelector(
    (state) => state.AuthReducer
  );

  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUserAct(userForm));
  };
  useEffect(() => {
    dispatch({ type: CHECK_AUTH_API });
    if (isAuthenticated) {      
      return <Navigate to="/" />;
    }
    return () => {};
  }, []);
  return (
    <section className="login">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 login__left"></div>
          <div className="col-12 col-sm-6 login__right">
            <form className="form " onSubmit={handleSubmit}>
              <h1 className="text-center display-3">Đăng Nhập</h1>
              <div className="form-group my-5">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Tên tài khoản"
                  name="username"
                  value={userForm.username}
                  required
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  required
                  className="form-control mt-4"
                  value={userForm.password}
                  onChange={handleChange}
                />

                <button className="btn btn-primary mt-4" type="submit">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
