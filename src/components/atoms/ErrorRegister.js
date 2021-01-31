import React from 'react'

function ErrorRegister({ pesanError }) {
  if (pesanError) {
    return (
      <>
        <p className="red-text">{pesanError}</p>
      </>
    )
  }
  return (
    <>
    </>
  );
}

export default ErrorRegister
