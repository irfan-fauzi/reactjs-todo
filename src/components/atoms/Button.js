import React from 'react'

function Button({ onClick, title, loading }) {

  // membuat loading button => matikan fungsi klik
  if (loading) {
    return <button className="btn btn-disable">Loading...</button>
  }

  return (
    <div>
      <button className="btn" onClick={onClick}>{title}</button>
    </div>
  )
}

export default Button
