import { useFormik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";

const CreateCompany = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="card-body">
        <form className="form-sample">

          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Name</label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Address</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" name="address" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Contact No:</label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="contact_no"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Company Email</label>
                <div className="col-sm-7">
                  <input
                    type="email"
                    className="form-control"
                    name="company_email"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">HR email</label>
                <div className="col-sm-7">
                  <input
                    type="email"
                    className="form-control"
                    name="hr_email"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Leave Email</label>
                <div className="col-sm-7">
                  <input
                    type="email"
                    className="form-control"
                    name="leave_email"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Employee Code</label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="employee_code_length"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Company Prefix
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="company_prefix"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Company Logo</label>
                <div className="col-sm-7">
                  <input
                    className="form-control"
                    name="file"
                    type='file'
                    accept='image/*'
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-6 py-5 "> */}
            <button type="submit" className=" btn btn-success  ">
              Submit
            </button>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default CreateCompany;
