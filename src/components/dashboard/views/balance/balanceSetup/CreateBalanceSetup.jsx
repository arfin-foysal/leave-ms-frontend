import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

import { useGetEmploymentTypeListQuery } from "../../../../../services/employmentApi";
import { useGetEmployeeListQuery } from "../../../../../services/employeeApi";
import { useLeaveSettingManuallyMutation } from "../../../../../services/balanceSetupApi";

const CreateBalanceSetup = ({ handleClose }) => {
  const res = useGetEmployeeListQuery();
  const [employeeId, setEmployeeId] = useState("");
  const { data: EmploymentType } = useGetEmploymentTypeListQuery();

  const [leaveSettingManually, leaveRse] = useLeaveSettingManuallyMutation();

  const formik = useFormik({
    initialValues: {
      employment_type_id: "",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const data = {
          employee_id: employeeId,
          employment_type_id: Number(values.employment_type_id),
        };

        const result = await leaveSettingManually(data).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (leaveRse.isSuccess) {
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
                <label className="col-sm-12 col-form-label">Employee</label>
                <div className="col-sm-12">
                  <Select
                    placeholder="Select Employee"
                    classNamePrefix="balance-setup"
                    onChange={(e) => setEmployeeId(e.id)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) => `${option["name"]}`}
                    options={res.isSuccess && res.data?.data}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">
                  Employment Type
                </label>
                <div className="col-sm-12">
                  <select
                    className="form-control
                    form-select"
                    name="employment_type_id"
                    onChange={formik.handleChange}
                    value={formik.values.employment_type_id}
                  >
                    <option>Selact Type</option>
                    {EmploymentType?.data?.map((employmentType, i) => (
                      <option key={i} value={employmentType.id}>
                        {employmentType.type}
                      </option>
                    ))}
                  </select>
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

export default CreateBalanceSetup;
