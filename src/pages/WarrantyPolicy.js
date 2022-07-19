import React from "react";
const WarrantyPolicy = () => {
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
          <span> YATB về Chính sách bảo hành</span>
        </div>
        <h3 className="mt-3 p-3">Chính sách bảo hành</h3>
        <div className="text-center">
          <img
            src={images[1]}
            alt="Chính sách bảo hành"
            className="img-fluid"
          />
        </div>
      </div>
    </main>
  );
};

export default WarrantyPolicy;
