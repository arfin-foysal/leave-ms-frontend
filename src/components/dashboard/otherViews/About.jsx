import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Card from "../../common/Card";
import Loader from "../../common/Loader";
// import Table from "../../common/Table";
import TextEditor from "../../common/TextEditor";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import CommonModal from "../../common/CommonModal";
import { Button } from "react-bootstrap";



function About() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const [cVal, setcval] = useState(null);

  const submitHandeler = (e) => {
    e.preventDefault();
    const arr = [];
    cVal.map((item) => {
      return arr.push(item.value);
    });
    console.log(arr);
  };

  const deleteHandel = async (deleteFunc, Did) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "error",
      confirmButtonColor: "#d33 ",
      cancelButtonColor: " #4e4e4e",
      confirmButtonText: "Yes, delete it!",
      width: 200,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteFunc(Did);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
      console.log(result);
    });
  };

  return (
    <>
      <Loader />
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Card</h1>
        <Link
          to="#"
          onClick={() => deleteHandel()}
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          Back
        </Link>
      </div>
      <Card />
      {/* <Table /> */}
      <TextEditor />

      <CommonModal handleClose={handleClose}  show={show} />

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <form action="" onSubmit={submitHandeler}>
        <Select
          defaultValue={[
            { value: "green", label: "Green", color: "#36B37E" },
            { value: "forest", label: "Forest", color: "#00875A" },
          ]}
          isMulti
          name="colors"
          options={[
            { value: "green", label: "Green", color: "#36B37E" },
            { value: "forest", label: "Forest", color: "#00875A" },
            { value: "slate", label: "Slate", color: "#253858" },
            { value: "silver", label: "Silver", color: "#666666" },
          ]}
          className="basic-multi-select"
          classNamePrefix="select"
        />

        <AsyncSelect
          isMulti
          cacheOptions
          getOptionLabel={(e) => e.color}
          getOptionValue={(e) => e.value}
          
          defaultOptions={[
            { value: "green", label: "Green", color: "#36B37E" },
            { value: "forest", label: "Forest", color: "#00875A" },
            { value: "slate", label: "Slate", color: "#253858" },
            { value: "silver", label: "Silver", color: "#666666" },
          ]}
          defaultValue={[
            { value: "green", label: "Green", color: "#36B37E" },
            { value: "forest", label: "Forest", color: "#00875A" },
          ]}
          onChange={(e) => setcval(e)}
          // loadOptions={promiseOptions}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default About;
