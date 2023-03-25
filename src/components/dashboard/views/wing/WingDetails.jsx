import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const WingDetails = ({ item, handleClose }) => {
 
 
  return (
    <>
    <div className="card-body">
      <div className="row">
      <div className="col-12">
          <p>
                Title:
              <span className="font-weight-bold text-primary ">{ item.title}</span>
              </p>
              <p>
              Company:
              <span className="font-weight-bold text-primary ">{ item.company_name }</span>
              </p>
            </div>
            <div className="col-12">
            
              <p>
              Branch:
                <span className="font-weight-bold text-primary ">{ item.branch_name} </span>
              </p>
              <p>
              Is Active:
              <span className="font-weight-bold text-primary">
                {" "}
                {item.is_active === true ? "Active" : "Inactive"}
              </span>
            </p>
        
            </div>

        </div>
        <Modal.Footer>
           
           <div>
             <Button variant="dark" onClick={handleClose}>
               Close
             </Button>
           </div>
         
       </Modal.Footer>
    </div>
  </>
  )
}

export default WingDetails