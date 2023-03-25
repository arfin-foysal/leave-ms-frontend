import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import {
  useLeaveBalanceListByEmpIdQuery,
} from "../../../../services/employeeApi";
import Loader from "../../../common/Loader";
import { FaEdit } from "react-icons/fa";
import avatar from "../../../../assets/images/profile-picture.png";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const empDetailsRes = useLeaveBalanceListByEmpIdQuery(id);

  return (
    <>
      {empDetailsRes.isFetching && <Loader />}

      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">
              Employee Information Details
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
          <div className="row ">
            <div className="col-md-4 shadow p-4">
              <div className="text-center">
                <img
                  className="img-fluid rounded-circle shadow-lg"
                  style={{ width: "200px", height: "200px" }}
                  src={
                    empDetailsRes?.data?.data?.image === null
                      ? avatar
                      : `${process.env.REACT_APP_FILE_URL}${empDetailsRes?.data?.data?.image}`
                  }
                  alt=""
                />
              </div>

              <div className="pt-2">
                <div className="p-2 mb-5 text-center">
                  <div className="font-weight-bold text-dark d-inline  rounded">
                    {empDetailsRes?.data?.data?.name}
                  </div>
                  <p className="mt-2">
                    <span className=" shadow-lg p-1 rounded border text-primary">
                      {empDetailsRes?.data?.data?.designation}
                    </span>
                  </p>
                  <p>
                    <span className=" shadow-lg p-1 rounded border text-primary">
                      {empDetailsRes?.data?.data?.user_type}
                    </span>
                  </p>
                </div>
                <p>
                  Email:
                  <span className="font-weight-bold text-primary ">
                    {empDetailsRes?.data?.data?.email}
                  </span>
                </p>
                <p>
                  Designation:
                  <span className="font-weight-bold text-primary ">
                    {empDetailsRes?.data?.data?.designation}
                  </span>
                </p>

                <p>
                  Number:
                  <span className="font-weight-bold text-primary">
                    {empDetailsRes?.data?.data?.mobile}
                  </span>
                </p>
                <p>
                  Department :
                  <span className="font-weight-bold text-primary">
                    {empDetailsRes?.data?.data?.department}
                  </span>
                </p>

                <div>
                  Key Skills :
                  {empDetailsRes?.data?.data?.key_skills === "undefined" ? (
                    "No Description"
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: empDetailsRes?.data?.data?.key_skills,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-8 p-5">
              <div className="  d-flex justify-content-between">
                <div>
                  {" "}
                  <h4 className="py-2">Personal Details.</h4>
                </div>
                <div>
                  <Link
                    to={`/dashboard/approval-authority/edit-employee/${empDetailsRes?.data?.data?.id}`}
                    title=""
                    className="px-2"
                  >
                    <FaEdit size={22} />
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    Father Name:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.father_name}
                    </span>
                  </p>
                  <p>
                    Fathers Contact Number:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.fathers_contact_number}
                    </span>
                  </p>
                  <p>
                    Mother Name:
                    <span className="font-weight-bold text-primary ">
                      {empDetailsRes?.data?.data?.mother_name}
                    </span>
                  </p>

                  <p>
                    Mothers Contact Numbe:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.mothers_contact_number}
                    </span>
                  </p>
                  <p>
                    Marital Status:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.marital_status}
                    </span>
                  </p>
                  <p>
                    Spouse Name:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.spouse_name}
                    </span>
                  </p>
                  <p>
                    Blood Group:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.blood_group}
                    </span>
                  </p>

                  <p>
                    Referee (office):
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.referee_office}
                    </span>
                  </p>
                  <p>
                    Referee (Relative):
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.referee_relative}
                    </span>
                  </p>
                  <p>
                    Referee Contact Details:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.referee_contact_details}
                    </span>
                  </p>
                  <p>
                    e-TIN:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.e_tin}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Spouse Number:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.spouse_number}
                    </span>
                  </p>
                  <p>
                    Gender:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.gender}
                    </span>
                  </p>
                  <p>
                    Date of Birth:
                    <span className="font-weight-bold text-primary ">
                      <Moment format="YYYY/MM/DD">
                        {empDetailsRes?.data?.data?.date_of_birth}
                      </Moment>
                    </span>
                  </p>

                  <p>
                    NID/Birth ID Number:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.nid}
                    </span>
                  </p>
                  <p>
                    Passport Number :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.passport_number}
                    </span>
                  </p>
                  <p>
                    Institution :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.institution}
                    </span>
                  </p>
                  <p>
                    Education :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.education}
                    </span>
                  </p>
                  <p>
                    Highest Level of Study :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.highest_level_of_study}
                    </span>
                  </p>
                  <p>
                    Applicable Tax Amount :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.applicable_tax_amount}
                    </span>
                  </p>
                  <p>
                    Remarks :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.remarks}
                    </span>
                  </p>
                  <p>
                    Official Achievement :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.official_achievement}
                    </span>
                  </p>
                </div>
              </div>
              <h4 className="py-2 ">Company Details.</h4>
              <div className="row ">
                <div className="col-md-6">
                  <p>
                    Office ID Number:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.employee_code}
                    </span>
                  </p>
                  <p>
                    Office e-Mail ID:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.email}
                    </span>
                  </p>
                  <p>
                    Office Number :
                    <span className="font-weight-bold text-primary ">
                      {empDetailsRes?.data?.data?.office_contact_number}
                    </span>
                  </p>

                  <p>
                    Finger Print ID:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.finger_print_id}
                    </span>
                  </p>

                  <p>
                    Joining Date:
                    <span className="font-weight-bold text-primary ">
                      <Moment format="DD/MM/YYYY">
                        {empDetailsRes?.data?.data?.joining_date}
                      </Moment>
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Company:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.company_name}
                    </span>
                  </p>

                  <p>
                    Designation:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.designation}
                    </span>
                  </p>
                  <p>
                    Branch :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.branch_name}
                    </span>
                  </p>
                  <p>
                    Department :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.department}
                    </span>
                  </p>
                  <p>
                    Employment :
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.employment_type}
                    </span>
                  </p>
                </div>
              </div>
              <h4 className="py-2 ">Address Details.</h4>
              <div className="row ">
                <div className="col-md-6">
                  <p>
                    Present Address:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.present_address}
                    </span>
                  </p>
                  <p>
                    Permanent Address :
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.permanent_address}
                    </span>
                  </p>

                  <p>
                    Status:
                    <span className="font-weight-bold text-primary">
                      {" "}
                      {empDetailsRes?.data?.data?.is_active === true
                        ? "Active"
                        : "Dactive"}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    Division:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.division_name}
                    </span>
                  </p>

                  <p>
                    District:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.district_name}
                    </span>
                  </p>
                  <p>
                    City:
                    <span className="font-weight-bold text-primary ">
                      {" "}
                      {empDetailsRes?.data?.data?.city_name}
                    </span>
                  </p>

                  <p>
                    Area:
                    <span className="font-weight-bold text-primary">
                      {empDetailsRes?.data?.data?.area_name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Employee Leave Details
          </h6>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-borderless">
            <thead className="shadow">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Total Days</th>
                <th scope="col">Availed Days</th>
                <th scope="col">Remaining Days</th>
              </tr>
            </thead>
            <tbody>
              {empDetailsRes?.data?.data?.balance_list.map((item, index) => {
                return (
                  <tr key={index} className="border">
                    <th scope="row">{index + 1}</th>
                    <th>{`${item.leave_title} (${item.leave_short_code})`}</th>
                    <td>
                      <span className="text-primary font-weight-bold">
                        {item.total_days}
                      </span>
                      days
                    </td>

                    <td>
                      <span className="text-danger font-weight-bold">
                        {item.availed_days}
                      </span>
                      days
                    </td>

                    <td>
                      <span className="text-success  font-weight-bold">
                        {item.remaining_days}
                      </span>
                      days
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
