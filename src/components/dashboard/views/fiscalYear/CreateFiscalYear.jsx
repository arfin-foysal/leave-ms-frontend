import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import { useFascalYearSaveOrUpdateMutation } from "../../../../services/fiscalyearApi";

const CreateFiscalYear = ({ handleClose }) => {
  const { data } = useGetCompanyListQuery();
  const [fascalYearSaveOrUpdate, res] = useFascalYearSaveOrUpdateMutation();

  const formik = useFormik({
    initialValues: {
      company_id: "",
      fiscal_year: "",
      start_date: "",
      end_date: "",
      is_active: true,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await fascalYearSaveOrUpdate(values).unwrap();
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
                <label className="col-sm-3 col-form-label">Fiscal Year</label>
                <div className="col-sm-9">
                  <input
                  placeholder="Fiscal Year"
                    type="text"
                    className="form-control"
                    name="fiscal_year"
                    onChange={formik.handleChange}
                    value={formik.values.fiscal_year}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Start Date</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    onChange={formik.handleChange}
                    value={formik.values.start_date}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">End Date</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    name="end_date"
                    onChange={formik.handleChange}
                    value={formik.values.end_date}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Is Active</label>
                <div className="col-sm-8">
                  <div class="form-check form-switch mt-2">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label=""
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

export default CreateFiscalYear;
