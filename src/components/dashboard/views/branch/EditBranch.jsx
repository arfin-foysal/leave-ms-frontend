import { useFormik } from "formik";
import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useBranchSaveOrUpdateMutation } from "../../../../services/branchApi";
import { useGetCompanyListQuery } from "../../../../services/companyApi";

const EditBranch = ({ item, handleClose }) => {
  const { data } = useGetCompanyListQuery();
  const [branchSaveOrUpdate, res] =
    useBranchSaveOrUpdateMutation();

  const formik = useFormik({
    initialValues: {
      id: item.id,
      name: item.name,
      address: item.address,
      contact_no: item.contact_no,
      company_id: item.company_id,
      is_active: item.is_active,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await branchSaveOrUpdate(values).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },

   
  });
   if(res.isSuccess) {
      handleClose();
    }
  return (
    <>
      <ToastContainer />
      <div className="card-body">
        <form className="form-sample" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
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
                <label className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  >
                    </textarea>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Contact No:</label>
                <div className="col-sm-8">
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
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Company</label>
                <div className="col-sm-8">
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

export default EditBranch;
