import React from "react";
const PartnerSupply = () => {
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../image", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <main>
      <div className="container">
        <div className="body-bar">
          <a href="/home">
            <i className="bi bi-house-fill" />
          </a>
          <span> YATB về Đối tác cung cấp </span>
        </div>
        <h3 className="mt-3 p-3">Đối tác cung cấp</h3>
        <div className="text-center">
          <img src={images[8]} alt="Đối tác cung cấp" className="img-fluid" />
        </div>
      </div>
    </main>
  );
};

export default PartnerSupply;
