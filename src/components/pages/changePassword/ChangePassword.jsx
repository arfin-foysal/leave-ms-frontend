import React from "react";
import PageTopHeader from "../../common/PageTopHeader";
import { useFormik } from "formik";
import { useChangePasswordMutation } from "../../../services/authApi";
import { toast } from "react-toastify";
import { changePasswordSchema } from "../../../Validation/changePassword";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/authSlice";
import forgotPassword from "../../../assets/images/forgot password.png";
const ChangePassword = () => {
  const [changePassword, res] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: changePasswordSchema,
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await changePassword(values).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (res.isSuccess) {
    dispatch(logout());
    window.location.reload(false);
  }

  return (
    <>
      <PageTopHeader
        title="
            Change Password
      "
      />

      <div className="col-12">
        <div className=" card card shadow mb-4">
          <div className="card-header py-3 n">
            <div>
              <h6 className="m-0 font-weight-bold text-primary">
                Change Password
              </h6>
            </div>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-12 text-center">
                  <img src={forgotPassword} width={350} alt="" />
                </div>

                <div className="col-md-6 card py-4 shadow-lg  border-0">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type="password"
                        className={
                          formik.errors.old_password &&
                          formik.touched.old_password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="currentPassword"
                        placeholder="Enter Current Password"
                        name="old_password"
                        onChange={formik.handleChange}
                        value={formik.values.old_password}
                      />
                      {formik.errors.old_password &&
                      formik.touched.old_password ? (
                        <div className="invalid-feedback">
                          {formik.errors.old_password}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        className={
                          formik.errors.new_password &&
                          formik.touched.new_password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="newPassword"
                        placeholder="Enter New Password"
                        name="new_password"
                        onChange={formik.handleChange}
                        value={formik.values.new_password}
                      />
                      {formik.errors.new_password &&
                      formik.touched.new_password ? (
                        <div className="invalid-feedback">
                          {formik.errors.new_password}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className={
                          formik.errors.confirm_password &&
                          formik.touched.confirm_password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="confirmPassword"
                        placeholder="Enter Confirm Password"
                        name="confirm_password"
                        onChange={formik.handleChange}
                        value={formik.values.confirm_password}
                      />
                      {formik.errors.confirm_password &&
                      formik.touched.confirm_password ? (
                        <div className="invalid-feedback">
                          {formik.errors.confirm_password}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-2"></div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
