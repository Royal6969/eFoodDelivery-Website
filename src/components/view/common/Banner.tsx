import React from 'react'


function Banner() {
  return (
    <div className="custom-banner">
      <div style={{ width: "400px", height: "30vh" }} className="m-auto d-flex align-items-center">
        <div className="d-flex align-items-center" style={{ width: "100%" }}>
          <input
            type={"text"}
            style={{ width: "100%", padding: "20px 20px" }}
            className="form-control rounded-pill"
            placeholder="Busca tus platos favoritos 😋"
          />

          <span style={{ position: "relative", left: "-43px" }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  )
}


export default Banner