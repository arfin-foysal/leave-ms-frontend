import React from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRejectLeaveMutation } from "../../../../../services/leaveApplication";

const RejectionModal = ({ handleClose, show, clickValue, paramId }) => {
    const [rejectLeave, res] = useRejectLeaveMutation();

  const formik = useFormik({
    initialValues: {
      rejection_cause: "",
    },
    onSubmit: async (values, { resetForm }) => {
        try {
          const result = await rejectLeave({
            leave_application_id: paramId,
            rejection_cause: values.rejection_cause,
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
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group text-center">
                <label htmlFor="rejection_cause">Rejection Cause </label>

                <textarea
                  required
                  type="text"
                  className="form-control"
                  id="rejection_cause"
                  placeholder="Rejection Cause ...
                  "
                  name="rejection_cause"
                  onChange={formik.handleChange}
                  value={formik.values.rejection_cause}
                />
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
                  Reject
                </button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RejectionModal;
