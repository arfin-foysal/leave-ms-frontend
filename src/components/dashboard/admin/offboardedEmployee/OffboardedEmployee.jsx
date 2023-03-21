import React from 'react'
import { IoSyncCircle } from 'react-icons/io5'
import PageTopHeader from '../../../common/PageTopHeader'
import OffboardedEmployeeTable from './OffboardedEmployeeTable'

export const OffboardedEmployee = () => {
  return (
    <>
      <PageTopHeader title="Employee Information"/>
      <div className="card shadow mb-4">
        <div className="card-header  d-flex justify-content-between">
          <div className="mt-1"> 
            <h6 className="m-0 font-weight-bold text-primary">Employee Information</h6>
          </div>
          <div className="d-flex justify-content-end">
              <div>
                <IoSyncCircle
                  className="cursor "
                  color="black"
                  size={25}
                  // onClick={() => refatchClick()}
                />
              </div>

            </div>

        </div>

        <div className="card-body">
       
<OffboardedEmployeeTable/>
       
        </div>
      </div>

    </>
  )
}
