import { useField } from 'formik'
import React from 'react'

function CoustomSelect({ label, ...props }) {
    
   const {field, form, meta} = useField(props)
  return (
      <>
          <label htmlFor={props.id || props.name}>{label}</label>
          <select {...field} {...props} />
          {/* {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
          ) : null} */}
          
      </>
  )
}

export default CoustomSelect