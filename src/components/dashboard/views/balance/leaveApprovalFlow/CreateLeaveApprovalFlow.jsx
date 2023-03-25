import React, { useState } from "react";
import Select from "react-select";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

import { Button, Modal } from "react-bootstrap";
import { useGetCompanyListQuery } from "../../../../../services/companyApi";
import { useGetBranchListByCompanyIdQuery } from "../../../../../services/branchApi";
import { useGetDepartmentListByCompanyAndBranchIdQuery } from "../../../../../services/departmentApi";
import { useGetDesignationtListByCompanyAndBranchIdQuery } from "../../../../../services/designationApi";

import { ToastContainer, toast } from "react-toastify";
import { useAddApprovalFlowMutation, useGetEmployeeFilterListQuery } from "../../../../../services/leaveApprovalFlowApi";
import StepSelect from "./StepSelect";

const CreateLeaveApprovalFlow = ({ handleClose }) => {
  const [employeeId, setEmployeeId] = useState();
  const [companyId, setCompanyId] = useState(0);
  const [branchId, setBranchId] = useState(0);
  const [departmentId, setDepartmentId] = useState(0);
  const [designationId, setDesignationId] = useState(0);
  const [addApprovalFlow, res] = useAddApprovalFlowMutation();
  const [stepList, setstepList] = useState([{ authority_id: 0 }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stepList];
    list[index][name] = Number(value);
    setstepList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...stepList];
    list.splice(index, 1);
    setstepList(list);
  };

  const handleServiceAdd = () => {
    setstepList([...stepList, { authority_id: 0 }]);
  };

  const companyList = useGetCompanyListQuery();
  const branchList = useGetBranchListByCompanyIdQuery(companyId);
  const departmentList = useGetDepartmentListByCompanyAndBranchIdQuery({
    comId: companyId,
    braId: branchId,
  });

  const designationList = useGetDesignationtListByCompanyAndBranchIdQuery({
    comId: companyId,
    braId: branchId,
  });

  const params = {
    company_id: companyId,
    branch_id: branchId,
    department_id: departmentId,
    designation_id: designationId,
  };

  const employeeFilterList = useGetEmployeeFilterListQuery(params);

  const focusHandelerOne = (name, id) => {
    setCompanyId(id);
    if (name === "company_id") {
      setBranchId(0);
      setDepartmentId(0);
      setDesignationId(0);
      setEmployeeId("");
    }
  };
  const focusHandelerTwo = (name, id) => {
    setBranchId(id);
    if (name === "branch_id") {
      setDepartmentId(0);
      setDesignationId(0);
      setEmployeeId("");
    }
  };
  const focusHandelerThree = (name, id) => {
    setDepartmentId(id);
    if (name === "department_id") {
      setEmployeeId("");
      setDesignationId(0);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const employeeid = [];
    if (employeeId === undefined) {
      toast.warn("Please Select Employee");
    }

    if (employeeId !== undefined) {
      employeeId.map((item) => {
        employeeid.push(item.id);
      });
    }

    if (stepList[0].authority_id === "") {
      toast.warn("Please Select Step");
    }

    if (employeeId !== undefined && stepList[0].authority_id !== "") {
      const data = {
        employee_ids: employeeid,
        steps: stepList,
      };

      try {
        const result = await addApprovalFlow(data).unwrap();
        toast.success(result.message);

        setCompanyId(0);
        setBranchId(0);
        setDepartmentId(0);
        setDesignationId(0);
        setEmployeeId("");
        setstepList([{ authority_id: "" }]);
      } catch (error) {
        toast.warn(error.data.message);
      }
    }
  };

  return (
    <div>
      {res.isLoading && <div className="loader"></div>}

      <ToastContainer />
      <form className="form-sample" onSubmit={submitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div>
              <label className="form-label">Company</label>
            </div>

            <select
              className="form-control"
              name="company_id"
              onChange={(e) => {
                focusHandelerOne("company_id", e.target.value);
              }}
            >
              <option value="0">Select Company</option>
              {companyList?.data?.data?.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <div>
              <label className="form-label">Branch</label>
            </div>
            <select
              className="form-control"
              name="branch_id"
              onChange={(e) => {
                focusHandelerTwo("branch_id", e.target.value);
              }}
            >
              <option value="0">Select Branch</option>
              {branchList?.data?.data?.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <div>
              <label className="form-label">Department</label>
            </div>
            <select
              className="form-control"
              name="department_id"
              onChange={(e) => {
                focusHandelerThree("department_id", e.target.value);
              }}
            >
              <option value="0">Select Department</option>
              {departmentList?.data?.data?.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <div>
              <label className="form-label">Designation</label>
            </div>
            <select
              className="form-control"
              name="designation_id"
              aria-label="Default select example"
              onChange={(e) => {
                setDesignationId(e.target.value);
              }}
            >
              <option value="0">Select Designation</option>
              {designationList?.data?.data?.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12">
            <div>
              <label className="form-label">Employee</label>
            </div>
            <Select
              isClearable={true}
              isMulti={true}
              value={employeeId}
              classNamePrefix="Employment Type"
              onChange={(e) => setEmployeeId(e)}
              getOptionValue={(option) => `${option["id"]}`}
              getOptionLabel={(option) =>
                `(${option["employee_code"]}) ${option["name"]}`
              }
              options={employeeFilterList?.data?.data}
            />
          </div>

          <div className="row py-2">
            {/* <label htmlFor="authority_id">Appruval By</label> */}
            {stepList.map((singleService, index) => (
              <div key={index} className=" col-md-4 d-flex">
                <div >
                  <StepSelect
                    step={index}
                    name="authority_id"
                    type="text"
                    id="authority_id"
                    value={singleService.authority_id}
                    onChange={(e) => handleServiceChange(e, index)}
                    required
                  />
                  
                </div>
                <div className="select-btn">
                  <div>
                    {stepList.length - 1 === index && stepList.length < 3 && (
                      <BsFillPlusCircleFill
                        className="cursor-pointer ms-2"
                        size={20}
                        color="green"
                        onClick={handleServiceAdd}
                      />
                    )}
                  </div>

                  <div >
                    {stepList.length !== 1 && (
                      <RxCrossCircled
                        onClick={() => handleServiceRemove(index)}
                        color="red"
                        size={22}
                        className="cursor-pointer ms-2"
                      />
                    )}
                  </div>
                </div>
              
              </div>
            ))}
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
  );
};

export default CreateLeaveApprovalFlow;
