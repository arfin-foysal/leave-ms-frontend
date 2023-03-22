import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useUpdateApprovalFlowMutation } from "../../../../../services/leaveApprovalFlowApi";
import { useGetApprovalAuthorityListQuery } from "../../../../../services/employeeApi";

const EditLeaveApprovalFlow = ({ item, handleClose }) => {
  const [updateApprovalFlow, res] = useUpdateApprovalFlowMutation();
  const authorityList = useGetApprovalAuthorityListQuery();

  const formik = useFormik({
    // enableReinitialize: true,

    initialValues: {
      id: item.id,
      employee_id: item.employee_id,
      approval_authority_id: item.approval_authority_id,
    },

    onSubmit: async (values, { resetForm }) => {
      const data = {
        id: values.id,
        employee_id: values.employee_id,
        approval_authority_id: Number(values.approval_authority_id),
      };

      try {
        const result = await updateApprovalFlow(data).unwrap();
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
    <div>
      {res.isLoading && <div className="loader"></div>}

      <ToastContainer />
      <form className="form-sample" onSubmit={formik.handleSubmit}>
        <div className="row ">
          <div>
            <h5>Employee: {item.employee_name}</h5>
            <h5>Email: {item.employee_email}</h5>
          </div>

          <div className="col-md-12">
            <div>
              <label className="form-label">Authority ( {item.step===1&& `${item.step}st`} {item.step===2&& `${item.step}nd`} {item.step===3&& `${item.step}nd`} Step)</label>
            </div>

            <select
              className="form-control"
              name="approval_authority_id"
              onChange={formik.handleChange}
              value={formik.values.approval_authority_id}
            >
          
              {authorityList.isSuccess &&
                authorityList?.data?.data?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
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
  );
};

export default EditLeaveApprovalFlow;
