import { useFormik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useLeaveBalanceUpdateMutation } from "../../../../../services/balanceSetupApi";


const EditBalanceSetup = ({ handleClose, item }) => {
  const [leaveBalanceUpdate, res] = useLeaveBalanceUpdateMutation();



  const formik = useFormik({
    initialValues: {
      id: item.id,
      total_days: item.total_days,
      availed_days: item.availed_days,
      remaining_days: item.remaining_days,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.total_days === values.availed_days + values.remaining_days) {
          const result = await leaveBalanceUpdate(values).unwrap();
          toast.success(result.message);
          resetForm();
        } else {
          toast.warn("Total days must be equal to availed days and remaining days");
        }
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
                <label className="col-sm-6 col-form-label">Total Days</label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control"
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
                <label className="col-sm-6 col-form-label">Availed Days</label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    name="availed_days"
                    onChange={formik.handleChange}
                    value={formik.values.availed_days}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-6 col-form-label">
                  Remaining Days
                </label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    name="remaining_days"
                    onChange={formik.handleChange}
                    value={formik.values.remaining_days}
                    required
                  />
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

export default EditBalanceSetup;
