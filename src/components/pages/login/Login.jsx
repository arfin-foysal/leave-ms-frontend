import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useLoginMutation } from "../../../services/authApi";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authToken, authUser, userRole } from "../../../features/authSlice";
import logo from "../../../assets/logo/logo.png";
import LoginLoader from "../../common/LoginLoader";
import { BsArrowRight } from "react-icons/bs";
import { loginSchema } from "../../../Validation/loginSchema";

const Login = () => {
  const [login, { data, isLoading, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

  if (isSuccess) {
    dispatch(authUser(data?.data));
    dispatch(authToken(data?.data?.token));
    dispatch(userRole(data?.data?.user_type));
    // navigate("/dashboard");
    window.location.reload(false);
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                  <div className="col">
                    <div className="m-5">
                      {isLoading && <LoginLoader />}
                      {/* {isError && <p className=" text-center">
                        <span className="text-danger">
                         Something went wrong  </span>
                        <MdSignalWifiConnectedNoInternet3 size={20} />
                      </p>} */}

                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        <img src={logo} alt="" className="pb-3" />
                      </div>

                      <form
                        className="user"
                        onSubmit={formik.handleSubmit}
                        encType="multipart/form-data"
                      >
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            // className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.email && formik.touched.email
                                ? "form-control form-control-user is-invalid"
                                : "form-control form-control-user"
                            }
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <div className="invalid-feedback">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            id="exampleInputPassword"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.password && formik.touched.password
                                ? "form-control form-control-user is-invalid"
                                : "form-control form-control-user"
                            }
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <div className="invalid-feedback">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Login
                          <BsArrowRight />
                        </button>
                      </form>

                      <div className="text-center mt-4 ">
                        <Link className="small text-decoration-none" to="#">
                          Forgot Password?
                        </Link>
                      </div>
                      {/* <div className="text-center ">
                        <Link
                          className="small text-decoration-none"
                          to="/signup"
                        >
                          Create an Account!
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
