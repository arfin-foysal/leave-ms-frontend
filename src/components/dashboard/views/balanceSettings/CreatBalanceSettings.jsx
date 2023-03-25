import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import { useGetEmploymentTypeListQuery } from "../../../../services/employmentApi";
import { useGetLeavePolicyListQuery } from "../../../../services/leavepolicyApi";
import { useLeaveBalanceSettingSaveOrUpdateMutation } from "../../../../services/leaveBalanceSettingsApi";

const CreatBalanceSettings = ({ handleClose }) => {
  const { data } = useGetCompanyListQuery();
  const { data: LeavePolicy } = useGetLeavePolicyListQuery();
  const { data: EmploymentType } = useGetEmploymentTypeListQuery();

  const [leaveBalanceSettingSaveOrUpdate, res] =
    useLeaveBalanceSettingSaveOrUpdateMutation();

  const formik = useFormik({
    initialValues: {
      company_id: "",
      leave_policy_id: "",
      employment_type_id: "",
      total_days: "",
      is_active: true,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await leaveBalanceSettingSaveOrUpdate(values).unwrap();
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
                <label className="col-sm-3 col-form-label">
                  Employment Type
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control form-select"
                    name="employment_type_id"
                    onChange={formik.handleChange}
                    value={formik.values.employment_type_id}
                  >
                    <option>Selact</option>
                    {EmploymentType?.data?.map((employmentType, i) => (
                      <option key={i} value={employmentType.id}>
                        {employmentType.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Leave Type</label>
                <div className="col-sm-9">
                  <select
                    className="form-control form-select"
                    name="leave_policy_id"
                    onChange={formik.handleChange}
                    value={formik.values.leave_policy_id}
                  >
                    <option>Selact</option>
                    {LeavePolicy?.data?.map((Leave, i) => (
                      <option key={i} value={Leave.id}>
                        {Leave.leave_title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Total Days</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0"
                    name="total_days"
                    onChange={formik.handleChange}
                    value={formik.values.total_days}
                    required
                  />
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

export default CreatBalanceSettings;
