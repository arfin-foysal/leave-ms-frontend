import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useRef, useState, useEffect } from "react";
import { useGetCompanyListQuery } from "../../../../services/companyApi";
import { useGetBranchListByCompanyIdQuery } from "../../../../services/branchApi";
import { useGetDesignationtListByCompanyAndBranchIdQuery } from "../../../../services/designationApi";
import { useGetDepartmentListByCompanyAndBranchIdQuery } from "../../../../services/departmentApi";
import { useGetEmploymentTypeListQuery } from "../../../../services/employmentApi";
import {
  useGetAreaListByIdQuery,
  useGetDistrictListByIdQuery,
  useGetDivisionListQuery,
  useGetUpazilaListByIdQuery,
  useUpdateEmployeeMutation,
  useEmployeeDetailsByIdQuery,
} from "../../../../services/employeeApi";
import { toast } from "react-toastify";
import { editEmployeeSchema } from "./../../../../Validation/editEmployeeSchema";
import avater from "../../../../assets/images/profile-picture.png";
import { useGetWingListQuery } from "../../../../services/wingApi";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // <==============data request strat===================>

  const companyRes = useGetCompanyListQuery();
  const employmentRes = useGetEmploymentTypeListQuery();
  const divisionRes = useGetDivisionListQuery();
  const empDetailsRes = useEmployeeDetailsByIdQuery(id);
  const [updateEmployee, empRes] = useUpdateEmployeeMutation();

  // <==============data request end===================>

  const [previewImage, setPreviewImage] = useState();
  const [divisions_id, setdivision_id] = useState();
  const [districts_id, setdistrict_id] = useState();
  const [city_id, setcity_id] = useState();
  const [company_id, setCompany_id] = useState();
  const [branch_id, setBranch_id] = useState();
  const [area_id, setarea_id] = useState();
  const [designation_id, setdesignation_id] = useState();
  const [department_id, setdepartment_id] = useState();

  const [keySkillis, setKeySkillis] = useState();

  const initialValues = {
    name: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.name,

    mobile: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.mobile,
    institution:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.institution,
    education: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.education,
    present_address:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.present_address,
    permanent_address:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.permanent_address,
    father_name:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.father_name,
    fathers_contact_number:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.fathers_contact_number,
    mother_name:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.mother_name,
    mothers_contact_number:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.mothers_contact_number,
    date_of_birth:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.date_of_birth,
    employee_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.employee_id,
    nid: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.nid,
    joining_date:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.joining_date,
    marital_status:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.marital_status,
    company_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.company_id,
    branch_id: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.branch_id,
    department_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.department_id,
    
    wing_id: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.wing_id,

    designation_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.designation_id,
    division_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.division_id,
    gender: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.gender,
    district_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.district_id,
    city_id: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.city_id,
    area_id: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.area_id,
    is_active: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.is_active,
    image: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.image,
    blood_group:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.blood_group,
    office_contact_number:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.office_contact_number,
    finger_print_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.finger_print_id,
    personal_alt_contact_number:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.personal_alt_contact_number,
    personal_email:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.personal_email,
    passport_number:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.passport_number,
    spouse_name:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.spouse_name,
    spouse_number:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.spouse_number,
    referee_office:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.referee_office,
    referee_relative:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.referee_relative,
    referee_contact_details:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.referee_contact_details,
    // key_skills:
    //   empDetailsRes.isSuccess && empDetailsRes?.data?.data?.key_skills,
    highest_level_of_study:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.highest_level_of_study,
    e_tin: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.e_tin,
    applicable_tax_amount:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.applicable_tax_amount,
    official_achievement:
      empDetailsRes.isSuccess &&
      empDetailsRes?.data?.data?.official_achievement,
    remarks: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.remarks,
    employment_type_id:
      empDetailsRes.isSuccess && empDetailsRes?.data?.data?.employment_type_id,
    user_type: empDetailsRes.isSuccess && empDetailsRes?.data?.data?.user_type,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: editEmployeeSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("name", values.name);
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
      formData.append("gender", values.gender);
      formData.append("employee_id", values.employee_id);
      formData.append("nid", values.nid);
      formData.append("joining_date", values.joining_date);
      formData.append("marital_status", values.marital_status);
      formData.append("company_id", company_id);
      formData.append("branch_id", branch_id);
      formData.append("department_id", department_id);
      
      formData.append("wing_id", values.wing_id);
      formData.append("designation_id", designation_id);
      formData.append("division_id", divisions_id);
      formData.append("district_id", districts_id);
      formData.append("city_id", city_id);
      formData.append("area_id", area_id);
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
      formData.append("referee_relative", values.referee_relative);
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
        const result = await updateEmployee(formData).unwrap();
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

  useEffect(() => {
    if (empDetailsRes.isSuccess) {
      setKeySkillis(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.key_skills
      );
      setdivision_id(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.division_id
      );
      setdistrict_id(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.district_id
      );
      setcity_id(empDetailsRes.isSuccess && empDetailsRes?.data?.data?.city_id);
      setCompany_id(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.company_id
      );
      setBranch_id(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.branch_id
      );
      setarea_id(empDetailsRes.isSuccess && empDetailsRes?.data?.data?.area_id);
      setdepartment_id(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.department_id
      );
      setdesignation_id(
        empDetailsRes.isSuccess && empDetailsRes?.data?.data?.designation_id
      );
    }
  }, [empDetailsRes]);
  const editor = useRef(null);

  // <==============singal data request strat===================>
  const districtRes = useGetDistrictListByIdQuery(divisions_id);
  const upazilaRes = useGetUpazilaListByIdQuery(districts_id);
  const areaRes = useGetAreaListByIdQuery(city_id);

  const branchRes = useGetBranchListByCompanyIdQuery(company_id);
  const departmentRes = useGetDepartmentListByCompanyAndBranchIdQuery({
    comId: company_id,
    braId: branch_id,
  });

  const designationRes = useGetDesignationtListByCompanyAndBranchIdQuery({
    comId: company_id,
    braId: branch_id,
  });

  const wingRes= useGetWingListQuery();

  // <==============singal request end===================>

  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <div className=" card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">Edit Employee</h6>
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
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                      className={
                        formik.errors.mobile && formik.touched.mobile
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
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
                      onChange={formik.handleChange}
                      value={formik.values.father_name}
                      className={
                        formik.errors.father_name && formik.touched.father_name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
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
                      value={formik.values.mother_name}
                      className={
                        formik.errors.mother_name && formik.touched.mother_name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
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
                      className={
                        formik.errors.marital_status &&
                        formik.touched.marital_status
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Status</option>
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
                      className={
                        formik.errors.gender && formik.touched.gender
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Gender</option>
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
                      className={
                        formik.errors.date_of_birth &&
                        formik.touched.date_of_birth
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
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
                      onChange={formik.handleChange}
                      value={formik.values.nid}
                      className={
                        formik.errors.nid && formik.touched.nid
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
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
                      <option value="">Select Group</option>
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
                      className={
                        formik.errors.employee_id && formik.touched.employee_id
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onBlur={formik.handleBlur}
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
                    Office Number
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
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
                      type="text"
                      className="form-control"
                      name="finger_print_id"
                      onChange={formik.handleChange}
                      value={formik.values.finger_print_id}
                    />
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
                          : "form-control  "
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
                      <option value="">Selact Company</option>
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
                  <label className="col-sm-3 col-form-label">Branch</label>
                  <div className="col-sm-9">
                    <select
                      name="branch_id"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setBranch_id(e.target.value);
                      }}
                      value={formik.values.branch_id}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.branch_id && formik.touched.branch_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                    >
                      <option value="">Selact Branch</option>
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
                      onChange={(e) => {
                        formik.handleChange(e);
                        setdepartment_id(e.target.value);
                      }}
                      value={formik.values.department_id}
                      className={
                        formik.errors.department_id &&
                        formik.touched.department_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Selact Department</option>
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
                      onChange={(e) => {
                        formik.handleChange(e);
                        setdesignation_id(e.target.value);
                      }}
                      value={formik.values.designation_id}
                      className={
                        formik.errors.designation_id &&
                        formik.touched.designation_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Selact Designation</option>
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
                      <option value="">Selact Employment</option>
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
                      onChange={formik.handleChange}
                      value={formik.values.present_address}
                      className={
                        formik.errors.present_address &&
                        formik.touched.present_address
                          ? "form-control is-invalid"
                          : "form-control "
                      }
                      onBlur={formik.handleBlur}
                    />
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
                      value={formik.values.permanent_address}
                      className={
                        formik.errors.permanent_address &&
                        formik.touched.permanent_address
                          ? "form-control is-invalid"
                          : "form-control "
                      }
                      onBlur={formik.handleBlur}
                    />
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
                      value={formik.values.division_id}
                      className={
                        formik.errors.division_id && formik.touched.division_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Selact Division</option>
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
                      value={formik.values.district_id}
                      className={
                        formik.errors.district_id && formik.touched.district_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Selact District</option>
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
                      className={
                        formik.errors.city_id && formik.touched.city_id
                          ? "form-control is-invalid"
                          : "form-control form-select"
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Selact City</option>
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
                      onChange={(e) => {
                        formik.handleChange(e);
                        setarea_id(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.area_id}
                    >
                      <option value="">Selact Area</option>
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
                      className="form-control"
                      name="image"
                      onChange={(e) => {
                        formik.setFieldValue("image", e.currentTarget.files[0]);
                        handelImage(e);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 pt-1">
              <div>
              {previewImage ? (
                <img
                  className="py-2"
                  src={previewImage}
                  width="80px"
                  height="80px"
                  alt=""
                />
              ) : (
                <img
                  className="py-2"
                  src={
                    formik.values.image === null
                      ? avater
                      : `${process.env.REACT_APP_FILE_URL}${formik.values.image}`
                  }
                  width="80px"
                  height="80px"
                  alt=""
                />
              )}
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
                      className=" form-control form-select"
                    >
                      <option value="Employee">Employee</option>
                      <option value="ApprovalAuthority">
                        Approval Authority
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Others">Others</option>
                    </select>
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
            <div className="form-group row ">
              <div className="ml-3"></div>
            </div>
     

            <div className=" py-5 ">
              <Button className="btn btn-success px-5" type="submit">
                Submit
              </Button>

              <Button
                onClick={() => navigate(-1)}
                className="btn btn-dark px-5 ms-3"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
