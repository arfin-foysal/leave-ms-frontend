import React from "react";
// import { Spinner } from 'react-bootstrap'
import { Dna } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      {/* <Spinner animation="grow" variant="primary" /> */}

      <div
        className="text-center"
        style={{
          textAlign: "center",
          marginTop: "10%",
          color: "#8500ffa3",
          zIndex: "99999",
          height: "2000px",
        }}
      >
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </>
  );
};

export default Loader;
