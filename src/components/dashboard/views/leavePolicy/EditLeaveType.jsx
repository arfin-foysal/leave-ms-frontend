import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import { useLeavePolicySaveOrUpdateMutation } from "../../../../services/leavepolicyApi";

const EditLeaveType = ({ handleClose ,item}) => {
  const { data } = useGetCompanyListQuery();
  const [leavePolicySaveOrUpdate, res] = useLeavePolicySaveOrUpdateMutation();


  const formik = useFormik({
    initialValues: {
      id:item.id,
      company_id: item.company_id,
      leave_title: item.leave_title,
      leave_short_code: item.leave_short_code,
      total_days: item.total_days,
      is_applicable_for_all: item.is_applicable_for_all,
      applicable_for: item.applicable_for,
      is_leave_cut_applicable: item.is_leave_cut_applicable,
      is_carry_forward: item.is_carry_forward,
      is_document_upload: item.is_document_upload,
      is_holiday_deduct: item.is_holiday_deduct,
      document_upload_after_days: item.document_upload_after_days,
      max_carry_forward_days: item.max_carry_forward_days,
      is_active: item.is_active,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await leavePolicySaveOrUpdate(values).unwrap();
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
      <div className="card-body">
        <form className="form-sample"  onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Leave Title</label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="leave_title"
                    onChange={formik.handleChange}
                    value={formik.values.leave_title}
                    
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  leave Short Code
                </label>
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control"
                    name="leave_short_code"
                    onChange={formik.handleChange}
                    value={formik.values.leave_short_code}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Total Days</label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="total_days"
                    onChange={formik.handleChange}
                    value={formik.values.total_days}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Applicable For
                </label>
                <div className="col-sm-7">
                  <select
                    className="form-control"
                    name="applicable_for"
                    onChange={formik.handleChange}
                    value={formik.values.applicable_for}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Document Upload After Days
                </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="document_upload_after_days"
                    onChange={formik.handleChange}
                    value={formik.values.document_upload_after_days}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">
                  Max Carry Forward Days
                </label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control"
                    name="max_carry_forward_days"
                    onChange={formik.handleChange}
                    value={formik.values.max_carry_forward_days}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Company</label>
                <div className="col-sm-7">
                  <select
                    className="form-control"
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

            <div className="row mt-3">
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    {" "}
                    Is Applicable For All
                  </label>
                  <div className="col-sm-8">
                    <div class="form-check form-switch mt-1">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active"
                        name="is_applicable_for_all"
                        onChange={formik.handleChange}
                        value={formik.values.is_applicable_for_all}
                        checked={formik.values.is_applicable_for_all}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    {" "}
                    Is Leave Cut Applicable
                  </label>
                  <div className="col-sm-8">
                    <div class="form-check form-switch mt-1">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active"
                        name="is_leave_cut_applicable"
                        onChange={formik.handleChange}
                        value={formik.values.is_leave_cut_applicable}
                        checked={formik.values.is_leave_cut_applicable}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Is Carry Forward
                  </label>
                  <div className="col-sm-8">
                    <div class="form-check form-switch mt-1">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active"
                        name="is_carry_forward"
                        onChange={formik.handleChange}
                        value={formik.values.is_carry_forward}
                        checked={formik.values.is_carry_forward}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Is Document Upload
                  </label>
                  <div className="col-sm-8">
                    <div class="form-check form-switch mt-1">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active"
                        name="is_document_upload"
                        onChange={formik.handleChange}
                        value={formik.values.is_document_upload}
                        checked={formik.values.is_document_upload}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Is Holiday Deduct
                  </label>
                  <div className="col-sm-8">
                    <div class="form-check form-switch mt-1">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active"
                        name="is_holiday_deduct"
                        onChange={formik.handleChange}
                        value={formik.values.is_holiday_deduct}
                        checked={formik.values.is_holiday_deduct}
                      />
                    </div>
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

export default EditLeaveType;
