import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import { useBranchListByCompanyIdQuery } from "../../../../services/departmentApi";
import { useWingSaveOrUpdateMutation } from "../../../../services/wingApi";


const CreateWing = ({ handleClose }) => {
  const { data } = useGetCompanyListQuery();
  const [wingSaveOrUpdate, res] =
    useWingSaveOrUpdateMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      company_id:0,
      branch_id: "",
      is_active: true,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await wingSaveOrUpdate(values).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });
  const { data: baranchData } = useBranchListByCompanyIdQuery(formik.values.company_id)
  
  if (res.isSuccess) {
    handleClose();
  }



  return (
    <>
           <ToastContainer/>
      <div className="card-body">
        <form className="form-sample" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Wing Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Company</label>
                <div className="col-sm-9">
                <select
                    className="form-control form-select"
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
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Branch</label>
                <div className="col-sm-9">
                <select
                    className="form-control form-select"
                    name="branch_id"
                    onChange={formik.handleChange}
                   value={formik.values.branch_id}
                  >
                    <option>Selact Branch</option>
                    {baranchData?.data?.map((branch, i) => (
                      <option key={i} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Is Active</label>
                <div className="col-sm-8">
                  <div class="form-check form-switch mt-1">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Active"
                      name="is_active"
                      onChange={formik.handleChange}
                      value={formik.values.is_active}
                      checked={formik.values.is_active}
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

export default CreateWing;
