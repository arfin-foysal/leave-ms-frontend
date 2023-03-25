import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import Select from "./../workingDaySetup/Select";
import { useUpdateCalenderMutation } from "../../../../../services/calenderApi";

const EditCalenderSetup = ({ handleClose, item }) => {
  const [updateCalender, res] = useUpdateCalenderMutation();
  const formik = useFormik({
    initialValues: {
      id: item.id,
      date: item.date,
      day_type_id: item.day_type_id,
      day_note: item.day_note,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await updateCalender(values).unwrap();
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
                <label className="col-sm-12 col-form-label">Date</label>
                <div className="col-sm-12">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Day Type</label>
                <div className="col-sm-12">
                  <Select
                    name="day_type_id"
                    onChange={formik.handleChange}
                    value={formik.values.day_type_id}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Day Note</label>
                <div className="col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    name="day_note"
                    onChange={formik.handleChange}
                    value={formik.values.day_note}
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

export default EditCalenderSetup;
