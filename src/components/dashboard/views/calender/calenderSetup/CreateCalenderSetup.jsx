import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import { useGenerateCalenderMutation } from "../../../../../services/calenderApi";

const CreateCalenderSetup = ({ handleClose }) => {


  const [generateCalender, res] =
    useGenerateCalenderMutation();
  
  const formik = useFormik({
    initialValues: {
      academic_year:"",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await generateCalender(values).unwrap();
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
      <ToastContainer/>
      <div className="card-body">
        <form className="form-sample" onSubmit={formik.handleSubmit}>
          <div className="row">
    
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Year</label>
                <div className="col-sm-12">

                <input
                    type="number"
                    className="form-control"
                    name="academic_year"
                    placeholder="Enter Year"
                    onChange={formik.handleChange}
                    value={formik.values.academic_year}
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

export default CreateCalenderSetup;
