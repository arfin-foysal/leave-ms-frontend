import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useGetCompanyListQuery } from "../../../../../services/companyApi";
import { useBranchSaveOrUpdateMutation } from "../../../../../services/branchApi";


const CreateWorkingDay = ({ handleClose }) => {
  const { data } = useGetCompanyListQuery();
  const [branchSaveOrUpdate, res] = useBranchSaveOrUpdateMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      contact_no: "",
      company_id: "",
      is_active: false,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await branchSaveOrUpdate(values).unwrap();
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
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter branch name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="enter branch address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Contact No:</label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="enter contact no"
                    name="contact_no"
                    onChange={formik.handleChange}
                    value={formik.values.contact_no}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Company</label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    name="company_id"
                    onChange={formik.handleChange}
                    value={formik.values.company_id}
                  >
                    <option>Selact Company</option>
                    {data?.data?.map((company, i) => (
                      <option key={i} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
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

export default CreateWorkingDay;
