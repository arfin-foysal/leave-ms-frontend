import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import { useGetBranchListByCompanyIdQuery } from "../../../../services/branchApi";
import { useGetDesignationtListByCompanyAndBranchIdQuery } from "../../../../services/designationApi";
import { useGetDepartmentListByCompanyAndBranchIdQuery } from "../../../../services/departmentApi";
import { useGetEmploymentTypeListQuery } from "../../../../services/employmentApi";
import {
  useAddEmployeeMutation,
  useGetAreaListByIdQuery,
  useGetDistrictListByIdQuery,
  useGetDivisionListQuery,
  useGetUpazilaListByIdQuery,
} from "../../../../services/employeeApi";
import { toast } from "react-toastify";
import { employeeSchema } from "./../../../../Validation/employeeSchema";
import avater from "../../../../assets/images/profile-picture.png";
import { useGetWingListQuery } from "../../../../services/wingApi";
const CreateEmployee = () => {
  const navigate = useNavigate();
  const companyRes = useGetCompanyListQuery();
  const employmentRes = useGetEmploymentTypeListQuery();
  const divisionRes = useGetDivisionListQuery();

  const [addEmployee, empRes] = useAddEmployeeMutation();
  const [previewImage, setPreviewImage] = useState();
  const [divisions_id, setdivision_id] = useState();
  const [districts_id, setdistrict_id] = useState();
  const [city_id, setcity_id] = useState();
  const [company_id, setCompany_id] = useState();
  const [branch_id, setBranch_id] = useState();
  const [keySkillis, setKeySkillis] = useState();

  const editor = useRef(null);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    institution: "",
    education: "",
    present_address: "",
    permanent_address: "",
    father_name: "",
    fathers_contact_number: "",
    mother_name: "",
    mothers_contact_number: "",
    date_of_birth: "",
    employee_id: "",
    nid: "",
    joining_date: "",
    marital_status: "",
    company_id: "",
    branch_id: "",
    department_id: "",
    wing_id:"",
    designation_id: "",
    division_id: "",
    gender: "",
    district_id: "",
    city_id: "",
    area_id: "",
    is_active: true,
    image: "",
    blood_group: "",
    office_contact_number: "",
    finger_print_id: "",
    personal_alt_contact_number: "",
    personal_email: "",
    passport_number: "",
    spouse_name: "",
    spouse_number: "",
    referee_office: "",
    referee_relative: "",
    referee_contact_details: "",
    // key_skills: "",
    highest_level_of_study: "",
    e_tin: "",
    applicable_tax_amount: "",
    official_achievement: "",
    remarks: "",
    employment_type_id: "",
    user_type: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: employeeSchema,
    onSubmit: async (values, errors) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("institution", values.institution);
      formData.append("education", values.education);
      formData.append("present_address", values.present_address);
      formData.append("permanent_address", values.permanent_address);
      formData.append("father_name", values.father_name);
      formData.append("fathers_contact_number", values.fathers_contact_number);
      formData.append("mother_name", values.mother_name);
      formData.append("mothers_contact_number", values.mothers_contact_number);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("employee_id", values.employee_id);
      formData.append("nid", values.nid);
      formData.append("joining_date", values.joining_date);
      formData.append("marital_status", values.marital_status);
      formData.append("company_id", values.company_id);
      formData.append("branch_id", values.branch_id);
      formData.append("department_id", values.department_id);
      formData.append("wing_id", values.wing_id);
      formData.append("designation_id", values.designation_id);
      formData.append("division_id", values.division_id);
      formData.append("gender", values.gender);
      formData.append("district_id", values.district_id);
      formData.append("city_id", values.city_id);
      formData.append("area_id", values.area_id);
      formData.append("is_active", values.is_active);
      formData.append("image", values.image);
      formData.append("blood_group", values.blood_group);
      formData.append("office_contact_number", values.office_contact_number);
      formData.append("finger_print_id", values.finger_print_id);
      formData.append(
        "personal_alt_contact_number",
        values.personal_alt_contact_number
      );
      formData.append("personal_email", values.personal_email);
      formData.append("passport_number", values.passport_number);
      formData.append("spouse_name", values.spouse_name);
      formData.append("spouse_number", values.spouse_number);
      formData.append("referee_office", values.referee_office);
      formData.append("referee_relative", values.a);
      formData.append(
        "referee_contact_details",
        values.referee_contact_details
      );
      formData.append("key_skills", keySkillis);
      formData.append("highest_level_of_study", values.highest_level_of_study);
      formData.append("e_tin", values.e_tin);
      formData.append("applicable_tax_amount", values.applicable_tax_amount);
      formData.append("official_achievement", values.official_achievement);
      formData.append("remarks", values.remarks);
      formData.append("employment_type_id", values.employment_type_id);
      formData.append("user_type", values.user_type);
      try {
        const result = await addEmployee(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (empRes.isSuccess) {
    navigate("/dashboard/approval-authority/employee-list");
  }

  const focusHandelerOne = (name, id) => {
    setdivision_id(id);
    if (name === "division_id") {
      setdistrict_id(null);
      setcity_id(null);
    }
  };

  const focusHandelerTwo = (name, id) => {
    setdistrict_id(id);
    if (name === "district_id") {
      setcity_id(null);
    }
  };

  const districtRes = useGetDistrictListByIdQuery(divisions_id);
  const upazilaRes = useGetUpazilaListByIdQuery(districts_id);
  const areaRes = useGetAreaListByIdQuery(city_id);
  const branchRes = useGetBranchListByCompanyIdQuery(company_id);
 const wingRes= useGetWingListQuery();

  const departmentRes = useGetDepartmentListByCompanyAndBranchIdQuery({
    comId: company_id,
    braId: branch_id,
  });

  const designationRes = useGetDesignationtListByCompanyAndBranchIdQuery({
    comId: company_id,
    braId: branch_id,
  });

  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <div className=" card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">
              Create Employee
            </h6>
          </div>
          <div>
            <BsFillArrowLeftCircleFill
              onClick={() => navigate(-1)}
              className="cursor"
              color="black"
              size={20}
            />
          </div>
        </div>
        <div className="card-body">
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <h5 className="card-description text-info py-2">
              {" "}
              Personal Information :{" "}
            </h5>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Employee Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Employee Name"
                      className={
                        formik.errors.name && formik.touched.name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Personal e-mail ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="personal_email"
                      placeholder="Enter Personal e-mail ID"
                      onChange={formik.handleChange}
                      value={formik.values.personal_email}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Personal Contact Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Enter Personal Contact Number"
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.mobile && formik.touched.mobile
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.mobile && formik.touched.mobile ? (
                      <div className="invalid-feedback">
                        {formik.errors.mobile}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Personal Alt. Contact Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Personal Alt. Contact Number"
                      name="personal_alt_contact_number"
                      onChange={formik.handleChange}
                      value={formik.values.personal_alt_contact_number}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Father Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="father_name"
                      placeholder="Enter Father Name"
                      onChange={formik.handleChange}
                      value={formik.values.father_name}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.father_name && formik.touched.father_name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.father_name && formik.touched.father_name ? (
                      <div className="invalid-feedback">
                        {formik.errors.father_name}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Fathers Contact Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      placeholder="Enter Fathers Contact Number"
                      className="form-control"
                      name="fathers_contact_number"
                      onChange={formik.handleChange}
                      value={formik.values.fathers_contact_number}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Mother Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="mother_name"
                      onChange={formik.handleChange}
                      placeholder="Enter Mother Name"
                      value={formik.values.mother_name}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.mother_name && formik.touched.mother_name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.mother_name && formik.touched.mother_name ? (
                      <div className="invalid-feedback">
                        {formik.errors.mother_name}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Mothers Contact Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      placeholder="Enter Mothers Contact Number"
                      className="form-control"
                      name="mothers_contact_number"
                      onChange={formik.handleChange}
                      value={formik.values.mothers_contact_number}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Marital Status
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="marital_status"
                      onChange={formik.handleChange}
                      value={formik.values.marital_status}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.marital_status &&
                        formik.touched.marital_status
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option value="">Selact Status</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                      <option value="Dnmarried">Dnmarried</option>
                    </select>
                    {formik.errors.marital_status &&
                    formik.touched.marital_status ? (
                      <div className="invalid-feedback">
                        {formik.errors.marital_status}
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Spouse Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Spouse Name"
                      name="spouse_name"
                      onChange={formik.handleChange}
                      value={formik.values.spouse_name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Spouse Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Spouse Number"
                      name="spouse_number"
                      onChange={formik.handleChange}
                      value={formik.values.spouse_number}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Gender</label>
                  <div className="col-sm-9">
                    <select
                      name="gender"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.gender && formik.touched.gender
                          ? "form-control is-invalid "
                          : "form-control form-select"
                      }
                    >
                      <option>Selact Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                    {formik.errors.gender && formik.touched.gender ? (
                      <div className="invalid-feedback">
                        {formik.errors.gender}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Date of Birth
                  </label>
                  <div className="col-sm-9">
                    <input
                      placeholder="dd/mm/yyyy"
                      name="date_of_birth"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.date_of_birth}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.date_of_birth &&
                        formik.touched.date_of_birth
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.date_of_birth &&
                    formik.touched.date_of_birth ? (
                      <div className="invalid-feedback">
                        {formik.errors.date_of_birth}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    NID/Birth ID/ Driving License Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="nid"
                      placeholder="Enter NID/Birth ID/ Driving License Number"
                      onChange={formik.handleChange}
                      value={formik.values.nid}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.nid && formik.touched.nid
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.nid && formik.touched.nid ? (
                      <div className="invalid-feedback">
                        {formik.errors.nid}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Passport Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Passport Number"
                      name="passport_number"
                      onChange={formik.handleChange}
                      value={formik.values.passport_number}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Blood Group</label>
                  <div className="col-sm-9">
                    <select
                      className="form-control form-select"
                      name="blood_group"
                      onChange={formik.handleChange}
                      value={formik.values.blood_group}
                    >
                      <option>Selact Group</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O+">O+</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Institution</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="institution"
                      placeholder="Enter Institution"
                      onChange={formik.handleChange}
                      value={formik.values.institution}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Education</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Education"
                      name="education"
                      onChange={formik.handleChange}
                      value={formik.values.education}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Referee (office)
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      placeholder="Enter Referee (office)"
                      className="form-control"
                      name="referee_office"
                      onChange={formik.handleChange}
                      value={formik.values.referee_office}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Referee (Relative)
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Referee (Relative)"
                      name="referee_relative"
                      onChange={formik.handleChange}
                      value={formik.values.referee_relative}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Referee Contact Details
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Referee Contact Details"
                      name="referee_contact_details"
                      onChange={formik.handleChange}
                      value={formik.values.referee_contact_details}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Highest Level of Study
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="highest_level_of_study"
                      placeholder="Enter Highest Level of Study"
                      onChange={formik.handleChange}
                      value={formik.values.highest_level_of_study}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">e-TIN</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter e-TIN"
                      name="e_tin"
                      onChange={formik.handleChange}
                      value={formik.values.e_tin}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Applicable Tax Amount
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Applicable Tax Amount"
                      name="applicable_tax_amount"
                      onChange={formik.handleChange}
                      value={formik.values.applicable_tax_amount}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Remarks</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Remarks"
                      name="remarks"
                      onChange={formik.handleChange}
                      value={formik.values.remarks}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Official Achievement
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Official Achievement"
                      name="official_achievement"
                      onChange={formik.handleChange}
                      value={formik.values.official_achievement}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Key Skills</label>
                  <div className="col-sm-9">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      className="form-control"
                      name="key_skills"
                      onChange={formik.handleChange}
                      value={formik.values.key_skills}
                    ></textarea>
                  </div>
                </div>
              </div> */}

              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Key Skills</label>
                  <JoditEditor
                    ref={editor}
                    value={keySkillis}
                    // name="key_skills"
                    tabIndex={1}
                    onBlur={(newContent) => setKeySkillis(newContent)} // preferred to use only this option to update the content for performance reasons
                    // onChange={(newContent) => {setDescription(newContent.target.value)}}
                  />
                </div>
              </div>
            </div>
            <h5 className="card-description text-info py-2">
              {" "}
              Company Information :{" "}
            </h5>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    {" "}
                    Office ID Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="employee_id"
                      onChange={formik.handleChange}
                      value={formik.values.employee_id}
                      placeholder="Enter Office ID Number"
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.employee_id && formik.touched.employee_id
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {formik.errors.employee_id && formik.touched.employee_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.employee_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Office e-Mail ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Office e-Mail ID"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Office Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Office Number"
                      name="office_contact_number"
                      onChange={formik.handleChange}
                      value={formik.values.office_contact_number}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Finger Print ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      name="finger_print_id"
                      placeholder="Enter Finger Print ID"
                      onChange={formik.handleChange}
                      value={formik.values.finger_print_id}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Company</label>
                  <div className="col-sm-9">
                    <select
                      className={
                        formik.errors.company_id && formik.touched.company_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      name="company_id"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setCompany_id(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.company_id}
                    >
                      <option>Selact Company</option>
                      {companyRes?.data?.data?.map((company, i) => (
                        <option key={i} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.company_id && formik.touched.company_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.company_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Joining Date
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="date"
                      name="joining_date"
                      onChange={formik.handleChange}
                      value={formik.values.joining_date}
                      className={
                        formik.errors.joining_date &&
                        formik.touched.joining_date
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.joining_date &&
                    formik.touched.joining_date ? (
                      <div className="invalid-feedback">
                        {formik.errors.joining_date}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Branch</label>
                  <div className="col-sm-9">
                    <select
                      name="branch_id"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setBranch_id(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.branch_id}
                      className={
                        formik.errors.branch_id && formik.touched.branch_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option>Selact Branch</option>
                      {branchRes?.data?.data?.map((branch, i) => (
                        <option key={i} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.branch_id && formik.touched.branch_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.branch_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Department</label>
                  <div className="col-sm-9">
                    <select
                      name="department_id"
                      onChange={formik.handleChange}
                      value={formik.values.department_id}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.department_id &&
                        formik.touched.department_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option>Selact Department</option>
                      {departmentRes?.data?.data?.map((department, i) => (
                        <option key={i} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.department_id &&
                    formik.touched.department_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.department_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Wing
                  </label>
                  <div className="col-sm-9">
                  <select
                      name="wing_id"
                      onChange={formik.handleChange}
                      value={formik.values.wing_id}
                      onBlur={formik.handleBlur}
                      className="form-control "
                      
                    >
                      <option>Selact wing</option>
                      {wingRes?.data?.data?.map((wing, i) => (
                        <option key={i} value={wing.id}>
                          {wing.name}
                        </option>
                      ))}
                    </select>
     
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Designation</label>
                  <div className="col-sm-9">
                    <select
                      name="designation_id"
                      onChange={formik.handleChange}
                      value={formik.values.designation_id}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.designation_id &&
                        formik.touched.designation_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option>Selact Designation</option>
                      {designationRes?.data?.data?.map((designation, i) => (
                        <option key={i} value={designation.id}>
                          {designation.title}
                        </option>
                      ))}
                    </select>
                    {formik.errors.designation_id &&
                    formik.touched.designation_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.designation_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Employment</label>
                  <div className="col-sm-9">
                    <select
                      name="employment_type_id"
                      onChange={formik.handleChange}
                      value={formik.values.employment_type_id}
                      className={
                        formik.errors.employment_type_id &&
                        formik.touched.employment_type_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option>Selact Employment</option>
                      {employmentRes?.data?.data?.map((employment, i) => (
                        <option key={i} value={employment.id}>
                          {employment.type}
                        </option>
                      ))}
                    </select>
                    {formik.errors.employment_type_id &&
                    formik.touched.employment_type_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.employment_type_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <h5 className="card-description text-info py-2"> Address : </h5>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Present Address
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      type="text"
                      name="present_address"
                      placeholder="Present Address"
                      onChange={formik.handleChange}
                      value={formik.values.present_address}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.present_address &&
                        formik.touched.present_address
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    ></textarea>
                    {formik.errors.present_address &&
                    formik.touched.present_address ? (
                      <div className="invalid-feedback">
                        {formik.errors.present_address}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Permanent Address
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      type="text"
                      name="permanent_address"
                      onChange={formik.handleChange}
                      placeholder="Permanent Address"
                      value={formik.values.permanent_address}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.permanent_address &&
                        formik.touched.permanent_address
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    ></textarea>
                    {formik.errors.permanent_address &&
                    formik.touched.permanent_address ? (
                      <div className="invalid-feedback">
                        {formik.errors.permanent_address}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Division</label>
                  <div className="col-sm-9">
                    <select
                      name="division_id"
                      onChange={(e) => {
                        formik.handleChange(e);
                        focusHandelerOne(e.target.name, e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.division_id}
                      className={
                        formik.errors.division_id && formik.touched.division_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option>Selact Division</option>
                      {divisionRes?.data?.data?.map((division, i) => (
                        <option key={i} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.division_id && formik.touched.division_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.division_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">District</label>
                  <div className="col-sm-9">
                    <select
                      name="district_id"
                      onChange={(e) => {
                        formik.handleChange(e);
                        focusHandelerTwo(e.target.name, e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.district_id}
                      className={
                        formik.errors.district_id && formik.touched.district_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option>Selact District</option>
                      {districtRes?.data?.data?.map((district, i) => (
                        <option key={i} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.district_id && formik.touched.district_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.district_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">City</label>
                  <div className="col-sm-9">
                    <select
                      name="city_id"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setcity_id(e.target.value);
                      }}
                      value={formik.values.city_id}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.city_id && formik.touched.city_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option>Selact City</option>
                      {upazilaRes?.data?.data?.map((upazila, i) => (
                        <option key={i} value={upazila.id}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.city_id && formik.touched.city_id ? (
                      <div className="invalid-feedback">
                        {formik.errors.city_id}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Area</label>
                  <div className="col-sm-9">
                    <select
                      className="form-control form-select"
                      name="area_id"
                      onChange={formik.handleChange}
                      value={formik.values.area_id}
                      onBlur={formik.handleBlur}
                    >
                      <option>Selact Area</option>
                      {areaRes?.data?.data?.map((area, i) => (
                        <option key={i} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-6 pt-4">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Image</label>
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control "
                      name="image"
                      onChange={(e) => {
                        formik.setFieldValue("file", e.currentTarget.files[0]);
                        handelImage(e);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 pt-1">
                
              <div>
              <img
                className="py-2 rounded-circle"
                src={previewImage?previewImage:avater}
                width="80px"
                height="80px"
                alt=""
              />
            </div>
              </div>

              <h5 className="card-description text-info mt-3  py-2">
                Employee Role :
              </h5>

              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">User Type</label>
                  <div className="col-sm-9">
                    <select
                      name="user_type"
                      onChange={formik.handleChange}
                      value={formik.values.user_type}
                      className={
                        formik.errors.user_type && formik.touched.user_type
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      placeholder="Select User Type"
                    >
                      <option value="Employee">Employee</option>

                      <option value="ApprovalAuthority">
                        Approval Authority
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Others">Others</option>
                    </select>
                    {formik.errors.user_type && formik.touched.user_type ? (
                      <div className="invalid-feedback">
                        {formik.errors.user_type}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-4 col-md-1 col-form-label">
                    Is Active
                  </label>
                  <div className="col-sm-8 ps-4 ">
                    <div class="form-check form-switch mt-2">
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



            <div className=" py-5">
              <Button className="btn btn-success px-5" type="submit">
                Submit
              </Button>
              <Button   onClick={() => navigate(-1)} className="btn btn-dark px-5 ms-3" type="button">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
