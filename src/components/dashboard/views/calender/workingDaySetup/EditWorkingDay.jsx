import { useFormik } from "formik";
import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Select from "./Select";
import { useUpdateWorkingdayStatusMutation } from "../../../../../services/calenderApi";

const EditWorkingDays = ({ item, handleClose }) => {
  const [updateWorkingdayStatus, res] = useUpdateWorkingdayStatusMutation();

  const initialValues = {
    id: item?.id,
    saturday: item?.saturday,
    sunday: item?.sunday,
    monday: item?.monday,
    tuesday: item?.tuesday,
    wednesday: item?.wednesday,
    thursday: item?.thursday,
    friday: item?.friday,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await updateWorkingdayStatus(values).unwrap();
        toast.success(result.message);
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
                <label className="col-sm-12 col-form-label">Saturday</label>
                <div className="col-sm-12">
                  <Select
                    name="saturday"
                    onChange={formik.handleChange}
                    value={formik.values.saturday}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Sunday</label>
                <div className="col-sm-12">
                  <Select
                    className="form-control"
                    name="sunday"
                    onChange={formik.handleChange}
                    value={formik.values.sunday}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Monday</label>
                <div className="col-sm-12">
                  <Select
                    className="form-control"
                    name="monday"
                    onChange={formik.handleChange}
                    value={formik.values.monday}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Tuesday</label>
                <div className="col-sm-12">
                  <Select
                    className="form-control"
                    name="tuesday"
                    onChange={formik.handleChange}
                    value={formik.values.tuesday}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Wednesday</label>
                <div className="col-sm-12">
                  <Select
                    className="form-control"
                    name="wednesday"
                    onChange={formik.handleChange}
                    value={formik.values.wednesday}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Thursday</label>
                <div className="col-sm-12">
                  <Select
                    className="form-control"
                    name="thursday"
                    onChange={formik.handleChange}
                    value={formik.values.thursday}
                  ></Select>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Friday</label>
                <div className="col-sm-12">
                  <Select
                    className="form-control"
                    name="friday"
                    onChange={formik.handleChange}
                    value={formik.values.friday}
                  ></Select>
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

export default EditWorkingDays;
