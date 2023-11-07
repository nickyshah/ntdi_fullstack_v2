import React from 'react'

export const Message = ({resp}) => {
    // console.log(resp.status)
    const { status, message} = resp;
    const clsNm = status === 'success' ? "alert alert-success" : "alert alert-danger"
  return (
    message ? <div className={clsNm} >{message}</div> : ""
  )
}


export const Spinner = () => {
    return (
        <div class="d-flex justify-content-center p-4" >
  <div class="spinner-border" style={{width:"3.5rem", height:"3.5rem"}} role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    )
}