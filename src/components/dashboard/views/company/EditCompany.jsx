import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCompanySaveOrUpdateMutation } from "../../../../services/companyApi";
import { Button, Form, Modal } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.min.css';
const EditCompany = ({ item, handleClose }) => {
  const [previewImage, setPreviewImage] = useState();
  const [companySaveOrUpdate, res] = useCompanySaveOrUpdateMutation();

  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: item.id,
      name: item.name,
      address: item.address,
      contact_no: item.contact_no,
      company_email: item.company_email,
      hr_email: item.hr_email,
      leave_email: item.leave_email,
      employee_code_length: item.employee_code_length,
      company_prefix: item.company_prefix,
      is_active: item.is_active,
      file: item.company_logo,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("contact_no", values.contact_no);
      formData.append("company_email", values.company_email);
      formData.append("hr_email", values.hr_email);
      formData.append("leave_email", values.leave_email);
      formData.append("employee_code_length", values.employee_code_length);
      formData.append("company_prefix", values.company_prefix);
      formData.append("is_active", values.is_active);
      formData.append("file", values.file);

      try {
        const result = await companySaveOrUpdate(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (res.isSuccess) {
    handleClose();
  }

  return (
    <>
      <div className="card-body ">
        <form
          className="form-sample"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Name</label>
                <div className="col-sm-12">
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

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Address</label>
                <div className="col-sm-12">
                  <textarea
                    className="form-control"
                    type="text"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    cols="1"
                    rows="2"
                  ></textarea>
                  {/* <input /> */}
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
                    onChange={formik.handleChange}
                    value={formik.values.contact_no}
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
                    onChange={formik.handleChange}
                    value={formik.values.company_email}
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
                    onChange={formik.handleChange}
                    value={formik.values.hr_email}
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
                    onChange={formik.handleChange}
                    value={formik.values.leave_email}
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
                    onChange={formik.handleChange}
                    value={formik.values.employee_code_length}
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
                    onChange={formik.handleChange}
                    value={formik.values.company_prefix}
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
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.currentTarget.files[0]);
                      handelImage(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Is Active</label>
                <div className="col-sm-8">
                  <div class="form-check form-switch mt-2">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label=""
                      name="is_active"
                      onChange={formik.handleChange}
                      value={formik.values.is_active}
                      checked={formik.values.is_active}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4">
              {previewImage ? (
                <img
                  className="py-2"
                  src={previewImage}
                  width="80px"
                  height="80px"
                  alt=""
                />
              ) : (
                <img
                  className="py-2"
                  src={`${process.env.REACT_APP_FILE_URL}${formik.values.file}`}
                  width="80px"
                  height="80px"
                  alt=""
                />
              )}
            </div>
            <Modal.Footer >
              <div className=" d-flex">
                <div className="mr-5">
                  <Button type="submit" variant="success">
                    Submit
                  </Button>
                </div>
                <div>
                  <Button variant="dark" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCompany;
