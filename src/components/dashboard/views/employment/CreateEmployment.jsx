import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import { useEmploymentTypeSaveOrUpdateMutation } from "../../../../services/employmentApi";


const CreateEmployment = ({ handleClose }) => {

  const [employmentTypeSaveOrUpdate, res] = useEmploymentTypeSaveOrUpdateMutation();

  const formik = useFormik({
    initialValues: {
      type: "",
      is_active:false

    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await employmentTypeSaveOrUpdate(values).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (res.isSuccess) {
    handleClose();
  }

  return (
    <>
      <ToastContainer />
      <div className="card-body">
        <form className="form-sample" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12 ">
              <div className="form-group row">
                <label className="col-sm-3 col-md-12 col-form-label">
                  Employment type
                </label>

                <div className="col-sm-9 col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter employment type"
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-4 col-md-8 col-form-label">Is Active</label>
                <div className="col-sm-8 col-md-4">
                  <div class="form-check form-switch mt-2">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Active"
                      name="is_active"
                      onChange={formik.handleChange}
                      value={formik.values.is_active}
                    />
                  </div>
                </div>
              </div>
            </div>
   

          </div>
          <Modal.Footer>
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
        </form>
      </div>
    </>
  );
};

export default CreateEmployment;
