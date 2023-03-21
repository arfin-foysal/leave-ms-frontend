import React from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAddOffboardingMutation } from "../../../../services/employeeApi";

const OffboardModal = ({ handleClose, show, clickValue, paramId }) => {
    const [addOffboarding, res] = useAddOffboardingMutation();

  const formik = useFormik({
    initialValues: {

      offboarding_date: "",
    },
    onSubmit: async (values, { resetForm }) => {
        try {
          const result = await addOffboarding({
            employee_id: paramId,
            offboarding_date: values.rejection_cause,
          }).unwrap();
          if (result.status) {
            resetForm();
            handleClose();
          }
          toast.success(result.message);
        } catch (error) {
          toast.error(error.data.message);
        }
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="fs-6">{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>

            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group text-center">
                <label >Offboarding Date </label>

                <input className=" form-control" type="date"
                  name="offboarding_date"
                  onChange={formik.handleChange}
                  value={formik.values.offboarding_date}
                  id="" />

          
              </div>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-danger">
                  Offboard
                </button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OffboardModal;
